// Book reference: Chapter 28, pattern 12 — discriminator typed as `string`.

// ── Broken ─────────────────────────────────────────────────────────────────
// `kind: string` is not narrowable. Every per-shape field is optional and the
// modeling reads as "one big object with everything optional" — wrong.
type ShapeBroken = {
  kind: string;
  radius?: number;
  width?: number;
  height?: number;
};

// ── Fixed ──────────────────────────────────────────────────────────────────
// `kind` as a literal-typed union lets the compiler narrow per case.
type ShapeFixed =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: ShapeFixed): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

const c: ShapeFixed = { kind: "circle", radius: 5 };
console.log(area(c));

// Document that the broken type has no constructive use:
const _shouldNotExist: ShapeBroken = { kind: "anything", radius: 1 };
void _shouldNotExist;
