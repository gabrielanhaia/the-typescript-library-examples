# Chapter 1 — Why TypeScript Exists

The order-confirmation worker failure trace from "A failure trace" in the chapter.

## Files

- `broken-format-receipt.js` — the original JavaScript that crashed at 2 a.m.: a function that assumed `payment.summary` was always defined.
- `format-receipt-typed-strict.ts` — the same function in TypeScript, with the type that _would have_ caught the bug at compile time.
- `format-receipt-typed-fixed.ts` — the corrected version: `summary` modeled as optional, with a defensive branch.
- `runnable/demo.ts` — runs all three side by side so you can see the difference.

## Run

```bash
# Type-check the strict version (will fail — that's the point):
npx tsc --noEmit format-receipt-typed-strict.ts

# Run the fixed version:
npx tsx runnable/demo.ts
```

## What this demonstrates

The chapter's argument that TypeScript catches _contract_ bugs that linters and tests miss. The broken JS passes every linter and every test the original team wrote. The strict TS would have refused to compile.
