import { describe, expect, it } from "vitest";
import { amount, formatPrice } from "./build-and-check-split.ts";

describe("Part II — build/check split (pure core)", () => {
  it("formats USD with two fraction digits", () => {
    expect(formatPrice(amount(19.5, "USD"), "USD")).toBe("$19.50");
  });

  it("formats JPY with zero fraction digits", () => {
    expect(formatPrice(amount(1200, "JPY"), "JPY")).toBe("¥1200");
  });

  it("formats EUR with the euro symbol", () => {
    expect(formatPrice(amount(9.9, "EUR"), "EUR")).toBe("€9.90");
  });

  it("rejects non-finite amounts", () => {
    expect(() => amount(Number.POSITIVE_INFINITY, "USD")).toThrow();
    expect(() => amount(Number.NaN, "USD")).toThrow();
  });
});
