export type Elements = keyof JSX.IntrinsicElements;
export type Theme = Record<string, Record<string, string>>;
export type ThemeToken = (theme: Theme) => string;
export type Token = string | ThemeToken | (string | ThemeToken)[];
export type Flags = Record<string, Record<string, Token>>;

export type ThemeTokenProcessor = (t: ThemeToken) => string;
