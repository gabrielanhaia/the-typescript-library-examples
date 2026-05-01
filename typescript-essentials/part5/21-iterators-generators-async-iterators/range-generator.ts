// Book reference: Chapter 21 — custom iterable + generator function.

class Range implements Iterable<number> {
  constructor(
    public start: number,
    public end: number,
  ) {}

  *[Symbol.iterator](): Iterator<number> {
    for (let i = this.start; i < this.end; i++) yield i;
  }
}

const r = new Range(1, 5);
for (const n of r) console.log(n);
console.log([...r]);
