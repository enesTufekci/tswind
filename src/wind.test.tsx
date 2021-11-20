import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

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

  it("extends", () => {
    const ButtonBase = wind.button(
      { variant: { primary: "primary", secondary: "secondary" } },
      "foo bar"
    );

    const Link = wind
      .extend(ButtonBase)
      .a({ theme: { dark: "dark", light: "light" } }, "baz");

    const { container: button } = render(
      <Link variant="secondary" theme="dark" />
    );
    expect(button.innerHTML).toEqual(
      `<a class="secondary dark baz foo bar"></a>`
    );
  });

  it("forwards ref", async () => {
    const Input = wind.input({});
    const fn = jest.fn();

    const Component = () => {
      const [value, setValue] = React.useState("");

      const ref = React.createRef<HTMLInputElement>();
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        fn(ref.current?.value);
        setValue(value);
      };
      return (
        <Input
          onChange={handleChange}
          value={value}
          ref={ref}
          data-testid="input"
        ></Input>
      );
    };

    render(<Component />);

    const input = await screen.findByTestId("input");
    expect(input).toBeTruthy();
    fireEvent.change(input, {
      target: {
        value: "hello",
      },
    });
    expect(fn).toHaveBeenNthCalledWith(1, "hello");
  });
});
