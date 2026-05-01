# Book 4 — PHP to TypeScript

Runnable code examples for **Book 4** of _The TypeScript Library_ — _PHP to TypeScript: A Bridge for Modern PHP 8+ Developers_ by Gabriel Anhaia.

This folder is one of four in the [the-typescript-library-examples](https://github.com/gabrielanhaia/the-typescript-library-examples) repository. The top-level [README](../README.md) explains the collection.

The examples are TypeScript-only — the book shows PHP and TypeScript side-by-side in prose for comparison, but only the TS side is in this CI-verified folder. For PHP parallels, the book's chapters reference the PHP manual and online sandboxes like 3v4l.org.

## Layout

- `part1/` — Mental model translation (Ch 1-4)
- `part2/` — Types and syntax bridges (Ch 5-8)
- `part3/` — Patterns from frameworks (Ch 9-13)
- `part4/` — TS-native patterns to embrace (Ch 14-17)
- `part5/` — Async and concurrency (Ch 18-20)
- `part6/` — Tooling and ecosystem (Ch 21-24)
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
