// Book reference: Chapter 7 "A worked example: a result type".

type Result<T, E = Error> = readonly [T, null] | readonly [null, E];

class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

async function fetchUser(id: string): Promise<Result<{ id: string; name: string }, HttpError>> {
  if (id === "") {
    return [null, new HttpError(400, "id required")] as const;
  }
  await new Promise((r) => setTimeout(r, 5));
  return [{ id, name: "Ada" }, null] as const;
}

const [user, err] = await fetchUser("u-123");
if (err) {
  console.error("failed:", err.status, err.message);
} else {
  console.log("got:", user.name);
}

const [_, err2] = await fetchUser("");
if (err2) {
  console.error("failed:", err2.status, err2.message);
}
