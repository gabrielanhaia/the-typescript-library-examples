// Book reference: Chapter 6 — interface declaration merging.

interface User {
  name: string;
}

interface User {
  email: string;
}

// User is now { name: string; email: string }
const u: User = { name: "Ada", email: "ada@example.com" };
console.log(u);

// The classic library-extension pattern: augment the global Window type.
declare global {
  interface Window {
    myAnalytics: { track(event: string): void };
  }
}

// Now in browser code, `window.myAnalytics` is typed across the codebase.
// (Don't run this file in Node; the declare-global is documentation here.)
