// Book reference: Chapter 11 — assertion functions.

export function assertIsString(x: unknown): asserts x is string {
  if (typeof x !== "string") throw new TypeError("expected string");
}

export function assert(condition: unknown, message?: string): asserts condition {
  if (!condition) throw new Error(message ?? "assertion failed");
}

function processString(x: unknown): string {
  assertIsString(x);
  return x.toUpperCase(); // x is `string` from here.
}

function processNonNull(x: string | null): string {
  assert(x !== null, "x must not be null");
  return x.toUpperCase(); // x is `string` (null excluded).
}

console.log(processString("hello"));
console.log(processNonNull("world"));

try {
  processString(42);
} catch (e) {
  console.error("rejected:", e instanceof Error ? e.message : e);
}

try {
  processNonNull(null);
} catch (e) {
  console.error("rejected:", e instanceof Error ? e.message : e);
}
