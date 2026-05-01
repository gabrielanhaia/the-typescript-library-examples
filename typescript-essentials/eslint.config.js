// ESLint flat config — see Chapter 22 of the book.
// Uses typescript-eslint 8.x with project-service mode for fast type-aware linting.

import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/_book/**",
      "**/dist/**",
      "**/node_modules/**",
      "**/*.js", // .js files are deliberate (broken-*.js demos) and not type-checked
      "eslint.config.js",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // The book deliberately prefers `type` over `interface` for most cases
      // (Chapter 6). Disable the rule that forces interface.
      "@typescript-eslint/consistent-type-definitions": "off",

      // The book uses redundant annotations pedagogically (Chapter 5: `const x: string = "..."`).
      "@typescript-eslint/no-inferrable-types": "off",

      // The book uses `${number}` and `${string}` template interpolations
      // throughout. The strict version of this rule is too aggressive.
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true, allowBoolean: true },
      ],
    },
  },
  {
    // Files that intentionally demonstrate bad patterns the book teaches against.
    // These need `any`, unsafe access, missing awaits, etc., to make the point.
    files: [
      "**/broken-*.ts",
      "**/broken-*.js",
      "**/_broken/**/*.ts",
      "**/the-triangle.ts",
      "**/any-creep.ts",
      "**/pattern-*.ts",
      "**/unknown-with-narrowing.ts",
      "**/bit-flags-enum.ts",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/prefer-literal-enum-member": "off",
      "no-empty-pattern": "off",
    },
  },
);
