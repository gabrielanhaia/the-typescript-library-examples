// Book reference: Chapter 10 — typeof, instanceof, in, equality narrowing.

// typeof
function format1(x: string | number | boolean): string {
  if (typeof x === "string") return x.toUpperCase();
  if (typeof x === "number") return x.toFixed(2);
  return x ? "yes" : "no";
}

// instanceof
class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

function format2(e: Error | HttpError | string): string {
  if (e instanceof HttpError) return `[${e.status}] ${e.message}`;
  if (e instanceof Error) return `Error: ${e.message}`;
  return `Plain: ${e}`;
}

// in
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function speak(animal: Cat | Dog): string {
  return "bark" in animal ? "woof" : "meow";
}

// equality narrowing
function describe(s: "open" | "closed" | "archived"): string {
  if (s === "open") return "open";
  if (s !== "archived") return "closed";
  return "archived";
}

console.log(format1("hello"), format1(42), format1(true));
console.log(format2(new HttpError(404, "not found")));
console.log(format2(new Error("boom")));
console.log(format2("plain string"));
console.log(speak({ bark: () => undefined }));
console.log(speak({ meow: () => undefined }));
console.log(describe("open"), describe("closed"), describe("archived"));
