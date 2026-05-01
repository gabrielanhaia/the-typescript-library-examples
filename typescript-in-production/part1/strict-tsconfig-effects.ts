// Part I — Strict tsconfig effects
// Demonstrates strictNullChecks narrowing, noUncheckedIndexedAccess,
// and exactOptionalPropertyTypes.

// strictNullChecks: a string|null parameter must be narrowed before use.
export function describeName(name: string | null): string {
  if (name === null) return "anonymous";
  // After narrowing, `name` is `string` and `.toUpperCase` is safe.
  return name.toUpperCase();
}

// noUncheckedIndexedAccess: indexing a record yields T | undefined,
// forcing an explicit absent-key check.
export function lookupHeader(
  headers: Record<string, string>,
  key: string,
): { kind: "found"; value: string } | { kind: "missing" } {
  const value = headers[key];
  if (value === undefined) return { kind: "missing" };
  return { kind: "found", value };
}

// exactOptionalPropertyTypes: missing field is distinct from `null`.
// `nickname?: string` accepts undefined-or-absent, but NOT null.
// `note: string | null` requires the field, with null meaning "explicit empty".
export type Profile = {
  id: string;
  nickname?: string;
  note: string | null;
};

export function summarize(profile: Profile): string {
  const nick = profile.nickname ?? "(no nickname)";
  const note = profile.note ?? "(no note)";
  return `${profile.id}: ${nick} — ${note}`;
}
