// Book reference: Chapter 19 — union literal as the default modeling choice.

type Status = "open" | "closed" | "archived";

function describe(s: Status): string {
  switch (s) {
    case "open":
      return "Open";
    case "closed":
      return "Closed";
    case "archived":
      return "Archived";
  }
}

console.log(describe("open"));
console.log(describe("closed"));
console.log(describe("archived"));
