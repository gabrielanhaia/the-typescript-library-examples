// Book reference: Chapter 11 — common reusable type guards.

export function isString(x: unknown): x is string {
  return typeof x === "string";
}

export function isNumber(x: unknown): x is number {
  return typeof x === "number" && !Number.isNaN(x);
}

export function isPresent<T>(x: T | null | undefined): x is T {
  return x != null;
}

export function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

export function isStringArray(x: unknown): x is string[] {
  return Array.isArray(x) && x.every(isString);
}

// Demo:
const xs: (string | null | undefined)[] = ["a", null, "b", undefined, "c"];
const cleaned: string[] = xs.filter(isPresent);
console.log("cleaned:", cleaned);

const mixed: unknown[] = [1, "two", null, NaN, { a: 1 }];
console.log("strings:", mixed.filter(isString));
console.log("numbers:", mixed.filter(isNumber));
console.log("objects:", mixed.filter(isObject));

console.log("isStringArray pass :", isStringArray(["a", "b"]));
console.log("isStringArray fail :", isStringArray(["a", 1]));
