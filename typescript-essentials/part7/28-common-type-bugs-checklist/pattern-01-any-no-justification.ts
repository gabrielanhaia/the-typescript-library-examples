// Book reference: Chapter 28, pattern 1 — `any` annotation without justification.

// ── Broken ─────────────────────────────────────────────────────────────────
// The compiler is told to stop checking. Every downstream use is unchecked.
function processBroken(data: any): void {
  // accepts anything; bugs ship silently
  console.log(data.someField.toUpperCase());
}

// ── Fixed ──────────────────────────────────────────────────────────────────
// `unknown` plus narrowing forces a deliberate check.
function processFixed(data: unknown): void {
  if (
    typeof data === "object" &&
    data !== null &&
    "someField" in data &&
    typeof (data as { someField: unknown }).someField === "string"
  ) {
    const { someField } = data as { someField: string };
    console.log(someField.toUpperCase());
  }
}

processBroken({ someField: "hello" });
processFixed({ someField: "hello" });
