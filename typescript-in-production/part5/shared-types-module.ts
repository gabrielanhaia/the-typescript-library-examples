// Part V — Shared types module
// A "shared types" pattern: a module exporting type-only definitions plus
// Zod schemas plus minimal createX factories. Demonstrates the layering
// of types -> domain -> infra: the type and the schema are the contract,
// and the factory is the only blessed way to produce a value.

import { z } from "zod";

// --- Types layer (compile-time contract) ---

export type UserId = string & { readonly __brand: "UserId" };
export type Email = string & { readonly __brand: "Email" };

export type User = {
  id: UserId;
  email: Email;
  displayName: string;
  createdAt: Date;
};

export type CreateUserError =
  | { kind: "invalid-id"; issues: ReturnType<typeof z.flattenError> }
  | { kind: "invalid-email"; issues: ReturnType<typeof z.flattenError> }
  | { kind: "invalid-payload"; issues: ReturnType<typeof z.flattenError> };

// --- Domain layer (runtime contract — Zod schemas) ---

export const userIdSchema = z.uuid().transform((s) => s as UserId);
export const emailSchema = z.email().transform((s) => s as Email);

export const userSchema = z.object({
  id: userIdSchema,
  email: emailSchema,
  displayName: z.string().min(1).max(80),
  createdAt: z.date(),
});

// --- Helpers layer (the blessed factories) ---

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

export function createUser(input: unknown): Result<User, CreateUserError> {
  const parsed = userSchema.safeParse(input);
  if (parsed.success) return ok(parsed.data);
  return err({ kind: "invalid-payload", issues: z.flattenError(parsed.error) });
}
