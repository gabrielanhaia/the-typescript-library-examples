// Book reference: Chapter 5 — primitives, literals, unions.

// ── Primitive corners ─────────────────────────────────────────────
// `number` includes NaN and Infinity. The compiler doesn't track them.
function divide(a: number, b: number): number {
  return a / b;
}
console.log("1/0  →", divide(1, 0)); // Infinity
console.log("0/0  →", divide(0, 0)); // NaN

// `bigint` does not interoperate with `number`.
const big: bigint = 9007199254740993n;
console.log("bigint sum:", big + 1n);

// ── Widening vs literal preservation ─────────────────────────────
const fixed = "open"; // type is the literal "open"
let mutable = "open"; // type widens to string (because `let` admits reassignment)
console.log("const initial:", typeof fixed, fixed);
console.log("let initial  :", typeof mutable, mutable);
mutable = "anything"; // legal — `mutable` is `string`, not the literal "open"
console.log("let after    :", typeof mutable, mutable);

// ── Union types with narrowing ────────────────────────────────────
type Status = "open" | "closed" | "archived";

function transition(s: Status): Status {
  if (s === "open") return "closed";
  if (s === "closed") return "archived";
  return s; // narrowed to "archived"
}
console.log("open →", transition("open"));
console.log("closed →", transition("closed"));
console.log("archived →", transition("archived"));
