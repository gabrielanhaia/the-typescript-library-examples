// Book reference: Chapter 7 — `as const` arrays and types derived from them.

const STATUSES = ["open", "closed", "archived"] as const;
type Status = (typeof STATUSES)[number];
//   ^ "open" | "closed" | "archived"

function describe(s: Status): string {
  return `Status: ${s}`;
}

for (const s of STATUSES) {
  console.log(describe(s));
}

// @ts-expect-error - "weird" is not in the union.
console.log(describe("weird"));
