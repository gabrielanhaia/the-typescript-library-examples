// Book reference: Chapter 12, "A worked example: a domain event log".

function unreachable(value: never): never {
  throw new Error(`Unhandled event: ${JSON.stringify(value)}`);
}

export type DomainEvent =
  | { kind: "OrderPlaced"; orderId: string; userId: string; total: number; placedAt: Date }
  | { kind: "OrderPaid"; orderId: string; method: "card" | "wire" | "credit"; paidAt: Date }
  | { kind: "OrderShipped"; orderId: string; tracking: string; shippedAt: Date }
  | { kind: "OrderDelivered"; orderId: string; deliveredAt: Date }
  | { kind: "OrderCancelled"; orderId: string; reason: string; cancelledAt: Date };

export function describe(e: DomainEvent): string {
  switch (e.kind) {
    case "OrderPlaced":
      return `Order ${e.orderId} placed by ${e.userId} for $${e.total}`;
    case "OrderPaid":
      return `Order ${e.orderId} paid via ${e.method}`;
    case "OrderShipped":
      return `Order ${e.orderId} shipped (${e.tracking})`;
    case "OrderDelivered":
      return `Order ${e.orderId} delivered`;
    case "OrderCancelled":
      return `Order ${e.orderId} cancelled: ${e.reason}`;
    default:
      return unreachable(e);
  }
}

const log: DomainEvent[] = [
  { kind: "OrderPlaced", orderId: "o-1", userId: "u-1", total: 99, placedAt: new Date() },
  { kind: "OrderPaid", orderId: "o-1", method: "card", paidAt: new Date() },
  { kind: "OrderShipped", orderId: "o-1", tracking: "TRACK123", shippedAt: new Date() },
];

for (const event of log) {
  console.log(describe(event));
}
