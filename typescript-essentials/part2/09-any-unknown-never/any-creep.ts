// Book reference: Chapter 9, "any-creep".
// Demonstrates how a single `any` value contaminates downstream typing.

function fetchSomething(): any {
  return { data: { user: { name: "Ada" } } };
}

const root = fetchSomething(); // root: any
const data = root.data; // data: any (contagion)
const user = data.user; // user: any
const name = user.name; // name: any
const upper = name.toUpperCase(); // upper: any — the entire chain is unchecked

console.log(upper);

// The fix: type the boundary, validate, narrow.
//
//   function fetchSomething(): unknown { ... }
//
// Then the call site is forced to validate before reading.
