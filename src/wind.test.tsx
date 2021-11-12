import * as React from "react";
import { render } from "@testing-library/react";

import { wind } from "./wind";

describe("wind", () => {
  test("simple component", async () => {
    const Empty = wind.div();
    const { container: empty } = render(<Empty></Empty>);
    expect(empty.innerHTML).toEqual(`<div></div>`);

    const Flex = wind.div("flex");
    const { container: flex } = render(<Flex></Flex>);
    expect(flex.innerHTML).toEqual(`<div class="flex"></div>`);

    const Div = wind.div(
      {
        direction: { row: "flex-row", col: "flex-col" },
        background: { dark: "bg-gray-100", light: "bg-gray-500" },
      },
      "m-2"
    );

    const { container: row } = render(<Div>Hello</Div>);
    expect(row.innerHTML).toEqual(
      `<div class="flex-row bg-gray-100 m-2">Hello</div>`
    );

    const { container: col } = render(<Div direction="col">Hello</Div>);
    expect(col.innerHTML).toEqual(
      `<div class="flex-col bg-gray-100 m-2">Hello</div>`
    );

    const { container: colLight } = render(
      <Div background="light" direction="col">
        Hello
      </Div>
    );

    expect(colLight.innerHTML).toEqual(
      `<div class="flex-col bg-gray-500 m-2">Hello</div>`
    );

    const { container: onClick } = render(
      <Div onClick={() => {}} direction="col">
        Hello
      </Div>
    );

    expect(onClick.innerHTML).toEqual(
      `<div class="flex-col bg-gray-100 m-2">Hello</div>`
    );
  });
});
