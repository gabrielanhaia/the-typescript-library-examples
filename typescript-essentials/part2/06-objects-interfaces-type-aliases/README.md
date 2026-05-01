# Chapter 6 — Objects, Interfaces, Type Aliases

## Files

- `three-forms.ts` — inline object type, interface, type alias all describing the same shape.
- `interface-merging.ts` — declaration merging via `interface` (the case `type` cannot match).
- `composition-utilities.ts` — `Pick`, `Omit`, `Partial`, `Required`, `Readonly`.
- `excess-property-checks.ts` — the literal-vs-variable distinction and when the compiler is strict.
- `failure-trace.ts` — the SearchRequest "everything optional" bug and its discriminated-union fix.

## Run

```bash
npx tsx part2/06-objects-interfaces-type-aliases/three-forms.ts
npx tsx part2/06-objects-interfaces-type-aliases/composition-utilities.ts
npx tsx part2/06-objects-interfaces-type-aliases/failure-trace.ts
```
