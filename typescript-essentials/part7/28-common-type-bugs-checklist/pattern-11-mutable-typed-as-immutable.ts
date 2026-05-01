// Book reference: Chapter 28, pattern 11 — mutable shared state typed as immutable.

interface AppConfig {
  port: number;
  debug: boolean;
}

function loadConfig(): AppConfig {
  return { port: 8080, debug: false };
}

// ── Broken ─────────────────────────────────────────────────────────────────
// Type promised Readonly; cast bypasses it; other readers now have a bug.
{
  const config: Readonly<AppConfig> = loadConfig();
  (config as AppConfig).debug = true;
  console.log("broken config:", config);
}

// ── Fixed ──────────────────────────────────────────────────────────────────
// Actually freeze, or compute a new config.
{
  const config: Readonly<AppConfig> = Object.freeze(loadConfig());
  try {
    (config as AppConfig).debug = true; // throws in strict mode
  } catch (e) {
    console.error("rejected mutation:", e instanceof Error ? e.message : e);
  }
  console.log("fixed config (unchanged):", config);
}
