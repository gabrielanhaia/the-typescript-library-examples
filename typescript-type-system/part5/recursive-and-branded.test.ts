import { expectTypeOf } from "expect-type";
import { describe, expect, it } from "vitest";
import type {
  DeepPartial,
  DeepReadonly,
  Email,
  JsonValue,
  Reverse,
  UserId,
} from "./recursive-and-branded.ts";
import { cents, email, orderId, transferCents, userId } from "./recursive-and-branded.ts";

describe("Part V — recursive & branded types", () => {
  it("JsonValue accepts nested JSON", () => {
    const v: JsonValue = { a: 1, b: ["x", { c: true }] };
    expect(v).toBeDefined();
  });

  it("DeepReadonly type is recursively readonly", () => {
    type Config = { server: { port: number; host: string } };
    expectTypeOf<DeepReadonly<Config>>().toEqualTypeOf<{
      readonly server: { readonly port: number; readonly host: string };
    }>();
  });

  it("DeepPartial type is recursively optional", () => {
    type Config = { server: { port: number } };
    expectTypeOf<DeepPartial<Config>>().toEqualTypeOf<{
      server?: { port?: number };
    }>();
  });

  it("Reverse reverses a tuple", () => {
    expectTypeOf<Reverse<[1, 2, 3]>>().toEqualTypeOf<[3, 2, 1]>();
  });

  it("userId validates and brands", () => {
    const id = userId("u-123");
    expect(id).toBe("u-123");
    expect(() => userId("invalid")).toThrow();
  });

  it("orderId validates and brands", () => {
    expect(orderId("o-1")).toBe("o-1");
    expect(() => orderId("u-1")).toThrow();
  });

  it("transferCents accepts only branded Cents", () => {
    const amount = cents(1000);
    expect(transferCents(amount)).toBe("transferring 1000 cents");
  });

  it("UserId and Email are distinguishable types", () => {
    expectTypeOf<UserId>().not.toEqualTypeOf<Email>();
  });

  it("email validates format", () => {
    expect(email("a@b.com")).toBe("a@b.com");
    expect(() => email("invalid")).toThrow();
  });
});
