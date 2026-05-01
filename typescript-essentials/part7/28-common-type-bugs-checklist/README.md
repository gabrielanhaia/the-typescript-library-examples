# Chapter 28 — Common Type-Related Bugs (Reviewer's Checklist)

The 15 patterns from the reviewer's checklist, each as a `pattern-NN-name.ts` file showing the broken form on top and the fix on the bottom (with `@ts-expect-error` on the broken line so the file still type-checks).

## Files

| File                                                   | Pattern                                                      |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| `pattern-01-any-no-justification.ts`                   | `any` annotation without justification                       |
| `pattern-02-as-cast-at-runtime-boundary.ts`            | `as` cast at a runtime boundary                              |
| `pattern-03-missing-exhaustive-default.ts`             | Missing exhaustive `default` in a discriminated-union switch |
| `pattern-04-optional-chaining-swallows-errors.ts`      | Optional chaining hiding required-value bugs                 |
| `pattern-05-lying-type-guard.ts`                       | Type guard that doesn't actually check                       |
| `pattern-06-floating-promise.ts`                       | Floating Promise                                             |
| `pattern-07-unawaited-in-sync-expectation.ts`          | Async callback in sync-expecting `filter`/`forEach`          |
| `pattern-08-empty-destructure-no-default.ts`           | Destructure of optional field without default                |
| `pattern-09-readonly-mutation-via-cast.ts`             | Mutation of `readonly` parameter via cast                    |
| `pattern-10-catch-without-narrowing.ts`                | `catch (e)` using `e` directly                               |
| `pattern-11-mutable-typed-as-immutable.ts`             | Casting away `Readonly<T>`                                   |
| `pattern-12-string-discriminator.ts`                   | Discriminator typed as `string` instead of literal union     |
| `pattern-13-ts-ignore-no-comment.ts`                   | `@ts-ignore` without a justification                         |
| `pattern-14-too-wide-return.ts`                        | Function returning a wider type than necessary               |
| `pattern-15-index-access-no-uncheckedindexedaccess.ts` | Indexed access without `noUncheckedIndexedAccess` awareness  |

## Run

```bash
# Type-check the whole set:
npx tsc --noEmit part7/28-common-type-bugs-checklist/*.ts

# Each file is also runnable as a standalone demo:
npx tsx part7/28-common-type-bugs-checklist/pattern-03-missing-exhaustive-default.ts
```

## What this demonstrates

The chapter's claim that an experienced reviewer recognizes these patterns on sight. Each file is structured so reading top-to-bottom gives you the bug, then the fix.
