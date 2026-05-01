// Part III — TS-native patterns to reach for
// Discriminated unions (TS analogue of Kotlin sealed classes).

export type HttpResponse =
  | { kind: "ok"; status: 200; body: string }
  | { kind: "redirect"; status: 301 | 302; location: string }
  | { kind: "error"; status: number; message: string };

export function assertNever(x: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
}

export function describe(r: HttpResponse): string {
  switch (r.kind) {
    case "ok":
      return `OK: ${r.body}`;
    case "redirect":
      return `Redirect ${r.status.toString()} to ${r.location}`;
    case "error":
      return `Error ${r.status.toString()}: ${r.message}`;
    default:
      return assertNever(r);
  }
}

// Literal types as enum replacements.
export type Color = "red" | "green" | "blue";

export const COLORS = ["red", "green", "blue"] as const;
export type ColorFromArray = (typeof COLORS)[number];

// `const` type parameter (TS 5.0+) preserves literals through inference.
export function pick<const T>(value: T): T {
  return value;
}
