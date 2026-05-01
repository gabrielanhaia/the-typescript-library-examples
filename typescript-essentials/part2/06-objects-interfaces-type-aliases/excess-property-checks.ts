// Book reference: Chapter 6 — excess property checks on object literals.

function send(opts: { url: string }): void {
  console.log("send to", opts.url);
}

// Direct literal — excess property is rejected.
// @ts-expect-error - 'method' does not exist in type '{ url: string }'.
send({ url: "/foo", method: "GET" });

// Same content via a variable — excess property silently allowed.
const opts = { url: "/foo", method: "GET" };
send(opts);
