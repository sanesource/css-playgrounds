export const LANGUAGES = {
  HTML: "html",
  CSS: "css",
  SCSS: "scss",
};

export const PLAYGROUNDS = {
  VANILLA: "vanilla",
  SCSS: "scss",
  BOOTSTRAP: "bootstrap",
  TAILWIND: "tailwind",
};

export const DROPDOWN_OPTIONS = Object.entries(PLAYGROUNDS).map(([k, v]) => ({
  value: v,
  label: k,
}));

const INSERT_CODE = "<$INSERT_CODE$>";
const HTML_DEFAULT_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Playground</title>
</head>
<body>
    ${INSERT_CODE}
</body>
</html>`;
const CSS_DEFAULT_CODE = `${INSERT_CODE}`;

export const DEFAULT_CODE = {
  [PLAYGROUNDS.VANILLA]: {
    HTML: HTML_DEFAULT_CODE.replace(INSERT_CODE, "<h1>Hello World</h1>"),
    CSS: CSS_DEFAULT_CODE.replace(INSERT_CODE, "h1 { color: red; }"),
  },

  [PLAYGROUNDS.SCSS]: {
    HTML: HTML_DEFAULT_CODE.replace(
      INSERT_CODE,
      `<div>
      <h1>Hello SCSS</h1>
    </div>`
    ),
    CSS: CSS_DEFAULT_CODE.replace(
      INSERT_CODE,
      `div {
  background: black;
  h1 {
    color: white;
  }
}`
    ),
  },

  [PLAYGROUNDS.BOOTSTRAP]: {
    HTML: HTML_DEFAULT_CODE.replace(
      INSERT_CODE,
      `<div class="container">
      <button type="button" class="btn btn-primary">Primary Button</button>
      <button type="button" class="btn btn-secondary">Secondary Button</button>
  </div>`
    ),
    CSS: "",
  },

  [PLAYGROUNDS.TAILWIND]: {
    HTML: HTML_DEFAULT_CODE.replace(
      INSERT_CODE,
      "<h1 class='text-red-700 m-4'>Hello TailWind</h1>"
    ),
    CSS: "",
  },
};
