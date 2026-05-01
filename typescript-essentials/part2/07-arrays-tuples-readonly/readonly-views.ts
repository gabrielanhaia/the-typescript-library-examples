// Book reference: Chapter 7 — readonly parameter views.

export function sum(xs: readonly number[]): number {
  return xs.reduce((acc, x) => acc + x, 0);
}

// A class returning an internal-collection readonly view.
export class Cache {
  readonly #items: string[] = [];

  add(item: string): void {
    this.#items.push(item);
  }

  getItems(): readonly string[] {
    return this.#items;
  }
}

const c = new Cache();
c.add("a");
c.add("b");
const items = c.getItems();
// items.push("c"); // ← compile error: Property 'push' does not exist on type 'readonly string[]'.
console.log("items:", items);
console.log("sum  :", sum([1, 2, 3, 4]));
