// Slim version of the paginated fetcher used as the test subject.

export interface Page<T> {
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
