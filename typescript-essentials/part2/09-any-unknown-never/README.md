# Chapter 9 — `any`, `unknown`, `never`

The triangle: `any` opts out, `unknown` defers, `never` proves an exhaustive check.

## Files

- `the-triangle.ts` — side-by-side comparison of how each behaves under the strict tsconfig.
- `unknown-with-narrowing.ts` — typed JSON parsing using `unknown` plus a hand-written guard.
- `unknown-with-zod.ts` — same shape using a Zod schema (the production-typical pattern).
- `never-exhaustive.ts` — the `assertNever` pattern with a deliberate "missing case" demonstration.
- `any-creep.ts` — what contagion looks like when one untyped value flows through a system.

## Run

```bash
npx tsc --noEmit part2/09-any-unknown-never/*.ts
npx tsx part2/09-any-unknown-never/never-exhaustive.ts
```

The `unknown-with-zod.ts` file requires `zod` as a dependency:

```bash
npm install zod
```
