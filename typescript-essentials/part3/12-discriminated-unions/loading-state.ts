// Book reference: Chapter 12, "State machines".

type User = { id: string; name: string };

export type LoadingState =
  | { status: "idle" }
  | { status: "loading"; startedAt: Date }
  | { status: "loaded"; data: User; loadedAt: Date }
  | { status: "error"; error: Error; failedAt: Date };

export function describe(state: LoadingState): string {
  switch (state.status) {
    case "idle":
      return "Not started";
    case "loading":
      return `Loading since ${state.startedAt.toISOString()}`;
    case "loaded":
      return `Loaded ${state.data.name} at ${state.loadedAt.toISOString()}`;
    case "error":
      return `Failed: ${state.error.message}`;
  }
}

console.log(describe({ status: "idle" }));
console.log(describe({ status: "loading", startedAt: new Date() }));
console.log(
  describe({
    status: "loaded",
    data: { id: "u-1", name: "Ada" },
    loadedAt: new Date(),
  }),
);
