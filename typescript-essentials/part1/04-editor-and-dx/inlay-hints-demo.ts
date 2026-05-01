// Book reference: Chapter 4 — hover and inlay-hint demo.
// Open in VS Code with inlay hints enabled (settings copied from vscode-settings.json).
// Hover over each value to see what the language server has inferred.

const xs = [1, 2, "three"]; // hover: const xs: (string | number)[]
const y = { name: "Ada", age: 36 } as const; // readonly { name: "Ada"; age: 36 }

function fetchUser(id: string) {
  return { id, name: "Ada" };
}
// hover fetchUser: function fetchUser(id: string): { id: string; name: string }

async function fetchUserAsync(id: string) {
  await Promise.resolve();
  return fetchUser(id);
}
// hover fetchUserAsync: function fetchUserAsync(id: string): Promise<{...}>

xs.map((x) => x); // hover x: string | number

console.log(y, fetchUser("u-1"));
void fetchUserAsync("u-2");
