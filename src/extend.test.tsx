import React from "react";

import { render } from "@testing-library/react";
import { extend } from "./extend";
import { styled } from "./styled";

const Box = styled.div();
const Flex = extend(Box).div({ direction: { row: "row", col: "col" } }, "flex");
const Wrapper = extend(Flex).div("bg-gray-100");
const Wrapper2 = extend(Wrapper).div("bg-red-100");

describe("extend", () => {
  test("1 level", () => {
    const { container } = render(<Flex />);
    expect(container.innerHTML).toEqual('<div class="flex row"></div>');
  });

  test("2 level", () => {
    const { container } = render(<Wrapper direction="col" />);
    expect(container.innerHTML).toEqual(
      '<div class="flex bg-gray-100 col"></div>'
    );
  });
  test("3 level", () => {
    const { container } = render(<Wrapper2 direction="col" />);
    expect(container.innerHTML).toEqual(
      '<div class="bg-gray-100 flex bg-red-100 col"></div>'
    );
  });
});
