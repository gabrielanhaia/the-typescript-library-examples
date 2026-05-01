import { describe, expect, it } from "vitest";
import { createUserService, type UserRepo, type UserRow } from "./repository-and-validation.ts";

function makeFakeRepo(): UserRepo & { saved: UserRow[] } {
  const saved: UserRow[] = [];
  return {
    saved,
    findById(id) {
      return Promise.resolve(saved.find((r) => r.id === id));
    },
    insert(row) {
      const full: UserRow = { id: `u-${(saved.length + 1).toString()}`, ...row };
      saved.push(full);
      return Promise.resolve(full);
    },
  };
}

describe("Part III — repository + validation", () => {
  it("creates a valid user", async () => {
    const repo = makeFakeRepo();
    const svc = createUserService({ repo, newId: () => "u-1" });
    const result = await svc.create({ email: "a@b.com", name: "Alice" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.email).toBe("a@b.com");
      expect(result.value.name).toBe("Alice");
    }
  });

  it("rejects invalid email", async () => {
    const repo = makeFakeRepo();
    const svc = createUserService({ repo, newId: () => "u-1" });
    const result = await svc.create({ email: "not-an-email", name: "Alice" });
    expect(result.ok).toBe(false);
  });

  it("rejects too-short name", async () => {
    const repo = makeFakeRepo();
    const svc = createUserService({ repo, newId: () => "u-1" });
    const result = await svc.create({ email: "a@b.com", name: "Al" });
    expect(result.ok).toBe(false);
  });

  it("returns not-found for unknown ids", async () => {
    const repo = makeFakeRepo();
    const svc = createUserService({ repo, newId: () => "u-1" });
    const result = await svc.fetch("u-999");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe("not-found");
  });
});
