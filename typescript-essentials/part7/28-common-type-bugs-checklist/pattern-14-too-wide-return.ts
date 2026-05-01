// Book reference: Chapter 28, pattern 14 — function returning too wide a type.

// ── Broken ─────────────────────────────────────────────────────────────────
// Return type `string` widens away the literal information.
function getStatusBroken(): string {
  return "open";
}

// Caller can't pattern-match without unsafe narrowing.
const _broken: "open" | "closed" = getStatusBroken() as "open" | "closed";

// ── Fixed ──────────────────────────────────────────────────────────────────
// Return a literal union. Callers can switch exhaustively.
function getStatusFixed(): "open" | "closed" | "archived" {
  return "open";
}

const fixed = getStatusFixed();
switch (fixed) {
  case "open":
    console.log("OPEN");
    break;
  case "closed":
    console.log("CLOSED");
    break;
  case "archived":
    console.log("ARCHIVED");
    break;
}
void _broken;
