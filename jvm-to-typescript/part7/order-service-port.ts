// Part VII — Building a real app: the worked port.
// A small slice of the Hono port from Ch 25 — the service-layer shape
// without the HTTP plumbing or the database driver.

import { z } from "zod";

export const createOrderInputSchema = z.object({
  customerId: z.string().regex(/^c-/),
  items: z
    .array(
      z.object({
        sku: z.string(),
        quantity: z.number().int().positive(),
        priceCents: z.number().int().nonnegative(),
      }),
    )
    .min(1),
});

export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;

export type Order = {
  id: string;
  customerId: string;
  totalCents: number;
  items: CreateOrderInput["items"];
};

export type OrderError = { kind: "invalid"; details: string } | { kind: "not_found"; id: string };

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export type OrderRepository = {
  save(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
};

export type OrderService = {
  create(input: unknown): Promise<Result<Order, OrderError>>;
  fetch(id: string): Promise<Result<Order, OrderError>>;
};

export function createOrderService(deps: {
  repo: OrderRepository;
  newId: () => string;
}): OrderService {
  return {
    async create(input: unknown) {
      const parsed = createOrderInputSchema.safeParse(input);
      if (!parsed.success) {
        return { ok: false, error: { kind: "invalid", details: parsed.error.message } };
      }
      const order: Order = {
        id: deps.newId(),
        customerId: parsed.data.customerId,
        items: parsed.data.items,
        totalCents: parsed.data.items.reduce((sum, it) => sum + it.priceCents * it.quantity, 0),
      };
      await deps.repo.save(order);
      return { ok: true, value: order };
    },
    async fetch(id: string) {
      const order = await deps.repo.findById(id);
      if (order === null) return { ok: false, error: { kind: "not_found", id } };
      return { ok: true, value: order };
    },
  };
}
