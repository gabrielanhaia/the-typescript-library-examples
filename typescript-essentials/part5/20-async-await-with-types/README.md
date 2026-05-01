# Chapter 20 — Async / Await with Types

## Files

- `promise-basics.ts` — `Promise<T>`, `async`, `await`, the void-return pattern.
- `parallel-vs-sequential.ts` — `Promise.all` vs sequential `await`.
- `abort-controller.ts` — cancellation with `AbortSignal.timeout`.
- `result-async.ts` — typed errors with a Result discriminated union.
- `retry-with-backoff.ts` — generic retry helper preserving the inner type.

## Run

```bash
npx tsx part5/20-async-await-with-types/promise-basics.ts
npx tsx part5/20-async-await-with-types/parallel-vs-sequential.ts
npx tsx part5/20-async-await-with-types/abort-controller.ts
npx tsx part5/20-async-await-with-types/result-async.ts
npx tsx part5/20-async-await-with-types/retry-with-backoff.ts
```
