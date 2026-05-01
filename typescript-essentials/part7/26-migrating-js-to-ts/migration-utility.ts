// After migration — JSDoc lifted into TS annotations.

export function dedupe(names: string[]): string[] {
  return [...new Set(names)];
}

console.log(dedupe(["a", "b", "a", "c", "b"]));
