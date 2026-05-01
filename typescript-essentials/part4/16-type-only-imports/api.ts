// A small "API" module that exports both a value and a type.
export type ApiUser = { id: string; name: string };

export function fetchUser(id: string): ApiUser {
  return { id, name: "Ada" };
}
