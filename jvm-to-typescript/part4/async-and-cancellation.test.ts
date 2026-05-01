import { describe, expect, it } from "vitest";
import { fetchAll, fetchAllSettled, fetchOrder } from "./async-and-cancellation.ts";

describe("Part IV — async, cancellation, parallelism", () => {
  it("fetchOrder resolves with the order shape", async () => {
    const order = await fetchOrder("o-1");
    expect(order.id).toBe("o-1");
    expect(order.total).toBe(100);
  });

  it("fetchAll runs requests in parallel and returns all orders", async () => {
    const orders = await fetchAll(["o-1", "o-2", "o-3"], 5_000);
    expect(orders).toHaveLength(3);
    expect(orders.map((o) => o.id)).toEqual(["o-1", "o-2", "o-3"]);
  });

  it("fetchAllSettled captures successes by id", async () => {
    const result = await fetchAllSettled(["o-1", "o-2"]);
    expect(result.ok).toHaveLength(2);
    expect(result.failed).toHaveLength(0);
  });
});
