# Chapter 24 — Testing Entry Points

## Files

- `pagination.ts` — the function under test (a slim version of Chapter 21's async generator).
- `pagination.test.ts` — Vitest tests covering multi-page, single-page, and empty cases.
- `node-test-style.ts` — the same tests written for `node:test`.

## Run

```bash
npm test                      # runs Vitest from the repo root
node --test --import tsx part6/24-testing-entry-points/node-test-style.ts
```
