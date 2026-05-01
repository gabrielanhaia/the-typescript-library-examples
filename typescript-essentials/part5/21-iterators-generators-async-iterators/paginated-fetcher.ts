// Book reference: Chapter 21 "A worked example" — paginated async generator.

interface Page<T> {
  items: T[];
  nextCursor: string | null;
}

export async function* allItems<T>(
  fetchPage: (cursor: string | null) => Promise<Page<T>>,
): AsyncGenerator<T, void, void> {
  let cursor: string | null = null;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    const page = await fetchPage(cursor);
    for (const item of page.items) yield item;
    if (page.nextCursor === null) return;
    cursor = page.nextCursor;
  }
}

// Mock pagination:
const pages: Page<number>[] = [
  { items: [1, 2, 3], nextCursor: "p2" },
  { items: [4, 5], nextCursor: "p3" },
  { items: [6, 7, 8, 9], nextCursor: null },
];

let pageIdx = 0;
async function fakeFetch(): Promise<Page<number>> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 5);
  });
  const p = pages[pageIdx++];
  if (!p) throw new Error("page out of range");
  return p;
}

const collected: number[] = [];
for await (const item of allItems(fakeFetch)) collected.push(item);
console.log("collected:", collected);
