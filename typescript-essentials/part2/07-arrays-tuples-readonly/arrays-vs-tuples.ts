// Book reference: Chapter 7 — arrays, tuples, and the difference.

const xs: number[] = [1, 2, 3];
xs.push(4);
console.log("array:", xs);

type Point = readonly [number, number];
const origin: Point = [0, 0];
const [x, y] = origin;
console.log(`Point at (${x}, ${y})`);

// Labeled tuple (TS 4.0+).
type Result = [data: string | null, error: Error | null];
function parseInput(s: string): Result {
  const n = Number.parseInt(s, 10);
  if (Number.isNaN(n)) return [null, new Error(`not a number: ${s}`)];
  return [String(n * 2), null];
}

const [data, err] = parseInput("21");
if (err) {
  console.error("failed:", err.message);
} else {
  console.log("result:", data);
}
