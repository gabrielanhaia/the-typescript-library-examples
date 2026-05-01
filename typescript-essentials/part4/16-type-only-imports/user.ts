import type { Order } from "./order.ts";

export type User = {
  id: string;
  orders: Order[];
};
