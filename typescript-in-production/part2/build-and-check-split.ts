// Part II — Build and check pipelines
// A pure-functional core, deliberately decoupled from runtime concerns,
// so it can be type-checked separately from being built or bundled.

export type Currency = "USD" | "EUR" | "GBP" | "JPY";

// Branded amount: a number tagged with its currency at the type level.
export type Amount<C extends Currency> = number & {
  readonly __brand: "Amount";
  readonly __currency: C;
};

export function amount<C extends Currency>(value: number, _currency: C): Amount<C> {
  if (!Number.isFinite(value)) throw new Error(`Amount must be finite, got ${value}`);
  return value as Amount<C>;
}

const SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
};

const FRACTION_DIGITS: Record<Currency, number> = {
  USD: 2,
  EUR: 2,
  GBP: 2,
  JPY: 0,
};

export function formatPrice<C extends Currency>(value: Amount<C>, currency: C): string {
  const symbol = SYMBOLS[currency];
  const digits = FRACTION_DIGITS[currency];
  return `${symbol}${value.toFixed(digits)}`;
}
