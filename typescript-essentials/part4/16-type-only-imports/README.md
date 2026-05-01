# Chapter 16 — Type-Only Imports and Exports

## Files

- `circular-types.ts` — two type-only-imported types referencing each other (no runtime cycle).
- `mixed-import.ts` — value-and-type from the same module.
- `type-only-namespace.ts` — `import type * as` for a whole module's types.

Pair with `verbatimModuleSyntax: true` in tsconfig (the example repo's tsconfig has it on).
