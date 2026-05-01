import { describe, expect, it } from "vitest";
import { fetchUser, greet, greetCompany, greetUser, userId } from "./structural-typing.ts";

describe("Part I — structural typing", () => {
  it("greet accepts any shape with name: string", () => {
    expect(greet({ name: "Ada" })).toBe("hello, Ada");
    expect(greetUser()).toBe("hello, Ada");
    expect(greetCompany()).toBe("hello, Acme");
  });

  it("userId brands a valid string", () => {
    const id = userId("u-1");
    expect(id).toBe("u-1");
  });

  it("userId rejects invalid input", () => {
    expect(() => userId("invalid")).toThrow();
  });

  it("fetchUser only accepts a branded UserId", () => {
    const id = userId("u-42");
    const user = fetchUser(id);
    expect(user.id).toBe("u-42");
  });
});
