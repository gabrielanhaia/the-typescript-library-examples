// Book reference: Chapter 28, pattern 8 — destructure of optional field without default.

// ── Broken ─────────────────────────────────────────────────────────────────
function greetBroken({ name }: { name?: string }): string {
  // @ts-expect-error - 'name' is possibly 'undefined'.
  return `Hello, ${name.toUpperCase()}`;
}

// ── Fixed: default ─────────────────────────────────────────────────────────
function greetFixed1({ name = "stranger" }: { name?: string }): string {
  return `Hello, ${name.toUpperCase()}`;
}

// ── Fixed: explicit narrow ─────────────────────────────────────────────────
function greetFixed2({ name }: { name?: string }): string {
  if (name === undefined) return "Hello, stranger";
  return `Hello, ${name.toUpperCase()}`;
}

// Don't actually call greetBroken — it would crash at runtime.
console.log(greetFixed1({ name: "Ada" }));
console.log(greetFixed1({}));
console.log(greetFixed2({ name: "Eve" }));
console.log(greetFixed2({}));
void greetBroken;
