// Book reference: Chapter 19 — migration from enum to as-const.

// Before:
// enum Status { Open = "open", Closed = "closed" }

// After (option 1 — keep names):
type ValueOf<T> = T[keyof T];

const Status = {
  Open: "open",
  Closed: "closed",
} as const;
type Status = ValueOf<typeof Status>;

// After (option 2 — drop names, use literals directly):
type StatusV2 = "open" | "closed";

// Both forms accept callers using either the named member or the literal.
function handle(s: Status): string {
  return s === Status.Open ? "OPEN" : "CLOSED";
}

console.log(handle(Status.Open));
console.log(handle("closed"));
// Type-only example: StatusV2 is just an alias for the union of literals.
const sample: StatusV2 = "open";
console.log("v2 union sample:", sample);
