// Book reference: Chapter 8 — `this` parameter for callback safety.

class Component {
  name = "Button";

  // The fake `this` parameter tells the compiler that callers must invoke
  // this method with `this` bound to a Component.
  handleClick(this: Component): void {
    console.log(`Clicked: ${this.name}`);
  }

  // The arrow-field alternative — captures `this` at field initialization.
  handleClickArrow = (): void => {
    console.log(`Clicked (arrow): ${this.name}`);
  };
}

const c = new Component();
c.handleClick(); // ok
c.handleClickArrow(); // ok

// Detaching the method:
const detached = c.handleClickArrow;
detached(); // arrow form is fine — `this` was captured

// const wrong = c.handleClick;
// wrong(); // ← would be a compile error: "this" of type "void" not assignable.
