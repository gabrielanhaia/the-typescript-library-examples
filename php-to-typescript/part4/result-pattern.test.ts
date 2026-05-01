import { describe, expect, it } from "vitest";
import { describeError, err, ok, parseAge } from "./result-pattern.ts";

describe("Part IV — Result pattern", () => {
  it("ok and err produce typed variants", () => {
    expect(ok(42)).toEqual({ ok: true, value: 42 });
    expect(err("boom" as const)).toEqual({ ok: false, error: "boom" });
  });

  it("parseAge accepts a valid age", () => {
    const r = parseAge("25", 150);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toBe(25);
  });

  it("parseAge rejects non-numeric", () => {
    const r = parseAge("abc", 150);
    if (!r.ok) expect(r.error.kind).toBe("not-a-number");
  });

  it("parseAge rejects negative", () => {
    const r = parseAge("-5", 150);
    if (!r.ok) expect(r.error.kind).toBe("negative");
  });

  it("parseAge rejects too-large", () => {
    const r = parseAge("200", 150);
    if (!r.ok) expect(r.error.kind).toBe("too-large");
  });

  it("describeError formats each variant", () => {
    expect(describeError({ kind: "not-a-number", input: "x" })).toContain("not a number");
    expect(describeError({ kind: "negative", value: -5 })).toContain("non-negative");
    expect(describeError({ kind: "too-large", value: 200, max: 150 })).toContain("too large");
  });
});
