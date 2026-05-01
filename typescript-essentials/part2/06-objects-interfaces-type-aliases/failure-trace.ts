// Book reference: Chapter 6 "A failure trace" — SearchRequest with optional
// fields that should have been a discriminated union.

// Broken: both fields optional, callers can pass both at once.
interface SearchRequestBroken {
  query: string;
  limit?: number;
  cursor?: string;
}

const broken: SearchRequestBroken = {
  query: "foo",
  limit: 20,
  cursor: "next-page-token", // server ignores limit; subtle bug
};
void broken;

// Fixed: discriminated union prevents the invalid combination at compile time.
type SearchRequest =
  | { query: string; mode: "page"; limit?: number }
  | { query: string; mode: "cursor"; cursor: string };

const pageReq: SearchRequest = { query: "foo", mode: "page", limit: 20 };
const cursorReq: SearchRequest = { query: "foo", mode: "cursor", cursor: "tok" };

console.log(pageReq);
console.log(cursorReq);

// @ts-expect-error - the broken combo is rejected by the compiler.
const invalid: SearchRequest = { query: "foo", mode: "page", limit: 20, cursor: "tok" };
void invalid;
