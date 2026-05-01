// Book reference: Chapter 1, demonstration of the failure trace.
// Run with:  npx tsx part1/01-why-typescript-exists/runnable/demo.ts

import { formatReceipt } from "../format-receipt-typed-fixed.ts";

const completed = {
  id: "p-100",
  summary: { total: 99, currency: "EUR" },
};

const refundInProgress = {
  id: "p-101",
};

console.log("Completed payment :", formatReceipt(completed));
console.log("Refund in progress:", formatReceipt(refundInProgress));
