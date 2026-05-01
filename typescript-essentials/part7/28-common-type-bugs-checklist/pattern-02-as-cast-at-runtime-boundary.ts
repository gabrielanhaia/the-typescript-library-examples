// Book reference: Chapter 28, pattern 2 — `as` cast at a runtime boundary.

import { z } from "zod";

interface AppConfig {
  port: number;
  host: string;
}

const text = '{"port":8080,"host":"localhost"}';

// ── Broken ─────────────────────────────────────────────────────────────────
// The cast asserts a shape the runtime hasn't validated.
const broken = JSON.parse(text) as AppConfig;
console.log("broken:", broken);

// ── Fixed ──────────────────────────────────────────────────────────────────
// Runtime validation. If the JSON shape is wrong, this throws *before* downstream code runs.
const ConfigSchema = z.object({
  port: z.number(),
  host: z.string(),
});
const config = ConfigSchema.parse(JSON.parse(text));
console.log("validated:", config);
