# Chapter 3 — A Minimal Viable tsconfig

The recommended starter `tsconfig.json` from the chapter, plus broken-then-fixed examples for each `strict` flag.

## Files

- `tsconfig.recommended.json` — the canonical strict config from the chapter's "recommended starter" section.
- `flag-demos/` — one file per `strict` flag showing what it catches.

## Run

```bash
# Type-check the demos (each fails deliberately on the strict flag it demonstrates):
npx tsc --noEmit --project tsconfig.recommended.json flag-demos/no-implicit-any.ts
```
