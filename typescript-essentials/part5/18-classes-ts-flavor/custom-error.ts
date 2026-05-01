// Book reference: Chapter 18 — custom error classes for typed catch.

class ValidationError extends Error {
  constructor(
    public field: string,
    message: string,
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

class NotFoundError extends Error {
  constructor(
    public resource: string,
    public id: string,
  ) {
    super(`${resource} not found: ${id}`);
    this.name = "NotFoundError";
  }
}

function process(): void {
  // pretend a real operation
  throw new ValidationError("email", "invalid format");
}

try {
  process();
} catch (e) {
  if (e instanceof ValidationError) {
    console.log(`Field error on ${e.field}: ${e.message}`);
  } else if (e instanceof NotFoundError) {
    console.log(`${e.resource} ${e.id} not found`);
  } else if (e instanceof Error) {
    console.error(e.message);
  } else {
    console.error("non-Error thrown:", e);
  }
}
