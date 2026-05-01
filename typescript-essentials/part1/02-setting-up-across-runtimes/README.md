# Chapter 2 — Setting Up Across Runtimes

The same TypeScript file run on Node, Bun, Deno, and (via Vite) the browser.

## Files

- `hello.ts` — the 24-character TS file the chapter opens with.
- `portable.ts` — a slightly larger TS file (a function plus a typed call site) that is fully runtime-portable.
- `bun-specific.ts` — the same idea, but using Bun's `Bun.file` API. Will only run under Bun.
- `deno-specific.ts` — the same idea, using `Deno.readTextFile`. Will only run under Deno.
- `node-specific.ts` — Node's `node:fs/promises` flavor. Runs on Node and on Bun (Node-compat); fails on Deno without the `npm:` specifier.

## Run

```bash
# Node 22+ (use --experimental-strip-types if needed; default in 24+):
node --experimental-strip-types hello.ts

# Or via tsx (broad Node compatibility):
npx tsx hello.ts

# Bun:
bun hello.ts

# Deno:
deno run hello.ts

# Browser (via Vite, set up in the parent repo):
# Import hello.ts from a Vite-built page; see `vite-demo/` for a minimal scaffold.
```

## What this demonstrates

The chapter's claim that the language is portable across the four runtimes; the divergence is in tooling and runtime-specific APIs, not in the language itself.
