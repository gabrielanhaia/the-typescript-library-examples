// Book reference: Chapter 28, pattern 5 — type guard that doesn't check.

interface User {
  id: string;
  email: string;
}

// ── Broken ─────────────────────────────────────────────────────────────────
// The guard claims `x is User` but accepts anything.
function isUserBroken(x: unknown): x is User {
  return typeof x === "object";
}

// ── Fixed ──────────────────────────────────────────────────────────────────
// The guard actually checks the shape.
function isUserFixed(x: unknown): x is User {
  if (typeof x !== "object" || x === null) return false;
  const o = x as Record<string, unknown>;
  return typeof o["id"] === "string" && typeof o["email"] === "string";
}

const real: unknown = { id: "u-1", email: "a@b.c" };
const fake: unknown = { hello: "world" };

console.log("broken accepts both:", isUserBroken(real), isUserBroken(fake));
console.log("fixed rejects fake :", isUserFixed(real), isUserFixed(fake));
