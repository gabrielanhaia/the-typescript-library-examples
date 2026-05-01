// Book reference: Chapter 12, "The shape" + "The exhaustive check".

function unreachable(value: never): never {
  throw new Error(`Unhandled: ${JSON.stringify(value)}`);
}

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

export function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default:
      return unreachable(shape);
  }
}

const shapes: Shape[] = [
  { kind: "circle", radius: 5 },
  { kind: "rectangle", width: 4, height: 6 },
  { kind: "triangle", base: 3, height: 4 },
];

for (const s of shapes) {
  console.log(`${s.kind}: ${area(s).toFixed(2)}`);
}
