// Book reference: Chapter 16 — type-only imports avoid the runtime cycle.
// At compile time, the User and Order types refer to each other; at runtime,
// neither file imports the other (the type-only imports are erased).

import type { User } from "./user.ts";
import type { Order } from "./order.ts";

const u: User = {
  id: "u-1",
  orders: [],
};

const o: Order = {
  id: "o-1",
  user: u,
};

u.orders.push(o);

console.log(JSON.stringify({ user: u.id, orderCount: u.orders.length }));
