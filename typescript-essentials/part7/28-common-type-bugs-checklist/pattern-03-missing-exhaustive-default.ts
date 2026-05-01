// Book reference: Chapter 28, pattern 3 — missing exhaustive default.

type Action = { type: "ADD"; item: string } | { type: "REMOVE"; id: string };

// ── Broken ─────────────────────────────────────────────────────────────────
// No default branch. When a new action type is added, this function silently
// ignores it. The bug hides in production.
function handleBroken(action: Action): void {
  switch (action.type) {
    case "ADD":
      console.log("add", action.item);
      break;
    case "REMOVE":
      console.log("remove", action.id);
      break;
  }
}

// ── Fixed ──────────────────────────────────────────────────────────────────
// `assertNever` default proves exhaustiveness at compile time.
function assertNever(value: never): never {
  throw new Error(`Unexpected: ${JSON.stringify(value)}`);
}

function handleFixed(action: Action): void {
  switch (action.type) {
    case "ADD":
      console.log("add", action.item);
      break;
    case "REMOVE":
      console.log("remove", action.id);
      break;
    default:
      assertNever(action);
  }
}

handleBroken({ type: "ADD", item: "x" });
handleFixed({ type: "REMOVE", id: "y" });
