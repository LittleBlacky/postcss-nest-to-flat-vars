module.exports = {
  plugins: [
    require("postcss-nest-to-flat-vars")({
      prefix: "theme", // 可选：CSS 变量前缀
      delimiter: "_",  // 可选：分隔符，默认为 '-'
    }),
  ],
}; 