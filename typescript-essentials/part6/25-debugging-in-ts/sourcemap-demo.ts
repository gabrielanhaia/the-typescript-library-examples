// Book reference: Chapter 25 — sourcemap demo.
// Set a breakpoint at the line marked below, run under the debugger,
// and observe that the call stack reports source-mapped positions.

function level1(input: string): number {
  return level2(input);
}

function level2(input: string): number {
  return level3(input);
}

function level3(input: string): number {
  // Set breakpoint here ↓
  return input.length;
}

console.log(level1("hello, world"));
