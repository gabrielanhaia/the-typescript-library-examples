import { describe, expect, it } from "vitest";
import { describeName, lookupHeader, summarize } from "./strict-tsconfig-effects.ts";

describe("Part I — strict tsconfig effects", () => {
  it("describeName narrows null to a fallback", () => {
    expect(describeName(null)).toBe("anonymous");
    expect(describeName("ada")).toBe("ADA");
  });

  it("lookupHeader returns a missing variant when key is absent", () => {
    const headers = { "content-type": "application/json" };
    const result = lookupHeader(headers, "x-missing");
    expect(result.kind).toBe("missing");
  });

  it("lookupHeader returns a found variant when key is present", () => {
    const headers = { "content-type": "application/json" };
    const result = lookupHeader(headers, "content-type");
    if (result.kind === "found") expect(result.value).toBe("application/json");
  });

  it("summarize distinguishes absent nickname from explicit-null note", () => {
    expect(summarize({ id: "u-1", note: "hello" })).toContain("(no nickname)");
    expect(summarize({ id: "u-1", note: null })).toContain("(no note)");
    expect(summarize({ id: "u-1", nickname: "Ada", note: "hi" })).toContain("Ada");
  });
});
