import { WindComponent } from "./createComponent";
import { createStyled, Styled } from "./styled";
import { Elements, Flags, Token } from "./types";

export function extend<T extends Flags, K extends Elements>(
  Component: WindComponent<T, K>
): Styled<T> {
  const flags = (Component as any)._flags as T;
  const tokens = (Component as any)._tokens as Token[];
  return createStyled<T>(flags, ...tokens);
}
