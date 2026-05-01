# Chapter 15 — Module Resolution

The resolution decisions live in `tsconfig.json`. Three reference configs:

## Files

- `tsconfig.node-service.json` — Node target, NodeNext resolution.
- `tsconfig.vite-app.json` — browser target via Vite, bundler resolution.
- `tsconfig.library.json` — npm-published library, NodeNext + declarations.

For path aliases without a build step, `package.json#imports` (Chapter 17) is the modern Node-native answer.
