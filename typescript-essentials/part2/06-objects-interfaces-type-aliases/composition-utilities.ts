// Book reference: Chapter 6 — Pick, Omit, Partial, Required, Readonly.

interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

type ContactCard = Pick<User, "name" | "email">;
type SafeUser = Omit<User, "passwordHash">;
type UserPatch = Partial<User>;
type StrictPatch = Required<UserPatch>;
type FrozenUser = Readonly<User>;

const card: ContactCard = { name: "Ada", email: "ada@example.com" };
const safe: SafeUser = { id: "u-1", name: "Ada", email: "ada@example.com" };
const patch: UserPatch = { name: "Eve" };
const strict: StrictPatch = {
  id: "u-2",
  name: "Eve",
  email: "eve@example.com",
  passwordHash: "...",
};
const frozen: FrozenUser = { ...strict };
// frozen.name = "x";   // error: read-only

console.log({ card, safe, patch, strict, frozen });
