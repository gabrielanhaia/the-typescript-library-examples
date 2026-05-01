// Part VI — Type-level performance patterns
// Two versions of the same logic. The "slow" version layers nested mapped
// types so the compiler walks the structure on every reference. The "fast"
// version flattens to a single mapped pass and aliases the result to one
// concrete type, so downstream uses re-reference (cheap) instead of
// recomputing (expensive). Both produce the same runtime values.

// --- Slow version: deeply-nested mapped types ---

type DeepReadonlySlow<T> = {
  readonly [K in keyof T]: T[K] extends (infer U)[]
    ? readonly DeepReadonlySlow<U>[]
    : T[K] extends object
      ? DeepReadonlySlow<T[K]>
      : T[K];
};

type DeepRequiredSlow<T> = {
  [K in keyof T]-?: T[K] extends (infer U)[]
    ? DeepRequiredSlow<U>[]
    : T[K] extends object | undefined
      ? DeepRequiredSlow<NonNullable<T[K]>>
      : T[K];
};

export type FrozenSlow<T> = DeepReadonlySlow<DeepRequiredSlow<T>>;

// --- Fast version: a single mapped pass, then cached as a concrete alias ---

type FrozenFast<T> = {
  readonly [K in keyof T]-?: T[K] extends (infer U)[]
    ? readonly FrozenFast<NonNullable<U>>[]
    : T[K] extends object | undefined
      ? FrozenFast<NonNullable<T[K]>>
      : NonNullable<T[K]>;
};

// Concrete config shape used by both. The "fast" path materialises the
// transform on this concrete type, so every downstream reference is cheap.
export type Config = {
  name: string;
  features?: { logging?: boolean; cache?: { ttlMs?: number } };
  tags?: string[];
};

export type FrozenConfig = FrozenFast<Config>;

// Both functions have the same runtime body — the difference is what the
// compiler does at the use sites.
export function freezeSlow<T extends object>(value: T): FrozenSlow<T> {
  return _deepFreeze(value) as FrozenSlow<T>;
}

export function freezeFast(value: Config): FrozenConfig {
  return _deepFreeze(value) as FrozenConfig;
}

function _deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const key of Object.keys(value)) {
      const child = (value as Record<string, unknown>)[key];
      if (child !== null && typeof child === "object") _deepFreeze(child);
    }
    Object.freeze(value);
  }
  return value;
}
