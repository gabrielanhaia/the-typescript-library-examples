// Book reference: Chapter 13 — when the 5.4 fix doesn't fire and you still
// need a const capture.

export function example(url: string | URL): () => string {
  // If we returned () => url.toString() here, the closure would not benefit
  // from the narrow — because below we reassign `url`. The 5.4 analysis
  // refuses to inherit a narrow that a later write invalidates.

  const u = typeof url === "string" ? new URL(url) : url;
  const fn = (): string => u.toString();

  // Later assignment that would invalidate any inherited narrow:
  url = "https://second.example.com/";
  void url;

  return fn;
}

console.log(example("https://example.com")());
console.log(example(new URL("https://example.com"))());
