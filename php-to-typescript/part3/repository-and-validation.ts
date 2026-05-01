// Part III — Patterns from frameworks
// Repository interface (Drizzle/MikroORM style) + Zod validation
// at the boundary.

import { z } from "zod";

// Zod 4 syntax: top-level format validators.
export const createUserSchema = z.object({
  email: z.email(),
  name: z.string().min(3),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type UserRow = {
  id: string;
  email: string;
  name: string;
};

export type UserRepo = {
  findById(id: string): Promise<UserRow | undefined>;
  insert(row: Omit<UserRow, "id">): Promise<UserRow>;
};

// Manual DI: factory function takes deps explicitly.
export function createUserService(deps: { repo: UserRepo; newId: () => string }) {
  return {
    async create(
      input: unknown,
    ): Promise<{ ok: true; value: UserRow } | { ok: false; error: string }> {
      const parsed = createUserSchema.safeParse(input);
      if (!parsed.success) {
        return {
          ok: false,
          error: z.flattenError(parsed.error).formErrors.join(", ") || "invalid-input",
        };
      }
      const row: UserRow = await deps.repo.insert({ ...parsed.data });
      return { ok: true, value: { ...row, id: row.id || deps.newId() } };
    },
    async fetch(id: string) {
      const row = await deps.repo.findById(id);
      if (row === undefined) return { ok: false as const, error: "not-found" as const };
      return { ok: true as const, value: row };
    },
  };
}
