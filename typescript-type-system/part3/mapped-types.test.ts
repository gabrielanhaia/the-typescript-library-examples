import { expectTypeOf } from "expect-type";
import { describe, expect, it } from "vitest";
import type {
  Equal,
  IsNever,
  MyPartial,
  MyPick,
  MyReadonly,
  MyRequired,
  Mutable,
  ParametersOf,
  ReturnTypeOf,
  StringKeys,
  Unwrap,
} from "./mapped-types.ts";
import { makePartial, pickKeys } from "./mapped-types.ts";

describe("Part III — mapped & conditional types", () => {
  it("pickKeys returns only the requested keys", () => {
    const user = { id: "u-1", name: "Ada", age: 36 };
    expect(pickKeys(user, ["name", "age"])).toEqual({ name: "Ada", age: 36 });
  });

  it("makePartial allows missing keys at runtime", () => {
    const partial = makePartial({ id: "u-1", name: "Ada" });
    expect(partial.id).toBe("u-1");
  });

  it("MyPick types match expected shape", () => {
    type User = { id: string; name: string; age: number };
    expectTypeOf<MyPick<User, "name" | "age">>().toEqualTypeOf<{
      name: string;
      age: number;
    }>();
  });

  it("MyPartial makes all fields optional", () => {
    type User = { id: string; name: string };
    expectTypeOf<MyPartial<User>>().toEqualTypeOf<{ id?: string; name?: string }>();
  });

  it("MyRequired strips optionality", () => {
    type Patch = { id?: string; name?: string };
    expectTypeOf<MyRequired<Patch>>().toEqualTypeOf<{ id: string; name: string }>();
  });

  it("MyReadonly adds readonly", () => {
    type User = { id: string };
    expectTypeOf<MyReadonly<User>>().toEqualTypeOf<{ readonly id: string }>();
  });

  it("Mutable strips readonly", () => {
    type Frozen = { readonly id: string };
    expectTypeOf<Mutable<Frozen>>().toEqualTypeOf<{ id: string }>();
  });

  it("StringKeys filters to string-valued fields", () => {
    type User = { id: string; name: string; age: number };
    expectTypeOf<StringKeys<User>>().toEqualTypeOf<{ id: string; name: string }>();
  });

  it("Unwrap extracts Promise contents", () => {
    expectTypeOf<Unwrap<Promise<string>>>().toEqualTypeOf<string>();
    expectTypeOf<Unwrap<number>>().toEqualTypeOf<number>();
  });

  it("ReturnTypeOf and ParametersOf reflect functions", () => {
    type F = (a: number, b: string) => boolean;
    expectTypeOf<ReturnTypeOf<F>>().toEqualTypeOf<boolean>();
    expectTypeOf<ParametersOf<F>>().toEqualTypeOf<[a: number, b: string]>();
  });

  it("IsNever detects never with the [T] wrapper", () => {
    expectTypeOf<IsNever<never>>().toEqualTypeOf<true>();
    expectTypeOf<IsNever<string>>().toEqualTypeOf<false>();
  });

  it("Equal compares types structurally", () => {
    expectTypeOf<Equal<{ a: 1 }, { a: 1 }>>().toEqualTypeOf<true>();
    expectTypeOf<Equal<{ a: 1 }, { a: 2 }>>().toEqualTypeOf<false>();
  });
});
