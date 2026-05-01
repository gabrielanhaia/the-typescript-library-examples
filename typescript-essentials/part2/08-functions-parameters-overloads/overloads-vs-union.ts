// Book reference: Chapter 8 — overloads earn their keep when the return
// type depends on the input type.

interface User {
  id: number;
  name: string;
}

const _users: Record<number, User> = {
  1: { id: 1, name: "Ada" },
  2: { id: 2, name: "Eve" },
  3: { id: 3, name: "Linus" },
};

function find(id: number): User {
  const u = _users[id];
  if (!u) throw new Error(`no user ${id}`);
  return u;
}

// Overloads — return type changes with input shape.
function getById(id: number): User;
function getById(ids: number[]): User[];
function getById(idOrIds: number | number[]): User | User[] {
  return Array.isArray(idOrIds) ? idOrIds.map((id) => find(id)) : find(idOrIds);
}

// Compare with a plain union signature: caller would have to narrow on every call.
const u: User = getById(1);
const us: User[] = getById([1, 2]);

console.log(u);
console.log(us);
