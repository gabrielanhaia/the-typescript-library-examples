# Book 3 — Kotlin and Java to TypeScript

Runnable code examples for **Book 3** of _The TypeScript Library_ — _Kotlin and Java to TypeScript: A Bridge for JVM Developers_ by Gabriel Anhaia.

This folder is one of five in the [the-typescript-library-examples](https://github.com/gabrielanhaia/the-typescript-library-examples) repository. The top-level [README](../README.md) explains the collection.

The examples are TypeScript-only — the book shows Kotlin and Java side-by-side in prose for comparison, but only the TS side is in this CI-verified folder. For Kotlin parallels, the book's chapters reference the [Kotlin Playground](https://play.kotlinlang.org).

## Layout

- `part1/` — Mental model translation (Ch 1-4)
- `part2/` — Types: lessons mostly transferable (Ch 5-9)
- `part3/` — TS-native patterns to reach for (Ch 10-13)
- `part4/` — Concurrency translation (Ch 14-16)
- `part5/` — Tooling and build (Ch 17-20)
- `part6/` — Patterns: same names, different meanings (Ch 21-24)
- `part7/` — Building a real app (Ch 25-27)

## Verifying

```bash
npm install
npm run ci
```

The `ci` script runs:

- `tsc --noEmit` — type-checking
- `eslint` — type-aware linting (typescript-eslint 8.x strict-type-checked)
- `prettier --check`
- `vitest run` — runtime tests

Pinned to TypeScript 6.0 (March 2026) and the latest tooling versions referenced in the book.
