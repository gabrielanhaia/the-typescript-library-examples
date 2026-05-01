# TypeScript Essentials — Code Examples

Runnable code examples that accompany **Book 1** of _The TypeScript Library_ — _TypeScript Essentials: From Working Developer to Confident TS, Across Node, Bun, Deno, and the Browser_ by Gabriel Anhaia.

This folder is one of four in the [the-typescript-library-examples](https://github.com/gabrielanhaia/the-typescript-library-examples) repository. The top-level [README](../README.md) explains the collection; this README is specific to Book 1.

## Versions pinned

All examples are written against:

| Tool              | Version                                                 |
| ----------------- | ------------------------------------------------------- |
| TypeScript        | **6.0.x** (Mar 2026)                                    |
| Node.js           | **24 LTS** (current LTS) — also tested on 22 LTS and 25 |
| Bun               | **1.3.x**                                               |
| Deno              | **2.7.x**                                               |
| Vite              | **8.x**                                                 |
| Vitest            | **4.x**                                                 |
| Biome             | **2.2.x**                                               |
| ESLint            | **10.x**                                                |
| typescript-eslint | **8.x**                                                 |

Versions in the example `package.json` reflect these. When a new major lands, this file is the source of truth for what to bump.

## Layout

```
.
├── package.json                  # baseline workspace dependencies
├── tsconfig.json                 # the recommended strict tsconfig from Chapter 3
├── eslint.config.js              # the recommended type-aware lint config from Chapter 22
├── biome.json                    # alternative single-tool setup (Chapters 22-23)
├── .gitignore
├── part1/                        # From JS to TS
│   ├── 01-why-typescript-exists/
│   ├── 02-setting-up-across-runtimes/
│   ├── 03-minimal-viable-tsconfig/
│   └── 04-editor-and-dx/
├── part2/                        # Type Basics
├── part3/                        # Narrowing & Control Flow
├── part4/                        # Modules, Packages, Project Structure
├── part5/                        # Working with the Language
├── part6/                        # Daily-Driver Tooling
└── part7/                        # Closing the Gap
```

Every chapter directory has its own `README.md` that names which book section each file belongs to and how to run it.

## Running an example

The default toolchain is Node 24 + tsx. From the repo root:

```bash
npm install
npx tsx part1/01-why-typescript-exists/format-receipt-typed.ts
```

For Bun:

```bash
bun part1/01-why-typescript-exists/format-receipt-typed.ts
```

For Deno (note: examples that use Node-specific imports won't run under Deno without the npm: specifier):

```bash
deno run part1/01-why-typescript-exists/format-receipt-typed.ts
```

Per-chapter notes call out where a runtime is required versus where the example is portable.

## Type-checking the entire repo

```bash
npm run typecheck
```

This runs `tsc --noEmit` against every chapter. The repo is configured to type-check cleanly on every commit.

## Linting

```bash
npm run lint           # ESLint + typescript-eslint
npm run format         # Prettier (or `npm run check` for Biome)
```

## Testing

A small set of examples have accompanying Vitest tests. Run them with:

```bash
npm test
```

## Status

This is the initial scaffold. Chapters are filled in progressively — see each part's README for what is complete versus pending.

| Part                                          | Chapters with examples         |
| --------------------------------------------- | ------------------------------ |
| Part 1 — From JS to TS                        | 2/4 (1, 2 done; 3, 4 stub)     |
| Part 2 — Type Basics                          | 1/5 (9 done; 5–8 stub)         |
| Part 3 — Narrowing & Control Flow             | 1/4 (12 done; 10, 11, 13 stub) |
| Part 4 — Modules, Packages, Project Structure | 0/4 (all stub)                 |
| Part 5 — Working with the Language            | 0/4 (all stub)                 |
| Part 6 — Daily-Driver Tooling                 | 0/4 (all stub)                 |
| Part 7 — Closing the Gap                      | 1/3 (28 partial; 26, 27 stub)  |

Stubbed chapters have a `README.md` placeholder that names the chapter intent — every directory exists and is ready to fill.

## Conventions

- Every example file starts with a comment block linking back to the book chapter and section.
- Files prefixed `broken-` show the bug class the chapter discusses; they are deliberately broken (and excluded from the type-check via `// @ts-expect-error` or a separate config).
- Files prefixed `fixed-` show the chapter's recommended fix.
- Files in `runnable/` subdirectories produce visible output and are safe to run; everything else is purely for type-checking.

## Public migration writeups referenced in the book

The book (Chapters 1, 26, and the _Acknowledgments_ / _References_ pages) cites several public engineering-blog writeups of large JS-to-TS migrations. Current URLs at the time of writing — verified to resolve, kept in sync with the book's `references.md` appendix:

| Team      | Reference                                                                                                                                                                                                                                                              |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Airbnb    | Brie Bunge, _"Adopting TypeScript at Scale"_ — TSConf 2019 (talk recording on YouTube; later expanded as Airbnb's engineering-blog series at `medium.com/airbnb-engineering`). The accompanying open-source `ts-migrate` codemod is at `github.com/airbnb/ts-migrate`. |
| Slack     | _"TypeScript at Slack"_ and _"Adopting TypeScript at Slack"_ — Slack engineering blog, multi-post series 2017–2021 (`slack.engineering`).                                                                                                                              |
| Lyft      | _"How we use TypeScript at Lyft"_ — Lyft engineering blog, `eng.lyft.com`, 2020.                                                                                                                                                                                       |
| Stripe    | _"Bringing TypeScript to the Stripe Dashboard"_ — Stripe engineering blog (`stripe.com/blog/engineering`), 2020.                                                                                                                                                       |
| Bloomberg | _"How Bloomberg moved its codebase to TypeScript"_ — Bloomberg Tech blog (`techatbloomberg.com`); also presented at TSConf and JSConf US.                                                                                                                              |
| Asana     | _"Why we use TypeScript at Asana"_ — Asana engineering blog (`blog.asana.com/category/eng/`).                                                                                                                                                                          |

If any link rots, file an issue against this repo and the _Errata_ page in the book will be updated to reflect the move.

## License

Code examples are released under the MIT license. Book text itself is © Gabriel Anhaia and not part of this repository.
