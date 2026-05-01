// Book reference: Chapter 9, "The runtime-validator boundary".
// Requires `zod` (npm install zod).

import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  age: z.number().min(0),
});
export type User = z.infer<typeof UserSchema>;

export function parseUser(raw: string): User {
  const data: unknown = JSON.parse(raw);
  return UserSchema.parse(data); // throws if shape is wrong
}

// Demo:
const ada = parseUser('{"id":"u-1","email":"ada@example.com","age":36}');
console.log(`${ada.email} (${ada.age})`);
