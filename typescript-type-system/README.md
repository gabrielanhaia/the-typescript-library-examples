# Book 2 — The TypeScript Type System

Runnable code examples for **Book 2** of _The TypeScript Library_ — _The TypeScript Type System: From Generics to DSL-Level Types_ by Gabriel Anhaia.

This folder is one of four in the [the-typescript-library-examples](https://github.com/gabrielanhaia/the-typescript-library-examples) repository. The top-level [README](../README.md) explains the collection.

## Layout

- `part1/` — Generics from first principles (Ch 1-4)
- `part2/` — Inference (Ch 5-7)
- `part3/` — Mapped & conditional types (Ch 8-12)
- `part4/` — Template literal types (Ch 13-15)
- `part5/` — Recursive & advanced patterns (Ch 16-18)
- `part6/` — Practical type design (Ch 19-22)
- `part7/` — Type-driven libraries (Ch 23-25)

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
