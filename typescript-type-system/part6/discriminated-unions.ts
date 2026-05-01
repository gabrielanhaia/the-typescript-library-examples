// Part VI — Practical type design (Ch 19-22)

// Prettify utility for hover quality
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

// Discriminated union for shapes
export type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number };

export function assertNever(x: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
}

export function area(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.radius ** 2;
    case "square":
      return s.size ** 2;
    case "rectangle":
      return s.width * s.height;
    default:
      return assertNever(s);
  }
}

// Result pattern
export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

export function map<T, U, E>(r: Result<T, E>, fn: (val: T) => U): Result<U, E> {
  return r.ok ? ok(fn(r.value)) : r;
}

export function flatMap<T, U, E>(r: Result<T, E>, fn: (val: T) => Result<U, E>): Result<U, E> {
  return r.ok ? fn(r.value) : r;
}

// Rich error type
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

// Type-level state machine
export type Brand<T, B> = T & { readonly __brand: B };
export type DraftOrder = Brand<{ id: string; items: string[] }, "Draft">;
export type PaidOrder = Brand<{ id: string; items: string[]; paidAt: Date }, "Paid">;
export type ShippedOrder = Brand<
  { id: string; items: string[]; paidAt: Date; shippedAt: Date; trackingNumber: string },
  "Shipped"
>;

export function makeDraft(id: string, items: string[]): DraftOrder {
  return { id, items } as unknown as DraftOrder;
}

export function pay(order: DraftOrder): PaidOrder {
  return { ...order, paidAt: new Date() } as unknown as PaidOrder;
}

export function ship(order: PaidOrder, trackingNumber: string): ShippedOrder {
  return { ...order, shippedAt: new Date(), trackingNumber } as unknown as ShippedOrder;
}
