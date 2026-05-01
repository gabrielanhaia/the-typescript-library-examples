// Part II — Types: lessons mostly transferable
// Demonstrates the TS equivalent of Kotlin's data class:
// a plain object type plus helper functions.

export type User = { id: string; name: string; age: number };

// `equals` — structural compare (since TS has no built-in equals).
export function userEquals(a: User, b: User): boolean {
  return a.id === b.id && a.name === b.name && a.age === b.age;
}

// `copy` — Kotlin's data class `.copy()` is plain spread syntax in TS.
export function withName(user: User, name: string): User {
  return { ...user, name };
}

// `componentN` destructuring — JS native destructuring covers it.
export function summarize(user: User): string {
  const { id, name, age } = user;
  return `${id}: ${name} (${age.toString()})`;
}

// Generics with constraints — same shape as Kotlin/Java.
export function pickField<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
