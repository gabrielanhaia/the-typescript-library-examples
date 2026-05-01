// Book reference: Chapter 28, pattern 6 — floating Promise.

async function doAsyncWork(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 10));
}

// ── Broken ─────────────────────────────────────────────────────────────────
// Promise is never awaited. If it rejects, the rejection becomes unhandled.
async function processBroken(): Promise<void> {
  doAsyncWork(); // ESLint's no-floating-promises catches this
  await doAsyncWork();
}

// ── Fixed: await ───────────────────────────────────────────────────────────
async function processFixed1(): Promise<void> {
  await doAsyncWork();
  await doAsyncWork();
}

// ── Fixed: explicit fire-and-forget ────────────────────────────────────────
async function processFixed2(): Promise<void> {
  void doAsyncWork(); // explicitly intentional
  await doAsyncWork();
}

await processBroken();
await processFixed1();
await processFixed2();
