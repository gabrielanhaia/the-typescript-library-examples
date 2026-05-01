// Book reference: Chapter 10 "A worked example" — typed events.

type ClickEvent = { kind: "click"; x: number; y: number };
type KeyEvent = { kind: "key"; code: string; shift: boolean };
type ScrollEvent = { kind: "scroll"; deltaY: number };
type AppEvent = ClickEvent | KeyEvent | ScrollEvent;

export function describe(e: AppEvent): string {
  if (e.kind === "click") {
    return `Click at (${e.x}, ${e.y})`;
  }
  if (e.kind === "key") {
    return `Key ${e.code}${e.shift ? " (shift)" : ""}`;
  }
  return `Scrolled ${e.deltaY}px`;
}

const events: AppEvent[] = [
  { kind: "click", x: 100, y: 200 },
  { kind: "key", code: "Enter", shift: false },
  { kind: "scroll", deltaY: -120 },
];

for (const e of events) console.log(describe(e));
