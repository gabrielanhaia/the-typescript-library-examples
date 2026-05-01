import { describe, expect, it } from "vitest";
import { pickField, summarize, userEquals, withName, type User } from "./data-class-equivalents.ts";

describe("Part II — data class equivalents", () => {
  const ada: User = { id: "u-1", name: "Ada", age: 36 };

  it("userEquals does structural comparison", () => {
    expect(userEquals(ada, { id: "u-1", name: "Ada", age: 36 })).toBe(true);
    expect(userEquals(ada, { ...ada, age: 37 })).toBe(false);
  });

  it("withName returns a copy with name replaced", () => {
    const renamed = withName(ada, "Hopper");
    expect(renamed.name).toBe("Hopper");
    expect(ada.name).toBe("Ada");
  });

  it("summarize destructures and formats", () => {
    expect(summarize(ada)).toBe("u-1: Ada (36)");
  });

  it("pickField extracts a typed field", () => {
    expect(pickField(ada, "name")).toBe("Ada");
    expect(pickField(ada, "age")).toBe(36);
  });
});
