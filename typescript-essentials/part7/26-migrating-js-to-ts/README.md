# Chapter 26 — Migrating a JS Project to TS

The migration runbook from the chapter. Three reference tsconfigs covering the staged tightening:

## Files

- `tsconfig.stage0.json` — `allowJs: true, checkJs: false, strict: false` — day-zero non-event.
- `tsconfig.stage3.json` — `checkJs: true`, surface JSDoc-typed errors before renaming.
- `tsconfig.final.json` — `allowJs: false, strict: true` plus the four extra strict flags.
- `migration-utility.js` → `migration-utility.ts` — a small before/after of a real renamed file.
