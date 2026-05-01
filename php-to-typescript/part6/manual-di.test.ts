import { describe, expect, it, vi } from "vitest";
import { createUserService, type DbClient, type Logger } from "./manual-di.ts";

function makeFakeDb(rows: { id: string; email: string }[]): DbClient {
  return {
    query<T>(sql: string, params?: readonly unknown[]) {
      if (sql.includes("COUNT")) {
        return Promise.resolve([{ c: rows.length }] as unknown as T[]);
      }
      const email = params?.[0];
      const found = rows.find((r) => r.email === email);
      return Promise.resolve((found ? [found] : []) as unknown as T[]);
    },
  };
}

function makeFakeLogger() {
  const info = vi.fn<(msg: string) => void>();
  const error = vi.fn<(msg: string, err?: unknown) => void>();
  const logger: Logger = { info, error };
  return { logger, info, error };
}

describe("Part VI — manual DI", () => {
  it("findByEmail returns the matching user", async () => {
    const db = makeFakeDb([{ id: "u-1", email: "a@b.com" }]);
    const { logger } = makeFakeLogger();
    const svc = createUserService({ db, logger });
    const u = await svc.findByEmail("a@b.com");
    expect(u?.id).toBe("u-1");
  });

  it("findByEmail returns undefined and logs on miss", async () => {
    const db = makeFakeDb([]);
    const { logger, info } = makeFakeLogger();
    const svc = createUserService({ db, logger });
    const u = await svc.findByEmail("missing@example.com");
    expect(u).toBeUndefined();
    expect(info).toHaveBeenCalledWith("No user for missing@example.com");
  });

  it("count returns number of rows", async () => {
    const db = makeFakeDb([
      { id: "u-1", email: "a@b.com" },
      { id: "u-2", email: "b@b.com" },
    ]);
    const { logger } = makeFakeLogger();
    const svc = createUserService({ db, logger });
    const c = await svc.count();
    expect(c).toBe(2);
  });
});
