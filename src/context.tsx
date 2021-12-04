import React, { useContext, createContext, useCallback, useState } from "react";
import { Theme, ThemeToken } from "./types";

type SetTheme<T> = (fn: ((theme: T) => T) | T) => void;

type ThemeTokens<T, Cache extends any = null> = T extends PropertyKey
  ? Cache
  : {
      [P in keyof T]: P extends string
        ? Cache extends null
          ? ThemeTokens<T[P], Record<P, () => string>>
          : never // (t:T) => is the actual type, but keep never to not expose theme vars to user
        : never;
    };

interface ContextValue {
  processor: (t: ThemeToken) => string;
  setTheme: SetTheme<any>;
  theme: Theme;
  themeName: string;
}

export const ThemeContext = createContext<ContextValue>({} as any);

interface ThemeProviderProps<T> {
  children: React.ReactNode;
  defaultTheme?: T;
}

export function createTheme<T extends Record<string, Theme>, K extends keyof T>(
  themes: T
) {
  const fallbackTheme = Object.keys(themes)[0] as K;
  function ThemeProvider({
    children,
    defaultTheme = fallbackTheme,
  }: ThemeProviderProps<K>) {
    const [themeName, setTheme] = useState(
      defaultTheme ? defaultTheme : fallbackTheme
    );

    const processor = useCallback(
      (fn: (theme: Theme) => string) => fn(themes[themeName]),
      [themeName]
    );
    return (
      <ThemeContext.Provider
        value={{
          processor,
          theme: themes[themeName],
          themeName: themeName as string,
          setTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }

  function useTheme(): { themeName: K; setTheme: SetTheme<K> } {
    const { themeName, setTheme } = useContext(ThemeContext);

    return {
      themeName: themeName as K,
      setTheme,
    };
  }

  const theme = Object.entries(themes[fallbackTheme]).reduce(
    (acc, [key0, value0]) => {
      return {
        ...acc,
        [key0]: Object.entries(value0).reduce((acc, [key1]) => {
          return {
            ...acc,
            [key1]: (t: Theme) => t[key0][key1],
          };
        }, {}),
      };
    },
    {}
  ) as ThemeTokens<T[K]>;
  return {
    useTheme,
    ThemeProvider,
    theme,
  };
}
