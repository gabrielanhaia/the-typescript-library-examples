// Part IV — Library shape and export discipline
// A small library: branded ID types, a public API of 4 functions,
// and internal helpers (underscore-prefixed) that are not re-exported.

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

// Branded IDs — distinct at the type level even though both wrap `string`.
export type UserId = string & { readonly __brand: "UserId" };
export type OrderId = string & { readonly __brand: "OrderId" };

export type CreateOrderError =
  | { kind: "invalid-user-id" }
  | { kind: "invalid-order-id" }
  | { kind: "duplicate-order"; id: OrderId };

export type Order = {
  id: OrderId;
  userId: UserId;
  total: number;
};

// --- Internal helpers — not re-exported through the public surface. ---

function _isValidUuid(s: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
}

function _normalizeId(s: string): string {
  return s.trim().toLowerCase();
}

// --- Public API ---

export function userId(s: string): Result<UserId, "invalid-user-id"> {
  const n = _normalizeId(s);
  if (!_isValidUuid(n)) return err("invalid-user-id");
  return ok(n as UserId);
}

export function orderId(s: string): Result<OrderId, "invalid-order-id"> {
  const n = _normalizeId(s);
  if (!_isValidUuid(n)) return err("invalid-order-id");
  return ok(n as OrderId);
}

export function createOrder(
  rawUserId: string,
  rawOrderId: string,
  total: number,
  existing: ReadonlySet<OrderId>,
): Result<Order, CreateOrderError> {
  const u = userId(rawUserId);
  if (!u.ok) return err({ kind: "invalid-user-id" });
  const o = orderId(rawOrderId);
  if (!o.ok) return err({ kind: "invalid-order-id" });
  if (existing.has(o.value)) return err({ kind: "duplicate-order", id: o.value });
  return ok({ id: o.value, userId: u.value, total });
}

export function totalForUser(orders: readonly Order[], target: UserId): number {
  return orders.filter((order) => order.userId === target).reduce((sum, o) => sum + o.total, 0);
}
