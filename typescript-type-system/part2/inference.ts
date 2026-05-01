// Part II — Inference, deeply (Ch 5-7)

// satisfies operator — checks against a type without widening
export const config = {
  port: 3000,
  host: "localhost",
  timeout: 30_000,
} satisfies { port: number; host: string; timeout: number };

// satisfies preserves literal types so you can read narrow values back out
export const colors = {
  primary: "#3178C6",
  accent: "#E8A87C",
  warn: "#FFB400",
} satisfies Record<string, string>;

// Inference with constraints
export function pickFields<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}

// Contextual typing in callbacks
export function mapArray<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

// Inference flow through multiple parameters
export function compose<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C {
  return (a) => g(f(a));
}
