// Book reference: Chapter 20 — sequential vs parallel.

async function load(name: string, ms: number): Promise<string> {
  await new Promise((r) => setTimeout(r, ms));
  return `${name} after ${ms}ms`;
}

async function sequential(): Promise<void> {
  const t0 = performance.now();
  const a = await load("A", 50);
  const b = await load("B", 50);
  const c = await load("C", 50);
  console.log("sequential:", [a, b, c], `${(performance.now() - t0).toFixed(0)}ms`);
}

async function parallel(): Promise<void> {
  const t0 = performance.now();
  const [a, b, c] = await Promise.all([load("A", 50), load("B", 50), load("C", 50)]);
  console.log("parallel:  ", [a, b, c], `${(performance.now() - t0).toFixed(0)}ms`);
}

await sequential();
await parallel();
