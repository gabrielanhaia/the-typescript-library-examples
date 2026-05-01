// Book reference: Chapter 20 — Promise<T> basics.

interface User {
  id: string;
  name: string;
}

async function fetchUser(id: string): Promise<User> {
  await new Promise((r) => setTimeout(r, 5));
  return { id, name: "Ada" };
}

async function getUserName(id: string): Promise<string> {
  const u = await fetchUser(id);
  return u.name;
}

async function findUser(id: string): Promise<User | undefined> {
  if (id === "") return undefined;
  return fetchUser(id);
}

console.log(await getUserName("u-1"));
console.log(await findUser(""));
console.log(await findUser("u-2"));
