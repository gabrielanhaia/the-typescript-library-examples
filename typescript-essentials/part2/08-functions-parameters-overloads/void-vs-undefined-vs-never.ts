// Book reference: Chapter 8 — void vs undefined vs never as return types.

function logError(err: Error): void {
  console.error(err.message);
}

function returnNothing(): undefined {
  return undefined;
}

function panic(message: string): never {
  throw new Error(message);
}

logError(new Error("boom"));
returnNothing();
console.log("returnNothing → undefined");

try {
  panic("the world is on fire");
} catch (e) {
  console.log("caught panic:", e instanceof Error ? e.message : e);
}

// `void` callbacks discard return values silently — this is what makes
// `array.forEach(fn)` work whether `fn` returns something or not.
type Cb = () => void;
const cb: Cb = () => 42;
cb();
console.log("void callback returning a value: discarded");
