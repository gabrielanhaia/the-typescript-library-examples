// Book reference: Chapter 9, "The triangle, side by side".
// Run:    npx tsx part2/09-any-unknown-never/the-triangle.ts

// ── any ──────────────────────────────────────────────────────────
// Disables type-checking. Every operation accepted; bugs ship.
{
  const x: any = "hello";

  // The compiler accepts every line below. The runtime does not.
  // Wrapping in try/catch so the demo runs to completion.
  try {
    x.toFixed(2);
  } catch (e) {
    console.log("any.toFixed on a string →", e instanceof Error ? e.message : e);
  }

  try {
    x.foo.bar.baz();
  } catch (e) {
    console.log("any.foo.bar.baz() →", e instanceof Error ? e.message : e);
  }

  // Quietly wrong: declared as number, runtime is the string "hello".
  const _n: number = x;
  console.log("any-typed `number` actually holds:", typeof _n, JSON.stringify(_n));
}

// ── unknown ──────────────────────────────────────────────────────
// Accepts every value in, lets nothing out without narrowing.
{
  const x: unknown = "hello";

  // The compiler refuses x.toUpperCase() here without narrowing.
  // Uncomment to see the error:
  //
  //   x.toUpperCase();
  //   ^ 'x' is of type 'unknown'.

  if (typeof x === "string") {
    console.log("unknown narrowed to string:", x.toUpperCase());
  }
}

// ── never ────────────────────────────────────────────────────────
// The bottom type. Used for two purposes:
//
//   1. Functions that never return normally.
function panic(message: string): never {
  throw new Error(message);
}

//   2. Branches that the compiler has narrowed away.
type Status = "open" | "closed" | "archived";

function describe(s: Status): string {
  if (s === "open") return "Open";
  if (s === "closed") return "Closed";
  if (s === "archived") return "Archived";

  // Here `s` is narrowed to `never`. If a fourth status is added to the
  // union later, this assignment becomes a compile error — pointing you
  // at the consumer that needs updating.
  const _exhaustive: never = s;
  return panic(`Unhandled status: ${String(_exhaustive)}`);
}

console.log("never-narrowed describe('open') →", describe("open"));
console.log("never-narrowed describe('archived') →", describe("archived"));
