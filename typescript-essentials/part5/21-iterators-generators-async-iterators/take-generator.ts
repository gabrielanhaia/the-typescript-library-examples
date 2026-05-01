// Book reference: Chapter 21 — generic `take<T>` over any iterable.

function* fibonacci(): Generator<number, void, void> {
  let [a, b] = [0, 1];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function* take<T>(iter: Iterable<T>, n: number): Generator<T, void, void> {
  let i = 0;
  for (const x of iter) {
    if (i++ >= n) return;
    yield x;
  }
}

const first10 = [...take(fibonacci(), 10)];
console.log("first 10 fibs:", first10);
