// Book reference: Chapter 12, "Result and Either patterns".

export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

type User = { id: string; name: string };

async function fetchUser(id: string): Promise<Result<User>> {
  if (id === "") {
    return { ok: false, error: new Error("id required") };
  }
  // simulate a network call
  await new Promise((resolve) => setTimeout(resolve, 10));
  return { ok: true, value: { id, name: "Ada" } };
}

const result = await fetchUser("u-1");
if (result.ok) {
  console.log(`got: ${result.value.name}`);
} else {
  console.error(`failed: ${result.error.message}`);
}

const failure = await fetchUser("");
if (!failure.ok) {
  console.error(`failed: ${failure.error.message}`);
}
