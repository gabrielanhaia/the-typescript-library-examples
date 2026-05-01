// Book reference: Chapter 28, pattern 13 — @ts-ignore without a justification.

interface PartialTypes {
  bar(): string;
}

const lib: PartialTypes = {
  bar(): string {
    return "hi";
  },
};

// ── Broken ─────────────────────────────────────────────────────────────────
// @ts-ignore silences without explanation. Future maintainers can't tell
// if the underlying issue is fixed, or whether removing the comment would
// re-expose a real bug. (The call also crashes at runtime — the directive
// only disables the type check.)
try {
  // @ts-ignore
  const valueA = lib.foo();
  console.log(valueA);
} catch (e) {
  console.error("ts-ignore demo crashed:", e instanceof Error ? e.message : e);
}

// ── Fixed ──────────────────────────────────────────────────────────────────
// Use the expect-error directive with a justification. The next time the
// issue resolves (e.g., upstream lib types are corrected), the comment
// becomes a compile error itself, prompting cleanup.
try {
  // @ts-expect-error - vendor types miss foo(); see issue vendor#1234
  const valueB = lib.foo();
  console.log(valueB);
} catch (e) {
  console.error("ts-expect-error demo crashed:", e instanceof Error ? e.message : e);
}
