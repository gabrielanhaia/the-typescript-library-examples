// Part VI — Same names, different meanings: errors as values vs exceptions.
// The Result pattern: failures encoded as part of the return type.

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

export type ParseError =
  | { kind: "not_a_number"; input: string }
  | { kind: "not_positive"; value: number }
  | { kind: "out_of_range"; value: number; min: number; max: number };

export function parsePositiveInt(s: string, max: number): Result<number, ParseError> {
  const n = parseInt(s, 10);
  if (Number.isNaN(n)) return err({ kind: "not_a_number", input: s });
  if (n <= 0) return err({ kind: "not_positive", value: n });
  if (n > max) return err({ kind: "out_of_range", value: n, min: 1, max });
  return ok(n);
}

export function describeParseError(error: ParseError): string {
  switch (error.kind) {
    case "not_a_number":
      return `not a number: ${error.input}`;
    case "not_positive":
      return `must be positive (got ${error.value.toString()})`;
    case "out_of_range":
      return `out of range: ${error.value.toString()} not in [${error.min.toString()}, ${error.max.toString()}]`;
  }
}
