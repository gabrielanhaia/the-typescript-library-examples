// Part VII — Type-driven libraries (Ch 23-25)

import { z } from "zod";

// Zod schema as the source of truth
export const userSchema = z.object({
  id: z.string().regex(/^u-/),
  name: z.string().min(1),
  age: z.number().int().nonnegative(),
  email: z.email().optional(),
});

export type User = z.infer<typeof userSchema>;

export function parseUser(input: unknown): User {
  return userSchema.parse(input);
}

export function safeParseUser(
  input: unknown,
): { success: true; data: User } | { success: false; error: z.ZodError } {
  const result = userSchema.safeParse(input);
  if (result.success) return { success: true, data: result.data };
  return { success: false, error: result.error };
}

// A discriminated-union schema: shape variants
export const shapeSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("circle"), radius: z.number().positive() }),
  z.object({ kind: z.literal("square"), size: z.number().positive() }),
  z.object({
    kind: z.literal("rectangle"),
    width: z.number().positive(),
    height: z.number().positive(),
  }),
]);

export type ParsedShape = z.infer<typeof shapeSchema>;

// Branded schema
export const userIdSchema = z.string().regex(/^u-/, "must start with u-").brand<"UserId">();
export type SchemaUserId = z.infer<typeof userIdSchema>;

// Composition: extending a schema
export const employeeSchema = userSchema.extend({
  employeeId: z.string(),
  department: z.string(),
});
export type Employee = z.infer<typeof employeeSchema>;
