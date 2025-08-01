# Discription

A PostCSS plugin that converts nested CSS structures into flat CSS variables.

## Install

```bash
npm install postcss-nest-to-flat-vars --save-dev
```

## Usage

### 1. Configure PostCSS：

```js
// postcss.config.js
module.exports = {
  plugins: [
    require("postcss-nest-to-flat-vars")({
      prefix: "theme", // 可选前缀
      delimiter: "_", // 可选分隔符，默认为 '-'
    }),
  ],
};
```

### 2. Input CSS

```css
theme {
  colors {
    primary: #3366ff;
    secondary: #ff6633;
  }
  spacing {
    small: 8px;
    medium: 16px;
  }
}
```

### 3. Transformed Output CSS

```css
:root {
  --theme_colors_primary: #3366ff;
  --theme_colors_secondary: #ff6633;
  --theme_spacing_small: 8px;
  --theme_spacing_medium: 16px;
}
```