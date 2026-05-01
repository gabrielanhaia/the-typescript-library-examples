// Part I — Mental model translation
// PHP nominal classes vs TS structural object types.

export type User = { id: string; name: string; email: string };

export function greet(u: { name: string }): string {
  return `Hello, ${u.name}`;
}

// Any object with `name: string` satisfies the parameter type.
// (Bind to a variable first to avoid the excess-property check on inline literals.)
const alice = { name: "Alice" };
const bob = { id: "u-1", name: "Bob", email: "b@example.com" };

export const greetAlice = (): string => greet(alice);
export const greetUser = (): string => greet(bob);

// Branded type for nominal distinction (the TS analogue of declaring
// a separate PHP class for a value object).
export type UserId = string & { readonly __brand: "UserId" };

export function userId(s: string): UserId {
  if (!s.startsWith("u-")) throw new Error(`Invalid UserId: ${s}`);
  return s as UserId;
}
