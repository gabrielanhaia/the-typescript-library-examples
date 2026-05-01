// Part IV — TS-native patterns to embrace
// The Result<T, E> pattern (locked series shape).

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

export type ParseError =
  | { kind: "not-a-number"; input: string }
  | { kind: "negative"; value: number }
  | { kind: "too-large"; value: number; max: number };

export function assertNever(x: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
}

export function parseAge(s: string, max: number): Result<number, ParseError> {
  const n = Number(s);
  if (Number.isNaN(n)) return err({ kind: "not-a-number", input: s });
  if (n < 0) return err({ kind: "negative", value: n });
  if (n > max) return err({ kind: "too-large", value: n, max });
  return ok(Math.floor(n));
}

export function describeError(error: ParseError): string {
  switch (error.kind) {
    case "not-a-number":
      return `not a number: ${error.input}`;
    case "negative":
      return `must be non-negative (got ${error.value.toString()})`;
    case "too-large":
      return `too large: ${error.value.toString()} > ${error.max.toString()}`;
    default:
      return assertNever(error);
  }
}
