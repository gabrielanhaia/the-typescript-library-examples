// Book reference: Chapter 27 — read a generic by substituting concrete types.

// Generic:
function pipe<A, B, C>(ab: (a: A) => B, bc: (b: B) => C): (a: A) => C {
  return (a) => bc(ab(a));
}

// Concrete substitution: A=string, B=number, C=string
const len = (s: string): number => s.length;
const padPretty = (n: number): string => `[${n}]`;
const lenAndFormat = pipe(len, padPretty);

console.log(lenAndFormat("hello, world")); // → "[12]"
console.log(lenAndFormat("a"));

// Generic identity-shaped functions:
function first<T>(xs: T[]): T | undefined {
  return xs[0];
}

const x: number | undefined = first([1, 2, 3]);
const y: string | undefined = first(["a", "b"]);
console.log(x, y);

// Reading the type of a known function:
type LenFn = typeof len; // (s: string) => number
const _typed: LenFn = (s) => s.length;
void _typed;
