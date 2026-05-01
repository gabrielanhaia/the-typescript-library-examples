// Book reference: Chapter 8 — optional vs default parameters.

function greetOpt(name: string, greeting?: string): string {
  // greeting is `string | undefined` here — must be handled.
  return `${greeting ?? "Hello"}, ${name}`;
}

function greetDefault(name: string, greeting = "Hello"): string {
  // greeting is `string` here — the default fills in `undefined`.
  return `${greeting}, ${name}`;
}

console.log(greetOpt("Ada"));
console.log(greetOpt("Ada", "Welcome"));
console.log(greetDefault("Ada"));
console.log(greetDefault("Ada", "Welcome"));
