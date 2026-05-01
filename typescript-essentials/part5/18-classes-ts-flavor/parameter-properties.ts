// Book reference: Chapter 18 — parameter properties.
// NOTE: erasableSyntaxOnly rejects this; the example exists for the chapter.
// In strip-mode-only projects, expand to explicit assignments.

class User {
  constructor(
    public name: string,
    public email: string,
    private id: string,
    public readonly createdAt: Date = new Date(),
  ) {}

  describe(): string {
    return `${this.name} <${this.email}> [${this.id}] @${this.createdAt.toISOString()}`;
  }
}

const u = new User("Ada", "ada@example.com", "u-1");
console.log(u.describe());
