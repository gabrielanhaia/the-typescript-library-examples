// Book reference: Chapter 19 — `as const` objects with derived union types.

type ValueOf<T> = T[keyof T];

const Status = {
  Open: "open",
  Closed: "closed",
  Archived: "archived",
} as const;
type Status = ValueOf<typeof Status>;

function describe(s: Status): string {
  return `Status: ${s}`;
}

console.log(describe(Status.Open));
console.log(describe("archived")); // structural typing — both call shapes work

// Runtime enumeration is available too.
console.log("All values:", Object.values(Status));
