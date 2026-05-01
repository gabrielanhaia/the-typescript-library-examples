// Book reference: Chapter 2, "A single TS source that runs everywhere".
// Pure TS — no runtime-specific APIs. Runs on every supported runtime.

export function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("Working dev"));
