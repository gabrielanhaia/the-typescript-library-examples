// Book reference: Chapter 18 — TS `private` vs JS-native `#field`.

// TS private — compile-time only. Runtime can still reach the field.
class WithTsPrivate {
  private value = 42;

  describe(): string {
    return `internal value: ${this.value}`;
  }
}

const ts = new WithTsPrivate();
console.log(ts.describe());

// At runtime, the field is reachable through the cast:
const peek = (ts as unknown as { value: number }).value;
console.log("ts-private peek →", peek);

// JS-native #field — runtime-private, genuinely hidden.
class WithJsPrivate {
  #value = 42;

  describe(): string {
    return `internal value: ${this.#value}`;
  }
}

const js = new WithJsPrivate();
console.log(js.describe());

// At runtime, the cast cannot reach #value.
const cant = (js as unknown as { value?: number }).value;
console.log("js-private peek →", cant); // undefined
