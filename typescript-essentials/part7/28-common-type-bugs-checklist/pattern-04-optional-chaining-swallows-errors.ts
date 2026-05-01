// Book reference: Chapter 28, pattern 4 — optional chaining hiding required-value bugs.

interface User {
  profile?: {
    name?: string;
  };
}

// ── Broken ─────────────────────────────────────────────────────────────────
// If `user` is missing when caller expected a real user, the optional chain
// silently returns "Anonymous" — the bug is in the *caller* and the chain hides it.
function displayBroken(user: User | undefined): string {
  return user?.profile?.name?.toUpperCase() ?? "Anonymous";
}

// ── Fixed ──────────────────────────────────────────────────────────────────
// Required values get explicit checks; only the genuinely-optional fields use ?.
function displayFixed(user: User | undefined): string {
  if (!user) {
    throw new Error("user required at this call site");
  }
  return user.profile?.name?.toUpperCase() ?? "Anonymous";
}

console.log(displayBroken(undefined));
console.log(displayFixed({ profile: { name: "Ada" } }));

try {
  displayFixed(undefined);
} catch (e) {
  console.error("rejected:", e instanceof Error ? e.message : e);
}
