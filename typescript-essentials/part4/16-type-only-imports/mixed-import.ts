// Book reference: Chapter 16 — mixed value-and-type imports from the same module.
// The `type` modifier marks individual specifiers as type-only.

import { fetchUser, type ApiUser } from "./api.ts";

function process(user: ApiUser): string {
  return `processed: ${user.id} ${user.name}`;
}

const u = fetchUser("u-123");
console.log(process(u));
