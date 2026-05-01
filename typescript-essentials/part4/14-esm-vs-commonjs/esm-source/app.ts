// ESM import; note the .ts extension is allowed here because the repo's
// tsconfig has allowImportingTsExtensions and rewriteRelativeImportExtensions.
import { add, PI } from "./math.ts";

const total = await Promise.resolve(add(1, 2)); // top-level await — only allowed in ESM
console.log(`add(1, 2) = ${total}`);
console.log(`PI = ${PI}`);
