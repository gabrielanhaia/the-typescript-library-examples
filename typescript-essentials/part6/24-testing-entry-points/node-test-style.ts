// Book reference: Chapter 24 — Node's built-in `node:test` runner style.

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { allItems, type Page } from "./pagination.ts";

void describe("allItems (node:test)", () => {
  void it("yields items across pages", async () => {
    const pages: Page<number>[] = [
      { items: [1, 2, 3], nextCursor: "c1" },
      { items: [4, 5], nextCursor: null },
    ];

    let calls = 0;
    function fetchPage(): Promise<Page<number>> {
      const p = pages[calls++];
      if (!p) throw new Error("called too many times");
      return Promise.resolve(p);
    }

    const items: number[] = [];
    for await (const item of allItems(fetchPage)) items.push(item);

    assert.deepEqual(items, [1, 2, 3, 4, 5]);
    assert.equal(calls, 2);
  });
});
