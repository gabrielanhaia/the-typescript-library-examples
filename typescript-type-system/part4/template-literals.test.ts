import { expectTypeOf } from "expect-type";
import { describe, expect, it } from "vitest";
import type {
  ApiCall,
  CamelCase,
  CssLength,
  Endpoint,
  Greeting,
  Join,
  ParseParams,
  Split,
} from "./template-literals.ts";
import { makeEndpoint, splitString } from "./template-literals.ts";

describe("Part IV — template literal types", () => {
  it("Greeting builds a typed string", () => {
    expectTypeOf<Greeting<"world">>().toEqualTypeOf<"Hello, world">();
  });

  it("CssLength constrains to numeric+unit pattern", () => {
    const margin: CssLength = "16px";
    const padding: CssLength = "1.5rem";
    expect(margin).toBe("16px");
    expect(padding).toBe("1.5rem");
  });

  it("Endpoint requires /api/ prefix", () => {
    const e: Endpoint = "/api/users";
    expect(e).toBe("/api/users");
  });

  it("ApiCall produces method+endpoint cross product", () => {
    const call: ApiCall = "GET /api/users";
    expect(call).toBe("GET /api/users");
  });

  it("Split splits a string at the type level", () => {
    expectTypeOf<Split<"a,b,c", ",">>().toEqualTypeOf<["a", "b", "c"]>();
  });

  it("Join concatenates a tuple of strings", () => {
    expectTypeOf<Join<["a", "b", "c"], "-">>().toEqualTypeOf<"a-b-c">();
  });

  it("CamelCase converts kebab-case", () => {
    expectTypeOf<CamelCase<"hello-world">>().toEqualTypeOf<"helloWorld">();
  });

  it("ParseParams extracts route parameters", () => {
    expectTypeOf<ParseParams<"/users/:id">>().toEqualTypeOf<{ id: string }>();
  });

  it("makeEndpoint prefixes /api/", () => {
    const e = makeEndpoint("orders");
    expect(e).toBe("/api/orders");
  });

  it("splitString splits at runtime", () => {
    expect(splitString("a,b,c", ",")).toEqual(["a", "b", "c"]);
  });
});
