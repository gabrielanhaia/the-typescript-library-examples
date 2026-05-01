# Chapter 13 — Closures and Narrowing (TS 5.4+)

## Files

- `getUrls.ts` — the canonical example from the chapter: narrow → map → use the narrowed value.
- `still-needs-const-capture.ts` — a case where the 5.4 fix doesn't fire because a later assignment invalidates the narrow.

## Run

```bash
npx tsx part3/13-closures-and-narrowing/getUrls.ts
npx tsx part3/13-closures-and-narrowing/still-needs-const-capture.ts
```
