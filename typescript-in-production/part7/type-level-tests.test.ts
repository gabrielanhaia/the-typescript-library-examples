import { expectTypeOf } from "expect-type";
import { describe, expect, it } from "vitest";
import type { Email, ParseEmailError, Result } from "./type-level-tests.ts";
import { parseEmail, pick } from "./type-level-tests.ts";

describe("Part VII — runtime behaviour", () => {
  it("pick returns only the requested keys", () => {
    const source = { id: "u-1", name: "Ada", secret: "shh" } as const;
    const result = pick(source, ["id", "name"]);
    expect(result).toEqual({ id: "u-1", name: "Ada" });
  });

  it("parseEmail accepts a well-formed address", () => {
    const result = parseEmail("ada@example.com");
    expect(result.ok).toBe(true);
  });

  it("parseEmail rejects a malformed address", () => {
    const result = parseEmail("not-an-email");
    if (!result.ok) expect(result.error.kind).toBe("invalid-email");
  });
});

describe("Part VII — type-level assertions", () => {
  it("pick preserves the picked-key types and drops the rest", () => {
    type Source = { id: string; name: string; secret: string };
    type Picked = ReturnType<typeof pick<Source, "id" | "name">>;
    expectTypeOf<Picked>().toEqualTypeOf<{ id: string; name: string }>();
  });

  it("parseEmail returns a Result of branded Email and ParseEmailError", () => {
    type Returned = ReturnType<typeof parseEmail>;
    expectTypeOf<Returned>().toEqualTypeOf<Result<Email, ParseEmailError>>();
  });

  it("Email is assignable to string but string is not assignable to Email", () => {
    expectTypeOf<Email>().toExtend<string>();
    expectTypeOf<string>().not.toExtend<Email>();
  });
});
