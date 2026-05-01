// Book reference: Chapter 1, "A failure trace" — the TS version that catches
// the bug. With `summary` declared as required, any caller that omits it
// becomes a compile error.

export type Payment = {
  id: string;
  summary: { total: number; currency: string };
};

export function formatReceipt(payment: Payment): string {
  const { summary } = payment;
  return `Total: ${summary.total} ${summary.currency}`;
}

// The 2026 caller that broke production now triggers a compile error here:

// @ts-expect-error — Property 'summary' is missing in type
//                    '{ id: string; customerId: string; }'
//                    but required in type 'Payment'.
const _result = formatReceipt({ id: "p-42", customerId: "c-1" });
