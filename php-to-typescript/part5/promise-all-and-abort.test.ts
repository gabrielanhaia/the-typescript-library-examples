import { describe, expect, it } from "vitest";
import { fetchAll, fetchAllSettled, fetchOrder } from "./promise-all-and-abort.ts";

describe("Part V — async and cancellation", () => {
  it("fetchOrder resolves with the order shape", async () => {
    const order = await fetchOrder("o-1");
    expect(order.id).toBe("o-1");
    expect(order.total).toBe(100);
  });

  it("fetchAll runs in parallel and returns all orders", async () => {
    const orders = await fetchAll(["o-1", "o-2", "o-3"], 5_000);
    expect(orders).toHaveLength(3);
    expect(orders.map((o) => o.id)).toEqual(["o-1", "o-2", "o-3"]);
  });

  it("fetchAllSettled separates successes and failures", async () => {
    const result = await fetchAllSettled(["o-1", "o-2"]);
    expect(result.ok).toHaveLength(2);
    expect(result.failed).toHaveLength(0);
  });
});
