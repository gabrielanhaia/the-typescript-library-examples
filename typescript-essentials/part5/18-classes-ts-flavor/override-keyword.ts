// Book reference: Chapter 18 — `override` keyword.

class Animal {
  speak(): string {
    return "...";
  }
}

class Dog extends Animal {
  override speak(): string {
    return "Woof";
  }
}

class Cat extends Animal {
  override speak(): string {
    return "Meow";
  }
}

for (const a of [new Animal(), new Dog(), new Cat()]) {
  console.log(a.speak());
}

// If `Animal.speak` is renamed to `vocalize`, the override keyword in
// Dog and Cat causes a compile error pointing right at the subclass.
