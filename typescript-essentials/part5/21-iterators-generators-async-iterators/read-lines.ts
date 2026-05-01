// Book reference: Chapter 21 — line-by-line file reading via async iterator.

import { createReadStream, writeFileSync, unlinkSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

async function* readLines(path: string): AsyncGenerator<string, void, void> {
  const stream = createReadStream(path, { encoding: "utf8" });
  const rl = createInterface({ input: stream, crlfDelay: Infinity });
  for await (const line of rl) yield line;
}

// Set up a temp file:
const path = join(tmpdir(), `read-lines-demo-${Date.now()}.txt`);
writeFileSync(path, ["alpha", "beta", "gamma", "delta"].join("\n"));

let count = 0;
for await (const line of readLines(path)) {
  console.log(`line ${++count}:`, line);
}

unlinkSync(path);
