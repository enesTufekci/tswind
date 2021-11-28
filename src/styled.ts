import { createComponent, WindComponent } from "./createComponent";
import { normalizeConfig } from "./normalizeConfig";
import { Elements, Flags, Token } from "./types";

type StyledFn<K extends Elements> = <T extends Flags | Token | undefined>(
  flags?: T,
  ...tokens: Token[]
) => WindComponent<T extends Flags ? T : {}, K>;

export type Styled = {
  [K in keyof JSX.IntrinsicElements]: StyledFn<K>;
};

export function createStyled<T extends Flags>(
  __flags?: T | Token,
  ...__tokens: Token[]
) {
  return new Proxy({} as Styled, {
    get: (_, element: Elements) => {
      return (_flags: Flags, ..._tokens: Token[]) => {
        const { flags, tokens } = normalizeConfig(
          _flags,
          __flags,
          _tokens,
          __tokens
        );

        return createComponent({
          element,
          flags,
          tokens,
        });
      };
    },
  });
}

export const styled = createStyled();
