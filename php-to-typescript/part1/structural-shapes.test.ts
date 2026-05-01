import { describe, expect, it } from "vitest";
import { greet, greetAlice, greetUser, userId } from "./structural-shapes.ts";

describe("Part I — structural shapes", () => {
  it("greet accepts any shape with name", () => {
    expect(greet({ name: "Ada" })).toBe("Hello, Ada");
  });

  it("greetAlice and greetUser produce expected output", () => {
    expect(greetAlice()).toBe("Hello, Alice");
    expect(greetUser()).toBe("Hello, Bob");
  });

  it("userId validates and brands", () => {
    const id = userId("u-1");
    expect(id).toBe("u-1");
  });

  it("userId rejects invalid input", () => {
    expect(() => userId("invalid")).toThrow();
  });
});
