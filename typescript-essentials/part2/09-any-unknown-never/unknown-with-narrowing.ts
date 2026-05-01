// Book reference: Chapter 9, "Where `unknown` belongs" — parsed JSON.

type User = {
  id: string;
  email: string;
  age: number;
};

function isUser(x: unknown): x is User {
  if (typeof x !== "object" || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o["id"] === "string" && typeof o["email"] === "string" && typeof o["age"] === "number"
  );
}

export function parseUser(raw: string): User {
  const data: unknown = JSON.parse(raw);
  if (!isUser(data)) {
    throw new TypeError("expected User shape");
  }
  return data;
}

// Demo:
const ada = parseUser('{"id":"u-1","email":"ada@example.com","age":36}');
console.log(`${ada.email} (${ada.age})`);

try {
  parseUser('{"id":"u-2","email":"bad"}');
} catch (e) {
  console.error("rejected:", e instanceof Error ? e.message : String(e));
}
