// Book reference: Chapter 9, "The `assertNever` exhaustive check".
//
// Run:    npx tsx part2/09-any-unknown-never/never-exhaustive.ts
// Type-check: npx tsc --noEmit part2/09-any-unknown-never/never-exhaustive.ts

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}

type Action =
  | { type: "ADD_TODO"; text: string }
  | { type: "REMOVE_TODO"; id: string }
  | { type: "TOGGLE_TODO"; id: string };

type State = { todos: { id: string; text: string; done: boolean }[] };

export function reduce(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, { id: crypto.randomUUID(), text: action.text, done: false }],
      };
    case "REMOVE_TODO":
      return { ...state, todos: state.todos.filter((t) => t.id !== action.id) };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t)),
      };
    default:
      return assertNever(action);
  }
}

// Demo:
let state: State = { todos: [] };
state = reduce(state, { type: "ADD_TODO", text: "Read Chapter 9" });
state = reduce(state, { type: "TOGGLE_TODO", id: state.todos[0]?.id ?? "" });
console.log(state.todos);

// Try adding a fourth Action variant in the type above. The compiler
// will now error at the `default` branch — pointing you to the consumer
// that needs updating before the new action ships.
