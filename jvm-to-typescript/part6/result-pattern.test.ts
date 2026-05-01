import { describe, expect, it } from "vitest";
import { describeParseError, err, ok, parsePositiveInt } from "./result-pattern.ts";

describe("Part VI — Result pattern", () => {
  it("ok and err produce typed variants", () => {
    expect(ok(42)).toEqual({ ok: true, value: 42 });
    expect(err("boom" as const)).toEqual({ ok: false, error: "boom" });
  });

  it("parsePositiveInt rejects non-numbers", () => {
    const r = parsePositiveInt("abc", 100);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error.kind).toBe("not_a_number");
  });

  it("parsePositiveInt rejects non-positive", () => {
    const r = parsePositiveInt("0", 100);
    if (!r.ok) expect(r.error.kind).toBe("not_positive");
  });

  it("parsePositiveInt rejects out-of-range", () => {
    const r = parsePositiveInt("999", 100);
    if (!r.ok) expect(r.error.kind).toBe("out_of_range");
  });

  it("parsePositiveInt accepts valid input", () => {
    const r = parsePositiveInt("42", 100);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toBe(42);
  });

  it("describeParseError formats each variant", () => {
    expect(describeParseError({ kind: "not_a_number", input: "x" })).toContain("not a number");
    expect(describeParseError({ kind: "not_positive", value: -1 })).toContain("must be positive");
    expect(describeParseError({ kind: "out_of_range", value: 200, min: 1, max: 100 })).toContain(
      "out of range",
    );
  });
});
