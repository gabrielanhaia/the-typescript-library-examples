// Book reference: Chapter 28, pattern 9 — readonly mutation via cast.

// ── Broken ─────────────────────────────────────────────────────────────────
// The cast violates the contract callers were promised.
function appendBroken(xs: readonly number[], x: number): readonly number[] {
  (xs as number[]).push(x);
  return xs;
}

// ── Fixed ──────────────────────────────────────────────────────────────────
// Return a new array. Caller's view stays immutable.
function appendFixed(xs: readonly number[], x: number): readonly number[] {
  return [...xs, x];
}

const original: readonly number[] = [1, 2, 3];

const brokenResult = appendBroken(original, 4);
console.log("broken: original mutated to", original); // [1,2,3,4] — bug!
console.log("broken: result is        ", brokenResult);

const original2: readonly number[] = [1, 2, 3];
const fixedResult = appendFixed(original2, 4);
console.log("fixed: original is       ", original2);
console.log("fixed: result is         ", fixedResult);
