import { describe, expect, it } from "vitest";
import { createOrderService, type Order, type OrderRepository } from "./order-service-port.ts";

function makeFakeRepo(): OrderRepository & { saved: Order[] } {
  const saved: Order[] = [];
  return {
    saved,
    save(order: Order) {
      saved.push(order);
      return Promise.resolve();
    },
    findById(id: string) {
      return Promise.resolve(saved.find((o) => o.id === id) ?? null);
    },
  };
}

describe("Part VII — order service port", () => {
  it("creates a valid order and persists it", async () => {
    const repo = makeFakeRepo();
    let counter = 0;
    const service = createOrderService({
      repo,
      newId: () => {
        counter++;
        return `o-${counter.toString()}`;
      },
    });

    const result = await service.create({
      customerId: "c-1",
      items: [{ sku: "abc", quantity: 2, priceCents: 500 }],
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.totalCents).toBe(1000);
      expect(result.value.id).toBe("o-1");
    }
    expect(repo.saved).toHaveLength(1);
  });

  it("rejects invalid input with a typed error", async () => {
    const repo = makeFakeRepo();
    const service = createOrderService({ repo, newId: () => "o-1" });

    const result = await service.create({ customerId: "wrong", items: [] });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe("invalid");
  });

  it("returns not_found for unknown ids", async () => {
    const repo = makeFakeRepo();
    const service = createOrderService({ repo, newId: () => "o-1" });

    const result = await service.fetch("o-999");
    if (!result.ok) {
      expect(result.error.kind).toBe("not_found");
      if (result.error.kind === "not_found") expect(result.error.id).toBe("o-999");
    }
  });
});
