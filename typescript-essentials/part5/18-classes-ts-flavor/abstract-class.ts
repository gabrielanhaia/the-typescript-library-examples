// Book reference: Chapter 18 — abstract classes vs discriminated unions.

abstract class Shape {
  abstract area(): number;

  describe(): string {
    return `A shape with area ${this.area().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(
    public width: number,
    public height: number,
  ) {
    super();
  }
  area(): number {
    return this.width * this.height;
  }
}

const shapes: Shape[] = [new Circle(5), new Rectangle(3, 4)];
for (const s of shapes) console.log(s.describe());

// new Shape();  // ← compile error: Cannot create an instance of an abstract class.
