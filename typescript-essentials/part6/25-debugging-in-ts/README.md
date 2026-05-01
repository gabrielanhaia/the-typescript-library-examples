# Chapter 25 — Debugging in TS

## Files

- `launch.json` — VS Code debugger configuration covering "debug current TS file" and "attach to running Node".
- `sourcemap-demo.ts` — a small file with a deliberate failure point; run with `--inspect` to step through.
- `tsconfig.sourcemaps.json` — minimal tsconfig with sourceMap+inlineSources for build-time emission.

To use: copy `launch.json` to `.vscode/launch.json` in your project root.
