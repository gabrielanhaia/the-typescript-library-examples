// Book reference: Chapter 13 — the canonical TS 5.4+ closure-narrowing example.

export function getUrls(url: string | URL, names: string[]): string[] {
  if (typeof url === "string") {
    url = new URL(url);
  }

  // In TS 5.4+, the closure inherits the narrow because `url`'s last
  // assignment is unambiguous and there are no later writes.
  return names.map((name) => {
    url.searchParams.set("name", name);
    return url.toString();
  });
}

const urls = getUrls("https://example.com/", ["ada", "eve"]);
for (const u of urls) console.log(u);
