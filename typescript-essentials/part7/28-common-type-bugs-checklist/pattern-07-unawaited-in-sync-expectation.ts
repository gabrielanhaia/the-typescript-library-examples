// Book reference: Chapter 28, pattern 7 — async callback in sync-expecting filter.

interface User {
  id: string;
  active: boolean;
}

const users: User[] = [
  { id: "u-1", active: true },
  { id: "u-2", active: false },
  { id: "u-3", active: true },
];

async function isActive(u: User): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 1));
  return u.active;
}

// ── Broken ─────────────────────────────────────────────────────────────────
// `filter` callback returns a Promise; Promises are always truthy.
// EVERY user passes the filter regardless of `active`.
const broken = users.filter((u) => isActive(u) as unknown as boolean);
console.log("broken:", broken.length, "(should be 2)");

// ── Fixed ──────────────────────────────────────────────────────────────────
async function activeOnly<T>(items: T[], pred: (t: T) => Promise<boolean>): Promise<T[]> {
  const checks = await Promise.all(items.map(async (t) => ({ t, ok: await pred(t) })));
  return checks.filter((c) => c.ok).map((c) => c.t);
}

const fixed = await activeOnly(users, isActive);
console.log(
  "fixed: ",
  fixed.length,
  fixed.map((u) => u.id),
);
