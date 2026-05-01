import { describe as describeSuite, expect, it } from "vitest";
import { COLORS, describe, pick, type HttpResponse } from "./discriminated-unions.ts";

describeSuite("Part III — discriminated unions and literal types", () => {
  it("describes each HttpResponse variant", () => {
    const ok: HttpResponse = { kind: "ok", status: 200, body: "hello" };
    const redirect: HttpResponse = { kind: "redirect", status: 301, location: "/new" };
    const err: HttpResponse = { kind: "error", status: 500, message: "boom" };

    expect(describe(ok)).toBe("OK: hello");
    expect(describe(redirect)).toBe("Redirect 301 to /new");
    expect(describe(err)).toBe("Error 500: boom");
  });

  it("COLORS is a frozen tuple of literal strings", () => {
    expect(COLORS).toEqual(["red", "green", "blue"]);
  });

  it("pick preserves the literal type via const T", () => {
    const v = pick("red");
    expect(v).toBe("red");
  });
});
