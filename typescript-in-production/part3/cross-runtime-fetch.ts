// Part III — Cross-runtime libraries
// A fetch wrapper that uses Web Standard APIs only (fetch, URL, AbortSignal).
// Generic over the response shape; validates with a Zod schema at runtime.

import { z } from "zod";

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

export type FetchError =
  | { kind: "network"; cause: unknown }
  | { kind: "http"; status: number }
  | { kind: "invalid-response"; issues: ReturnType<typeof z.flattenError> }
  | { kind: "aborted" };

export type FetchOptions = {
  signal?: AbortSignal;
  timeoutMs?: number;
};

export async function fetchJson<T>(
  url: string | URL,
  schema: z.ZodType<T>,
  options: FetchOptions = {},
): Promise<Result<T, FetchError>> {
  const { signal, timeoutMs } = options;
  const composedSignal =
    timeoutMs !== undefined
      ? signal !== undefined
        ? AbortSignal.any([signal, AbortSignal.timeout(timeoutMs)])
        : AbortSignal.timeout(timeoutMs)
      : signal;

  let response: Response;
  try {
    response = await fetch(url, composedSignal !== undefined ? { signal: composedSignal } : {});
  } catch (cause) {
    if (cause instanceof DOMException && cause.name === "AbortError") {
      return err({ kind: "aborted" });
    }
    return err({ kind: "network", cause });
  }

  if (!response.ok) return err({ kind: "http", status: response.status });

  const body: unknown = await response.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return err({ kind: "invalid-response", issues: z.flattenError(parsed.error) });
  }
  return ok(parsed.data);
}
