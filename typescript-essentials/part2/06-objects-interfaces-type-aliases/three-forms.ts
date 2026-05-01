// Book reference: Chapter 6 — three forms describing the same shape.

// Inline object type
function greet(user: { name: string; email: string }): string {
  return `Hello, ${user.name}`;
}

// Interface
interface UserI {
  name: string;
  email: string;
}

// Type alias
type UserT = {
  name: string;
  email: string;
};

const ada = { name: "Ada", email: "ada@example.com" };
console.log(greet(ada));

// Both interface and type accept the same plain object — structural typing.
const i: UserI = ada;
const t: UserT = ada;
console.log(i, t);
