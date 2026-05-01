// Part I — Mental model translation (Ch 1-4)
// Demonstrates structural typing: any object with the right shape satisfies the type.

export type Named = { name: string };

export function greet(thing: Named): string {
  return `hello, ${thing.name}`;
}

// No declaration of "implements Named" needed — anything with a `name: string` works.
// (To avoid the excess-property check on inline literals, bind the value first.)
const adaUser = { name: "Ada", id: "u-1" };
const acmeCompany = { name: "Acme", incorporated: 1995 };

export const greetUser = (): string => greet(adaUser);
export const greetCompany = (): string => greet(acmeCompany);

// Branded types — the nominal escape hatch.
export type UserId = string & { readonly __brand: "UserId" };

export function userId(s: string): UserId {
  if (!s.startsWith("u-")) throw new Error(`Invalid UserId: ${s}`);
  return s as UserId;
}

export function fetchUser(id: UserId): { id: UserId; name: string } {
  return { id, name: "Ada" };
}
