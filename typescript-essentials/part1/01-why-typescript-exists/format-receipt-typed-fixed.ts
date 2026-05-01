// Book reference: Chapter 1, "A failure trace" — the corrected version.
// Once the team realized `summary` could be absent during refund computation,
// the right move was to widen the type honestly and handle the optional case.

export type Payment = {
  id: string;
  summary?: { total: number; currency: string };
};

export function formatReceipt(payment: Payment): string {
  if (!payment.summary) {
    return "Total: pending";
  }
  const { summary } = payment;
  return `Total: ${summary.total} ${summary.currency}`;
}

// Both shapes are now valid:
const _withSummary = formatReceipt({
  id: "p-42",
  summary: { total: 99, currency: "EUR" },
});

const _refundInProgress = formatReceipt({ id: "p-42" });
