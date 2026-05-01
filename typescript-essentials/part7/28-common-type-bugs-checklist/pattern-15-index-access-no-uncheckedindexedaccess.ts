// Book reference: Chapter 28, pattern 15 — index access without
// noUncheckedIndexedAccess awareness.

// ── Without the flag (or with defensive code) ─────────────────────────────
// xs[0] is typed `number` even when xs is empty, so `.toFixed(2)` ships a bug.
const xs: number[] = [];

// ── Fixed: defensive check ────────────────────────────────────────────────
const x = xs[0];
if (x === undefined) {
  console.log("no first element — skipping");
} else {
  console.log("first:", x.toFixed(2));
}

// With `noUncheckedIndexedAccess: true` (this repo's tsconfig), `x` above is
// typed as `number | undefined`, and the compiler refuses to let you call
// `.toFixed(2)` without the check.
