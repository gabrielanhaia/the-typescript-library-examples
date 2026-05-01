// Book reference: Chapter 11 "A worked example" — typed event-bus guard.

type AppEvent =
  | { kind: "user.created"; userId: string }
  | { kind: "user.deleted"; userId: string; reason: string }
  | { kind: "order.placed"; orderId: string; amount: number };

type EventOfKind<K extends AppEvent["kind"]> = Extract<AppEvent, { kind: K }>;

function isEvent<K extends AppEvent["kind"]>(
  kind: K,
): (event: AppEvent) => event is EventOfKind<K> {
  return (event): event is EventOfKind<K> => event.kind === kind;
}

const events: AppEvent[] = [
  { kind: "user.created", userId: "u-1" },
  { kind: "order.placed", orderId: "o-1", amount: 99 },
  { kind: "user.deleted", userId: "u-2", reason: "GDPR" },
  { kind: "order.placed", orderId: "o-2", amount: 149 },
];

const orderEvents = events.filter(isEvent("order.placed"));
//    ^ inferred: { kind: "order.placed"; orderId: string; amount: number }[]
const userEvents = events.filter(isEvent("user.created"));

console.log("order events:", orderEvents);
console.log("user-created events:", userEvents);
