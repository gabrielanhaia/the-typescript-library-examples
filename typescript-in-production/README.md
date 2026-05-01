# Book 5 — TypeScript in Production

Runnable code examples for **Book 5** of _The TypeScript Library_ — _TypeScript in Production: Strict Configs, Build Pipelines, and Library Discipline_ by Gabriel Anhaia.

This folder is one of five in the [the-typescript-library-examples](https://github.com/gabrielanhaia/the-typescript-library-examples) repository. The top-level [README](../README.md) explains the collection.

## Layout

- `part1/` — Strict tsconfig effects (Ch 1-5)
- `part2/` — Build and check pipelines (Ch 6-9)
- `part3/` — Cross-runtime libraries (Ch 10-14)
- `part4/` — Library shape and export discipline (Ch 15-19)
- `part5/` — Shared types, schemas, and module layering (Ch 20-22)
- `part6/` — Type-level performance patterns (Ch 23-25)
- `part7/` — Type-level tests and contracts (Ch 26-28)

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
