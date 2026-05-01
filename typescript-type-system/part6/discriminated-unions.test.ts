import { describe, expect, it } from "vitest";
import {
  area,
  err,
  flatMap,
  makeDraft,
  map,
  ok,
  parsePositiveInt,
  pay,
  ship,
} from "./discriminated-unions.ts";

describe("Part VI — practical type design", () => {
  it("area handles all shape variants", () => {
    expect(area({ kind: "square", size: 4 })).toBe(16);
    expect(area({ kind: "rectangle", width: 3, height: 5 })).toBe(15);
    const circle = area({ kind: "circle", radius: 1 });
    expect(circle).toBeCloseTo(Math.PI);
  });

  it("ok/err produce Result variants", () => {
    expect(ok(42)).toEqual({ ok: true, value: 42 });
    expect(err("oops")).toEqual({ ok: false, error: "oops" });
  });

  it("map transforms success values only", () => {
    expect(map(ok(2), (n) => n * 3)).toEqual({ ok: true, value: 6 });
    expect(map(err("fail" as const), (n: number) => n * 3)).toEqual({
      ok: false,
      error: "fail",
    });
  });

  it("flatMap chains Result-returning functions", () => {
    const r = flatMap(ok(2), (n) => ok(n + 1));
    expect(r).toEqual({ ok: true, value: 3 });
  });

  it("parsePositiveInt produces typed error variants", () => {
    const r = parsePositiveInt("abc", 100);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error.kind).toBe("not_a_number");

    const r2 = parsePositiveInt("0", 100);
    if (!r2.ok) expect(r2.error.kind).toBe("not_positive");

    const r3 = parsePositiveInt("200", 100);
    if (!r3.ok) expect(r3.error.kind).toBe("out_of_range");

    const r4 = parsePositiveInt("42", 100);
    expect(r4.ok).toBe(true);
    if (r4.ok) expect(r4.value).toBe(42);
  });

  it("state machine progresses Draft -> Paid -> Shipped", () => {
    const draft = makeDraft("o-1", ["item-1"]);
    const paid = pay(draft);
    const shipped = ship(paid, "TRK-123");
    expect(shipped.trackingNumber).toBe("TRK-123");
    expect(shipped.paidAt).toBeInstanceOf(Date);
  });
});
