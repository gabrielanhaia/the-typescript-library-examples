// Part IV — Template literal types (Ch 13-15)

export type Greeting<Name extends string> = `Hello, ${Name}`;

export type CssLength = `${number}px` | `${number}rem` | `${number}em` | `${number}%`;

export type Endpoint = `/api/${string}`;

export type Method = "GET" | "POST" | "PUT" | "DELETE";

// Cross product
export type ApiCall = `${Method} ${Endpoint}`;

// Splitting
export type Split<
  S extends string,
  D extends string,
  Acc extends string[] = [],
> = S extends `${infer Head}${D}${infer Tail}` ? Split<Tail, D, [...Acc, Head]> : [...Acc, S];

// Joining
export type Join<T extends readonly string[], D extends string> = T extends readonly []
  ? ""
  : T extends readonly [infer Head extends string]
    ? Head
    : T extends readonly [infer Head extends string, ...infer Rest extends readonly string[]]
      ? `${Head}${D}${Join<Rest, D>}`
      : never;

// Camel-case from kebab-case
export type CamelCase<S extends string> = S extends `${infer Head}-${infer Tail}`
  ? `${Head}${Capitalize<CamelCase<Tail>>}`
  : S;

// Path parameter parsing
export type ParseParams<Path extends string> =
  Path extends `${infer _Start}/:${infer Param}/${infer Rest}`
    ? Record<Param | keyof ParseParams<`/${Rest}`>, string>
    : Path extends `${infer _Start}/:${infer Param}`
      ? Record<Param, string>
      : Record<string, never>;

// Runtime helpers
export function makeEndpoint<P extends string>(path: P): `/api/${P}` {
  return `/api/${path}`;
}

export function splitString(input: string, delimiter: string): string[] {
  return input.split(delimiter);
}
