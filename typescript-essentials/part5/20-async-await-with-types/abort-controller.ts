// Book reference: Chapter 20 — AbortController and cancellation.

async function slowOp(signal: AbortSignal, ms: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const t = setTimeout(() => {
      resolve("done");
    }, ms);
    signal.addEventListener("abort", () => {
      clearTimeout(t);
      const reason: unknown = signal.reason;
      reject(reason instanceof Error ? reason : new Error(String(reason)));
    });
  });
}

async function withTimeout(): Promise<void> {
  try {
    const r = await slowOp(AbortSignal.timeout(50), 200);
    console.log("got:", r);
  } catch (e) {
    if (e instanceof Error) console.error("timed out:", e.message);
  }
}

async function withManualCancel(): Promise<void> {
  const controller = new AbortController();
  setTimeout(() => {
    controller.abort(new Error("user cancelled"));
  }, 50);
  try {
    const r = await slowOp(controller.signal, 200);
    console.log("got:", r);
  } catch (e) {
    if (e instanceof Error) console.error("cancelled:", e.message);
  }
}

await withTimeout();
await withManualCancel();
