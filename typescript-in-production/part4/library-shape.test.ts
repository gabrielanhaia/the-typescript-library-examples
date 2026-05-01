import { describe, expect, it } from "vitest";
import { createOrder, orderId, totalForUser, userId } from "./library-shape.ts";

const VALID_USER = "11111111-1111-4111-8111-111111111111";
const VALID_ORDER = "22222222-2222-4222-8222-222222222222";
const ANOTHER_ORDER = "33333333-3333-4333-8333-333333333333";

describe("Part IV — library shape", () => {
  it("userId rejects invalid input", () => {
    const r = userId("not-a-uuid");
    expect(r.ok).toBe(false);
  });

  it("orderId accepts a valid uuid", () => {
    const r = orderId(VALID_ORDER);
    expect(r.ok).toBe(true);
  });

  it("createOrder returns a typed Order on the happy path", () => {
    const result = createOrder(VALID_USER, VALID_ORDER, 100, new Set());
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.total).toBe(100);
  });

  it("createOrder rejects an already-known order id", () => {
    const idResult = orderId(VALID_ORDER);
    if (!idResult.ok) throw new Error("setup failed");
    const result = createOrder(VALID_USER, VALID_ORDER, 100, new Set([idResult.value]));
    if (!result.ok) expect(result.error.kind).toBe("duplicate-order");
  });

  it("totalForUser sums only orders for the target user", () => {
    const u1 = userId(VALID_USER);
    if (!u1.ok) throw new Error("setup failed");
    const o1 = createOrder(VALID_USER, VALID_ORDER, 50, new Set());
    const o2 = createOrder(VALID_USER, ANOTHER_ORDER, 75, new Set());
    if (!o1.ok || !o2.ok) throw new Error("setup failed");
    expect(totalForUser([o1.value, o2.value], u1.value)).toBe(125);
  });
});
