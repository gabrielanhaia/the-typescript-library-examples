import { describe, expect, it } from "vitest";
import { parseUser, safeParseUser, shapeSchema, userIdSchema } from "./zod-schemas.ts";

describe("Part VII — type-driven libraries", () => {
  it("parseUser accepts valid input", () => {
    const u = parseUser({ id: "u-1", name: "Ada", age: 36 });
    expect(u.name).toBe("Ada");
  });

  it("parseUser rejects invalid input", () => {
    expect(() => parseUser({ id: "wrong", name: "", age: -1 })).toThrow();
  });

  it("safeParseUser returns a Result-like shape", () => {
    const r = safeParseUser({ id: "wrong", name: "", age: -1 });
    expect(r.success).toBe(false);

    const ok = safeParseUser({ id: "u-1", name: "Ada", age: 36 });
    expect(ok.success).toBe(true);
    if (ok.success) expect(ok.data.id).toBe("u-1");
  });

  it("shapeSchema parses a discriminated union", () => {
    const circle = shapeSchema.parse({ kind: "circle", radius: 5 });
    expect(circle.kind).toBe("circle");

    expect(() => shapeSchema.parse({ kind: "circle", radius: -1 })).toThrow();
  });

  it("userIdSchema brands successful parses", () => {
    const id = userIdSchema.parse("u-abc");
    expect(id).toBe("u-abc");

    expect(() => userIdSchema.parse("invalid")).toThrow();
  });
});
