// Book reference: Chapter 20 — Result type for typed errors in async code.

type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

class NotFoundError extends Error {
  constructor(public id: string) {
    super(`not found: ${id}`);
    this.name = "NotFoundError";
  }
}

class ValidationError extends Error {
  constructor(public field: string) {
    super(`invalid: ${field}`);
    this.name = "ValidationError";
  }
}

async function fetchUserResult(
  id: string,
): Promise<Result<{ id: string; name: string }, NotFoundError | ValidationError>> {
  if (id === "") return { ok: false, error: new ValidationError("id") };
  if (id === "missing") return { ok: false, error: new NotFoundError(id) };
  await new Promise((r) => setTimeout(r, 5));
  return { ok: true, value: { id, name: "Ada" } };
}

for (const id of ["u-1", "", "missing"]) {
  const r = await fetchUserResult(id);
  if (r.ok) {
    console.log(`ok: ${r.value.name}`);
  } else if (r.error instanceof ValidationError) {
    console.log(`validation: ${r.error.field}`);
  } else {
    console.log(`not found: ${r.error.id}`);
  }
}
