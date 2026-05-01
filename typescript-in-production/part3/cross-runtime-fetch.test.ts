import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { fetchJson } from "./cross-runtime-fetch.ts";

const userSchema = z.object({
  id: z.uuid(),
  email: z.email(),
});

describe("Part III — cross-runtime fetch", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("returns a typed value on the happy path", async () => {
    const payload = {
      id: "00000000-0000-4000-8000-000000000001",
      email: "ada@example.com",
    };
    globalThis.fetch = vi.fn(async () =>
      Promise.resolve(new Response(JSON.stringify(payload), { status: 200 })),
    );

    const result = await fetchJson("https://example.test/user", userSchema);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.email).toBe("ada@example.com");
  });

  it("returns an http error variant on non-2xx", async () => {
    globalThis.fetch = vi.fn(async () => Promise.resolve(new Response("nope", { status: 503 })));
    const result = await fetchJson("https://example.test/user", userSchema);
    if (!result.ok) {
      expect(result.error.kind).toBe("http");
      if (result.error.kind === "http") expect(result.error.status).toBe(503);
    }
  });

  it("returns an invalid-response variant when the schema rejects the body", async () => {
    globalThis.fetch = vi.fn(async () =>
      Promise.resolve(
        new Response(JSON.stringify({ id: "not-a-uuid", email: "x" }), { status: 200 }),
      ),
    );
    const result = await fetchJson("https://example.test/user", userSchema);
    if (!result.ok) expect(result.error.kind).toBe("invalid-response");
  });

  it("returns a network error variant when fetch throws", async () => {
    globalThis.fetch = vi.fn(async () => Promise.reject(new TypeError("boom")));
    const result = await fetchJson("https://example.test/user", userSchema);
    if (!result.ok) expect(result.error.kind).toBe("network");
  });
});
