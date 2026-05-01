// Book reference: Chapter 28, pattern 10 — catch without narrowing.

async function riskyOp(): Promise<void> {
  throw new Error("boom");
}

// ── Broken ─────────────────────────────────────────────────────────────────
// With `useUnknownInCatchVariables`, this is a compile error. Without, the
// runtime crashes on a thrown non-Error.
async function handleBroken(): Promise<void> {
  try {
    await riskyOp();
  } catch (e) {
    // @ts-expect-error — 'e' is of type 'unknown'.
    console.error(e.message);
  }
}

// ── Fixed ──────────────────────────────────────────────────────────────────
async function handleFixed(): Promise<void> {
  try {
    await riskyOp();
  } catch (e) {
    if (e instanceof Error) {
      console.error("error:", e.message);
    } else {
      console.error("non-Error thrown:", String(e));
    }
  }
}

await handleBroken();
await handleFixed();
