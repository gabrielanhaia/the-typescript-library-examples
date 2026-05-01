import { describe, expect, it } from "vitest";
import { describeRole, ROLES, STATUSES, User } from "./typed-properties.ts";

describe("Part II — typed properties and enum-like patterns", () => {
  it("User constructor properties are accessible", () => {
    const u = new User("u-1", "Ada", "ada@example.com");
    expect(u.id).toBe("u-1");
    expect(u.name).toBe("Ada");
    expect(u.email).toBe("ada@example.com");
  });

  it("STATUSES is a frozen tuple of literals", () => {
    expect(STATUSES).toEqual(["active", "inactive", "deleted"]);
  });

  it("ROLES exposes literal values", () => {
    expect(ROLES.Admin).toBe("admin");
  });

  it("describeRole exhausts all variants", () => {
    expect(describeRole("admin")).toBe("Full access");
    expect(describeRole("editor")).toBe("Can edit content");
    expect(describeRole("viewer")).toBe("Read-only");
  });
});
