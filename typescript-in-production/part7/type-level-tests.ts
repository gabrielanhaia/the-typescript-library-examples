// Part VII — Type-level tests and contracts
// A small generic helper plus a parser that returns a branded result.
// The .test.ts file uses both runtime tests AND type-level assertions
// via `expectTypeOf` from `expect-type`.

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

// Generic pick: select a subset of keys from an object, preserving types.
export function pick<T extends object, K extends keyof T>(
  source: T,
  keys: readonly K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = source[key];
  }
  return result;
}

// Branded Email type.
export type Email = string & { readonly __brand: "Email" };

export type ParseEmailError = { kind: "invalid-email"; input: string };

export function parseEmail(input: string): Result<Email, ParseEmailError> {
  // Very light validation; a real impl would defer to Zod's z.email().
  const trimmed = input.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return err({ kind: "invalid-email", input });
  }
  return ok(trimmed as Email);
}
