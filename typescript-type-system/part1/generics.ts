// Part I — Generics from first principles (Ch 1-4)

// Identity function — the simplest generic
export function identity<T>(x: T): T {
  return x;
}

// Generic constraint
export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Multiple type parameters
export function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

// Generic interface
export interface Box<T> {
  value: T;
  map<U>(fn: (val: T) => U): Box<U>;
}

export function makeBox<T>(value: T): Box<T> {
  return {
    value,
    map<U>(fn: (val: T) => U): Box<U> {
      return makeBox(fn(value));
    },
  };
}

// Const type parameter (TS 5.0+)
export function asConst<const T>(x: T): T {
  return x;
}

// Default type parameter
export function create<T = unknown>(initial: T): { value: T } {
  return { value: initial };
}
