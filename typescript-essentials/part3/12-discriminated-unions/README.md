# Chapter 12 — Discriminated Unions

The pattern that quietly replaces inheritance hierarchies in most TypeScript codebases.

## Files

- `shape.ts` — the canonical Shape example with `kind` discriminator and exhaustive `area()`.
- `result.ts` — the `Result<T, E>` discriminated union (`ok: true | false`).
- `loading-state.ts` — a state machine modeled as a discriminated union.
- `domain-event.ts` — an e-commerce domain event log; demonstrates how adding a new event type forces every consumer to update.

## Run

```bash
npx tsx part3/12-discriminated-unions/shape.ts
npx tsx part3/12-discriminated-unions/result.ts
npx tsx part3/12-discriminated-unions/domain-event.ts
```

## What this demonstrates

The exhaustive-check trick (`assertNever`) catches missing cases at compile time when a new union variant is added. Try adding a `{ kind: "ellipse" }` member to `shape.ts` to see the compile error in `area()`.
