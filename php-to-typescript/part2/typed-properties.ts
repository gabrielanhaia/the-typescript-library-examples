// Part II — Types and syntax bridges
// Constructor parameter properties (the TS analogue of PHP 8 promotion).

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
  ) {}
}

// Literal union as TS-native enum replacement (vs PHP 8 enum class).
export type Status = "active" | "inactive" | "deleted";

// `as const` array for runtime + type single-source.
export const STATUSES = ["active", "inactive", "deleted"] as const;
export type StatusFromArray = (typeof STATUSES)[number];

// `as const` object for "enum with values" pattern.
export const ROLES = {
  Admin: "admin",
  Editor: "editor",
  Viewer: "viewer",
} as const;
export type Role = (typeof ROLES)[keyof typeof ROLES];

export function describeRole(role: Role): string {
  switch (role) {
    case "admin":
      return "Full access";
    case "editor":
      return "Can edit content";
    case "viewer":
      return "Read-only";
  }
}
