# tswind

tswind is a styling library for [React](https://reactjs.org) with CSS-in-JS like api, powered by [tailwindcss](https://tailwindcss.com/).

## Motivation

Tailwindcss allows you to write more css rules with as less as possible amount of meaningful key strokes. E.g typing 3 characters long `p-2` yields to same result with typing 14 characters long `padding: 2rem;`. If creating UI components is a part of our daily job, it becomes exponentially more efficient when we need to do this hundred of times in daily basis.

But not everything is for free. Having a lot of class names inside your jsx, makes it harder to focus on logic part of your component. Especially if the appeareance of an element changes based on internal state which is the case most of the time. $

## Example

```typescript
import { wind } from "tswind";

const Button = wind.button(
  {
    variant: {
      primary: "bg-red-100",
      secondary: "bg-transparent border-2 border-red-100",
    },
    size: {
      normal: "py-4 text-sm",
      large: "py-8",
    },
  },
  "font-bold tracking-wide px-8"
);

const Buttons = () => (
  <>
    <Button>Primary</Button>
    <Button size="large">Primary Large</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="secondary" size="large">
      Secondary Large
    </Button>
  </>
);
```

## Installation

```sh
npm i tswind
```

## Prerequisites

Tailwindcss has to be set up in the project. Please follow [this](https://tailwindcss.com/docs/installation) instructions.

## Usage

### Basic component

```typescript
const Button = wind.button("bg-indigo-700 rounded-md shadow-md text-white");
```

### Component with flags

```typescript
const Button = wind.button(
  { variants: { primary: "bg-red-100", secondary: "bg-green-100" } },
  "px-4 py-2"
);
```

### Extending Components

```typescript
const LinkButton = wind.extend(Button).a("text-semibold");
```

### Using Theme

```typescript
const wind = createWind({
  color: {
    text: "text-gray-800",
    textDark: "text-gray-900",
  },
  bgColor: {
    primary: "bg-indigo-700",
    secodary: "bg-green-700",
  },
});

const Button = wind.button({
  variant: {
    primary: [$.color.white, $.bgColor.primary],
    secondary: "$bgColor.secondary $color.textDark",
  },
});
```

### Extending the theme

```typescript
const {
  ThemeProvider,
  useTheme,
  theme: $,
} = wind.createTheme({
  dark: {
    color: {
      text: "text-gray-100",
      textDark: "text-gray-400",
    },
    bgColor: {
      primary: "bg-green-300",
      secondary: "bg-indigo-300",
    },
  },
});

const App = () => {
  const { preferDarkMode } = useDeviceSettings();
  const [theme, setTheme] = useTheme(preferDarkMode ? "dark" : "default");
  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={() =>
          setTheme((theme) => (theme === "dark" ? "default" : "dark"))
        }
      >
        Toggle Theme
      </Button>
    </ThemeProvider>
  );
};
```
