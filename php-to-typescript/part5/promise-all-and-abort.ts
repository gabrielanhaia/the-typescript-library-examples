// Part V — Async and concurrency
// Promise.all, Promise.allSettled, AbortController.

export type Order = { id: string; total: number };

export async function fetchOrder(id: string, signal?: AbortSignal): Promise<Order> {
  await new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, 1);
    signal?.addEventListener("abort", () => {
      clearTimeout(t);
      reject(new Error("aborted"));
    });
  });
  return { id, total: 100 };
}

// Parallel — Promise.all rejects on first failure.
export async function fetchAll(ids: readonly string[], timeoutMs: number): Promise<Order[]> {
  const signal = AbortSignal.timeout(timeoutMs);
  return Promise.all(ids.map((id) => fetchOrder(id, signal)));
}

// All-best-effort — Promise.allSettled never rejects.
export async function fetchAllSettled(
  ids: readonly string[],
): Promise<{ ok: Order[]; failed: string[] }> {
  const results = await Promise.allSettled(ids.map((id) => fetchOrder(id)));
  const ok: Order[] = [];
  const failed: string[] = [];
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    const id = ids[i];
    if (r === undefined || id === undefined) continue;
    if (r.status === "fulfilled") ok.push(r.value);
    else failed.push(id);
  }
  return { ok, failed };
}
