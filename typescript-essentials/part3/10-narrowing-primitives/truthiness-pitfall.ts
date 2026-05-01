// Book reference: Chapter 10 — truthiness narrowing footgun.

function display(name: string | undefined): string {
  if (name) {
    return name;
  }
  // Bug: explicitly empty string `""` falls into here.
  return "default";
}

console.log("with name :", display("Ada"));
console.log("undefined :", display(undefined));
console.log("empty str :", display("")); // returns "default" — possibly wrong

// The defensive form: check for undefined explicitly.
function displayFixed(name: string | undefined): string {
  if (name !== undefined) {
    return name; // includes "" deliberately
  }
  return "default";
}

console.log("fixed empty:", displayFixed(""));
