// Part III — Mapped & conditional types (Ch 8-12)

// Building Pick yourself
export type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Building Partial yourself
export type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

// Building Required yourself
export type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};

// Building Readonly yourself
export type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Mutable — strip readonly
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

// Key remapping with as
export type Getters<T> = {
  [K in keyof T as K extends string ? `get${Capitalize<K>}` : never]: () => T[K];
};

// Filtering keys
export type StringKeys<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

// Conditional types
export type Unwrap<T> = T extends Promise<infer U> ? U : T;
export type ReturnTypeOf<T> = T extends (...args: never[]) => infer R ? R : never;
export type ParametersOf<T> = T extends (...args: infer P) => unknown ? P : never;

// IsNever — wrap to disable distribution
export type IsNever<T> = [T] extends [never] ? true : false;

// Equal — function-equality witness (the canonical type-equality trick)
export type Equal<A, B> =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

// Functions to demonstrate the types at runtime
export function pickKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): MyPick<T, K> {
  const result = {} as MyPick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}

export function makePartial<T extends object>(obj: T): MyPartial<T> {
  return { ...obj };
}
