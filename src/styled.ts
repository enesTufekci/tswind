import { createComponent, WindComponent } from "./createComponent";
import { normalizeConfig } from "./normalizeConfig";
import { Elements, Flags, Token } from "./types";

type StyledFn<T0 extends Flags, K extends Elements> = <
  T extends Flags | Token | undefined
>(
  flags?: T,
  ...tokens: Token[]
) => WindComponent<T extends Flags ? T0 & T : T0, K>;

export type Styled<T extends Flags> = {
  [K in keyof JSX.IntrinsicElements]: StyledFn<T, K>;
};

export function createStyled<T extends Flags>(
  __flags: T,
  ...__tokens: Token[]
): Styled<T> {
  return new Proxy({} as Styled<T>, {
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

export const styled = createStyled({});
