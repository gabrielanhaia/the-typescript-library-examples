# Chapter 14 — ESM vs CommonJS

## Files

- `esm-source/` — modern ESM source (`.ts` with `import`/`export`).
- `cjs-source/` — same shape rewritten for CommonJS (`.cts`).
- `dual-package.json` — example `package.json` shipping both ESM and CommonJS via conditional exports.

## Run

```bash
npx tsx part4/14-esm-vs-commonjs/esm-source/app.ts
```
