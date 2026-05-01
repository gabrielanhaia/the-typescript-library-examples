// Book reference: Chapter 5 "A worked example" — HTTP response modeling.

type User = { id: string; name: string };

type ApiResponse =
  | { status: 200 | 201; body: { data: User } }
  | { status: 204; body: null }
  | { status: 400 | 401 | 403 | 404; body: { message: string } }
  | { status: 500 | 503; body: null };

export function handle(r: ApiResponse): string {
  switch (r.status) {
    case 200:
    case 201:
      return JSON.stringify(r.body.data);
    case 204:
      return "(no content)";
    case 400:
    case 401:
    case 403:
    case 404:
      return `Error: ${r.body.message}`;
    case 500:
    case 503:
      return "Server error";
  }
}

console.log(handle({ status: 200, body: { data: { id: "u-1", name: "Ada" } } }));
console.log(handle({ status: 204, body: null }));
console.log(handle({ status: 404, body: { message: "user not found" } }));
console.log(handle({ status: 500, body: null }));
