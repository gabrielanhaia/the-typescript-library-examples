// Book reference: Chapter 16 — `import type * as` namespaces.

import type * as Api from "./api.ts";

function describe(user: Api.ApiUser): string {
  return `${user.id}: ${user.name}`;
}

// The runtime import is erased; we never reference Api as a value.
const fake: Api.ApiUser = { id: "u-fake", name: "Fake" };
console.log(describe(fake));
