import { describe, expect, it } from "vitest";
import { createInMemoryRepo, createUserService } from "./manual-di.ts";

describe("Part V — manual DI", () => {
  it("createUserService greets a known user", async () => {
    const repo = createInMemoryRepo([{ id: "u-1", name: "Ada" }]);
    const service = createUserService({ repo });
    expect(await service.greet("u-1")).toBe("hello, Ada");
  });

  it("returns a not-found message for unknown ids", async () => {
    const repo = createInMemoryRepo();
    const service = createUserService({ repo });
    expect(await service.greet("u-999")).toBe("user not found");
  });

  it("rename updates the stored user", async () => {
    const repo = createInMemoryRepo([{ id: "u-1", name: "Ada" }]);
    const service = createUserService({ repo });
    await service.rename("u-1", "Hopper");
    expect(await service.greet("u-1")).toBe("hello, Hopper");
  });

  it("rename throws for unknown ids", async () => {
    const repo = createInMemoryRepo();
    const service = createUserService({ repo });
    await expect(service.rename("u-1", "X")).rejects.toThrow();
  });
});
