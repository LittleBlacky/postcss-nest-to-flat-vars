# postcss-nest-to-flat-vars

[English](./README_en.md) | 中文

一个将嵌套的 CSS 结构转换为扁平的 CSS 变量的 PostCSS 插件。

## 功能特性

- 🎯 将嵌套的 CSS 结构转换为扁平的 CSS 自定义属性
- ⚙️ 支持自定义前缀和分隔符
- 🛡️ 保持非嵌套 CSS 规则不变
- 📦 零依赖，轻量级
- 🧪 完整的测试覆盖

## 安装

```bash
npm install postcss-nest-to-flat-vars --save-dev
```

## 使用方法

### 1. 配置 PostCSS

```js
// postcss.config.js
module.exports = {
  plugins: [
    require("postcss-nest-to-flat-vars")({
      prefix: "theme", // 可选：CSS 变量前缀
      delimiter: "_",  // 可选：分隔符，默认为 '-'
    }),
  ],
};
```

### 2. 输入 CSS

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

/* 其他 CSS 规则保持不变 */
.button {
  background: red;
}
```

### 3. 转换后的输出

```css
:root {
  --theme_colors_primary: #3366ff;
  --theme_colors_secondary: #ff6633;
  --theme_spacing_small: 8px;
  --theme_spacing_medium: 16px;
}

/* 其他 CSS 规则保持不变 */
.button {
  background: red;
}
```

## 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `prefix` | `string` | `''` | CSS 变量的前缀 |
| `delimiter` | `string` | `'-'` | 变量名中使用的分隔符 |

### 配置示例

```js
// 使用默认配置
require("postcss-nest-to-flat-vars")()

// 使用自定义前缀
require("postcss-nest-to-flat-vars")({ prefix: "my-theme" })

// 使用自定义分隔符
require("postcss-nest-to-flat-vars")({ delimiter: "_" })

// 同时使用前缀和分隔符
require("postcss-nest-to-flat-vars")({ 
  prefix: "my-theme", 
  delimiter: "_" 
})
```

## 高级示例

### 复杂嵌套结构

```css
/* 输入 */
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
/* 输出 */
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

## 开发

### 安装依赖

```bash
npm install
```

### 运行测试

```bash
npm test
```

### 构建项目

```bash
npm run build
```

## 许可证

MIT