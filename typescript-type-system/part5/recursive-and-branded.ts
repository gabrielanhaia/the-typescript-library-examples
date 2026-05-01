// Part V — Recursive types, branded types, variance (Ch 16-18)

// JSON value
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];

// DeepReadonly
export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// DeepPartial
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// Tail-recursive Reverse
export type Reverse<T extends readonly unknown[], Acc extends unknown[] = []> = T extends readonly [
  infer Head,
  ...infer Tail,
]
  ? Reverse<Tail, [Head, ...Acc]>
  : Acc;

// Branded types
export type Brand<T, B> = T & { readonly __brand: B };
export type UserId = Brand<string, "UserId">;
export type OrderId = Brand<string, "OrderId">;
export type Email = Brand<string, "Email">;
export type Cents = Brand<number, "Cents">;

const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;

export function userId(s: string): UserId {
  if (!s.startsWith("u-")) throw new Error(`Invalid UserId: ${s}`);
  return s as UserId;
}

export function orderId(s: string): OrderId {
  if (!s.startsWith("o-")) throw new Error(`Invalid OrderId: ${s}`);
  return s as OrderId;
}

export function email(s: string): Email {
  if (!emailPattern.test(s)) throw new Error(`Invalid Email: ${s}`);
  return s as Email;
}

export function cents(n: number): Cents {
  if (!Number.isInteger(n)) throw new Error(`Cents must be an integer: ${n.toString()}`);
  return n as Cents;
}

// transferCents only accepts Cents
export function transferCents(amount: Cents): string {
  return `transferring ${amount.toString()} cents`;
}

// Variance demonstration: function-property vs method shorthand
export interface SafeRegistry<T> {
  // function-property — properly contravariant under strictFunctionTypes
  register: (handler: (item: T) => void) => void;
}
