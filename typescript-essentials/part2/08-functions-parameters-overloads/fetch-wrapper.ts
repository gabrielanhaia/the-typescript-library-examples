// Book reference: Chapter 8 "A worked example: a fetch wrapper".

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: Json;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

class HttpError extends Error {
  constructor(
    public status: number,
    public bodyText: string,
  ) {
    super(`HTTP ${status}: ${bodyText.slice(0, 80)}`);
    this.name = "HttpError";
  }
}

export async function fetchJson<T>(url: string, opts: FetchOptions = {}): Promise<T> {
  const init: RequestInit = {
    method: opts.method ?? "GET",
    headers: { "content-type": "application/json", ...opts.headers },
  };
  if (opts.body !== undefined) init.body = JSON.stringify(opts.body);
  if (opts.signal !== undefined) init.signal = opts.signal;

  const res = await fetch(url, init);

  if (!res.ok) {
    throw new HttpError(res.status, await res.text());
  }

  return res.json() as Promise<T>;
}

// Demo:
async function main(): Promise<void> {
  try {
    const data = await fetchJson<{ origin: string }>("https://httpbin.org/ip", {
      signal: AbortSignal.timeout(5000),
    });
    console.log("origin:", data.origin);
  } catch (e) {
    if (e instanceof HttpError) {
      console.error(`http: ${e.status}`);
    } else {
      console.error("other:", e instanceof Error ? e.message : e);
    }
  }
}
void main();
