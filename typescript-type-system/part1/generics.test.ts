import { describe, expect, it } from "vitest";
import { asConst, create, getProperty, identity, makeBox, pair } from "./generics.ts";

describe("Part I — generics", () => {
  it("identity preserves the value", () => {
    expect(identity(42)).toBe(42);
    expect(identity("hello")).toBe("hello");
  });

  it("getProperty extracts a property by key", () => {
    const user = { id: "u-1", name: "Ada", age: 36 };
    expect(getProperty(user, "name")).toBe("Ada");
    expect(getProperty(user, "age")).toBe(36);
  });

  it("pair tuples two values", () => {
    expect(pair("a", 1)).toEqual(["a", 1]);
  });

  it("Box maps functorially", () => {
    const box = makeBox(5);
    const doubled = box.map((n) => n * 2);
    expect(doubled.value).toBe(10);
  });

  it("asConst preserves literal types at runtime", () => {
    const x = asConst("hello");
    expect(x).toBe("hello");
  });

  it("create wraps a value with default unknown", () => {
    expect(create(42)).toEqual({ value: 42 });
    expect(create<undefined>(undefined)).toEqual({ value: undefined });
  });
});
