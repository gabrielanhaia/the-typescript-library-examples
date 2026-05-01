// Book reference: Chapter 24 "A worked example" — Vitest tests for the
// paginated async generator.

import { describe, it, expect, vi } from "vitest";
import { allItems, type Page } from "./pagination.ts";

describe("allItems", () => {
  it("yields items across pages", async () => {
    const fetchPage = vi
      .fn<(cursor: string | null) => Promise<Page<number>>>()
      .mockResolvedValueOnce({ items: [1, 2, 3], nextCursor: "c1" })
      .mockResolvedValueOnce({ items: [4, 5], nextCursor: null });

    const items: number[] = [];
    for await (const item of allItems(fetchPage)) items.push(item);

    expect(items).toEqual([1, 2, 3, 4, 5]);
    expect(fetchPage).toHaveBeenCalledTimes(2);
    expect(fetchPage).toHaveBeenNthCalledWith(1, null);
    expect(fetchPage).toHaveBeenNthCalledWith(2, "c1");
  });

  it("handles single-page results", async () => {
    const fetchPage = vi
      .fn<(cursor: string | null) => Promise<Page<number>>>()
      .mockResolvedValue({ items: [1, 2, 3], nextCursor: null });

    const items: number[] = [];
    for await (const item of allItems(fetchPage)) items.push(item);

    expect(items).toEqual([1, 2, 3]);
  });

  it("handles empty results", async () => {
    const fetchPage = vi
      .fn<(cursor: string | null) => Promise<Page<number>>>()
      .mockResolvedValue({ items: [], nextCursor: null });

    const items: number[] = [];
    for await (const item of allItems(fetchPage)) items.push(item);

    expect(items).toEqual([]);
  });
});
