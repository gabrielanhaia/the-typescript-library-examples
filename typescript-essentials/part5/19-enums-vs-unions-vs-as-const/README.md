# Chapter 19 — Enums vs Union Literals vs `as const`

## Files

- `union-literal.ts` — string-literal union (cleanest, zero runtime cost).
- `as-const-object.ts` — runtime values + derived type.
- `bit-flags-enum.ts` — the niche where a numeric enum is still defensible.
- `migrating-from-enum.ts` — before/after of the enum-to-as-const migration.

## Run

```bash
npx tsx part5/19-enums-vs-unions-vs-as-const/union-literal.ts
npx tsx part5/19-enums-vs-unions-vs-as-const/as-const-object.ts
npx tsx part5/19-enums-vs-unions-vs-as-const/bit-flags-enum.ts
```
