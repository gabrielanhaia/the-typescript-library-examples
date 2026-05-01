// Book reference: Chapter 20 — generic retry helper preserving the inner type.

const sleep = (ms: number): Promise<void> =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export async function retry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      await sleep(2 ** i * 50);
    }
  }
  throw lastError;
}

let calls = 0;
async function flakey(): Promise<string> {
  calls++;
  await sleep(1);
  if (calls < 3) throw new Error(`attempt ${calls} failed`);
  return `success on attempt ${calls}`;
}

const result = await retry(flakey, 5);
console.log(result);
