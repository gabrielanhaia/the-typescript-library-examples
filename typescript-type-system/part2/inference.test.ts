import { describe, expect, it } from "vitest";
import { colors, compose, config, mapArray, pickFields } from "./inference.ts";

describe("Part II — inference", () => {
  it("satisfies preserves literal-typed config", () => {
    expect(config.port).toBe(3000);
    expect(colors.primary).toBe("#3178C6");
  });

  it("pickFields returns only the requested fields", () => {
    const user = { id: "u-1", name: "Ada", age: 36, email: "a@b.com" };
    const summary = pickFields(user, ["name", "age"]);
    expect(summary).toEqual({ name: "Ada", age: 36 });
  });

  it("mapArray maps with inferred element type", () => {
    const doubled = mapArray([1, 2, 3], (n) => n * 2);
    expect(doubled).toEqual([2, 4, 6]);
  });

  it("compose chains two functions", () => {
    const addOne = (n: number): number => n + 1;
    const toString = (n: number): string => n.toString();
    const composed = compose(addOne, toString);
    expect(composed(4)).toBe("5");
  });
});
