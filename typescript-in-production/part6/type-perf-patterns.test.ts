import { describe, expect, it } from "vitest";
import type { Config } from "./type-perf-patterns.ts";
import { freezeFast, freezeSlow } from "./type-perf-patterns.ts";

describe("Part VI — type-level performance patterns", () => {
  const input: Config = {
    name: "billing",
    features: { logging: true, cache: { ttlMs: 60_000 } },
    tags: ["alpha", "beta"],
  };

  it("freezeSlow produces a frozen object", () => {
    const frozen = freezeSlow(input);
    expect(Object.isFrozen(frozen)).toBe(true);
  });

  it("freezeFast produces a frozen object", () => {
    const frozen = freezeFast(input);
    expect(Object.isFrozen(frozen)).toBe(true);
  });

  it("both versions produce the same runtime values", () => {
    const a = freezeSlow({
      ...input,
      features: { ...input.features },
      tags: [...(input.tags ?? [])],
    });
    const b = freezeFast({
      ...input,
      features: { ...input.features },
      tags: [...(input.tags ?? [])],
    });
    expect(a).toEqual(b);
  });

  it("freezing a nested object freezes the children too", () => {
    const frozen = freezeFast(input);
    expect(Object.isFrozen(frozen.features)).toBe(true);
  });
});
