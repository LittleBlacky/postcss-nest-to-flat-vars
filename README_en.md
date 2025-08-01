# postcss-nest-to-flat-vars

English | [中文](./README.md)

A PostCSS plugin that converts nested CSS structures into flat CSS custom properties.

## Features

- 🎯 Convert nested CSS structures to flat CSS custom properties
- ⚙️ Support custom prefixes and delimiters
- 🛡️ Keep non-nested CSS rules unchanged
- 📦 Zero dependencies, lightweight
- 🧪 Complete test coverage

## Install

```bash
npm install postcss-nest-to-flat-vars --save-dev
```

## Usage

### 1. Configure PostCSS

```js
// postcss.config.js
module.exports = {
  plugins: [
    require("postcss-nest-to-flat-vars")({
      prefix: "theme", // Optional: CSS variable prefix
      delimiter: "_",  // Optional: delimiter, defaults to '-'
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

/* Other CSS rules remain unchanged */
.button {
  background: red;
}
```

### 3. Transformed Output

```css
:root {
  --theme_colors_primary: #3366ff;
  --theme_colors_secondary: #ff6633;
  --theme_spacing_small: 8px;
  --theme_spacing_medium: 16px;
}

/* Other CSS rules remain unchanged */
.button {
  background: red;
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `prefix` | `string` | `''` | Prefix for CSS variables |
| `delimiter` | `string` | `'-'` | Delimiter used in variable names |

### Configuration Examples

```js
// Use default configuration
require("postcss-nest-to-flat-vars")()

// Use custom prefix
require("postcss-nest-to-flat-vars")({ prefix: "my-theme" })

// Use custom delimiter
require("postcss-nest-to-flat-vars")({ delimiter: "_" })

// Use both prefix and delimiter
require("postcss-nest-to-flat-vars")({ 
  prefix: "my-theme", 
  delimiter: "_" 
})
```

## Advanced Examples

### Complex Nested Structure

```css
/* Input */
theme {
  colors {
    primary {
      light: #6699ff;
      main: #3366ff;
      dark: #0033cc;
    }
    secondary {
      light: #ff9966;
      main: #ff6633;
      dark: #cc3300;
    }
  }
  typography {
    font-sizes {
      xs: 12px;
      sm: 14px;
      base: 16px;
      lg: 18px;
      xl: 20px;
    }
  }
}
```

```css
/* Output */
:root {
  --theme-colors-primary-light: #6699ff;
  --theme-colors-primary-main: #3366ff;
  --theme-colors-primary-dark: #0033cc;
  --theme-colors-secondary-light: #ff9966;
  --theme-colors-secondary-main: #ff6633;
  --theme-colors-secondary-dark: #cc3300;
  --theme-typography-font-sizes-xs: 12px;
  --theme-typography-font-sizes-sm: 14px;
  --theme-typography-font-sizes-base: 16px;
  --theme-typography-font-sizes-lg: 18px;
  --theme-typography-font-sizes-xl: 20px;
}
```

## Development

### Install Dependencies

```bash
npm install
```

### Run Tests

```bash
npm test
```

### Build Project

```bash
npm run build
```

## License

MIT