import { describe, expect, it } from "vitest";
import { createUser, userSchema } from "./shared-types-module.ts";

const VALID_INPUT = {
  id: "11111111-1111-4111-8111-111111111111",
  email: "ada@example.com",
  displayName: "Ada Lovelace",
  createdAt: new Date("2026-01-01T00:00:00Z"),
};

describe("Part V — shared types module", () => {
  it("userSchema accepts a well-formed input", () => {
    const result = userSchema.safeParse(VALID_INPUT);
    expect(result.success).toBe(true);
  });

  it("userSchema rejects a malformed email", () => {
    const result = userSchema.safeParse({ ...VALID_INPUT, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("userSchema rejects an empty displayName", () => {
    const result = userSchema.safeParse({ ...VALID_INPUT, displayName: "" });
    expect(result.success).toBe(false);
  });

  it("createUser returns a typed User on the happy path", () => {
    const result = createUser(VALID_INPUT);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.displayName).toBe("Ada Lovelace");
  });

  it("createUser returns an invalid-payload error on bad input", () => {
    const result = createUser({ id: "x", email: "y", displayName: "", createdAt: "no" });
    if (!result.ok) expect(result.error.kind).toBe("invalid-payload");
  });
});
