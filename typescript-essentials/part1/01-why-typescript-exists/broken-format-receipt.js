// Book reference: Chapter 1, "A failure trace".
// This is the original JavaScript that crashed in production:
// the new caller passed a Payment without `summary`, the function
// dereferenced `summary.total`, and the worker crashed on every
// twelve-thousandth order.
//
// This file is intentionally broken — do not adapt it.

export function formatReceipt(payment) {
  const { summary } = payment;
  return `Total: ${summary.total} ${summary.currency}`;
}

// What the new caller did:
//   formatReceipt({ id: "p-42", customerId: "c-1" })
// Result: TypeError: Cannot read properties of undefined (reading 'total')
