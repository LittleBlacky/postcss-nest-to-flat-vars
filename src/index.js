const postcss = require('postcss');

/**
 * 将嵌套的 CSS 结构转换为扁平的 CSS 变量
 * @param {Object} options - 插件选项
 * @param {string} options.prefix - CSS 变量前缀，默认为空
 * @param {string} options.delimiter - 分隔符，默认为 '-'
 * @returns {Function} PostCSS 插件函数
 */
function nestToFlatVars(options = {}) {
  const { prefix = '', delimiter = '-' } = options;
  
  return function(root) {
    const variables = new Map();
    const processedRules = new Set();
    
    // 第一遍：收集所有变量
    root.walkRules(rule => {
      if (rule.parent.type === 'rule' && !rule.selector.startsWith(':root') && !rule.selector.startsWith(':host')) {
        const path = buildNestPath(rule);
        
        rule.walkDecls(decl => {
          const varName = buildVariableName(path, decl.prop, prefix, delimiter);
          const varValue = decl.value;
          variables.set(varName, varValue);
          processedRules.add(rule);
        });
      }
    });
    
    // 第二遍：移除已处理的规则和空规则
    root.walkRules(rule => {
      if (processedRules.has(rule)) {
        rule.remove();
      } else if (rule.parent.type === 'rule' && !rule.selector.startsWith(':root') && !rule.selector.startsWith(':host')) {
        // 移除空的嵌套规则
        if (rule.nodes.length === 0) {
          rule.remove();
        }
      }
    });
    
    // 移除空的父规则
    root.walkRules(rule => {
      if (rule.nodes.length === 0 && !rule.selector.startsWith(':root') && !rule.selector.startsWith(':host')) {
        rule.remove();
      }
    });
    
    // 创建 :root 规则并添加所有变量
    if (variables.size > 0) {
      const rootRule = postcss.rule({ selector: ':root' });
      
      variables.forEach((value, name) => {
        const decl = postcss.decl({
          prop: `--${name}`,
          value: value
        });
        rootRule.append(decl);
      });
      
      // 将 :root 规则插入到文档开头
      root.prepend(rootRule);
    }
  };
}

/**
 * 构建嵌套路径
 * @param {Object} rule - PostCSS 规则对象
 * @returns {Array} 嵌套路径数组
 */
function buildNestPath(rule) {
  const path = [];
  let currentRule = rule;
  
  while (currentRule.parent && currentRule.parent.type === 'rule') {
    path.unshift(currentRule.selector);
    currentRule = currentRule.parent;
  }
  
  return path;
}

/**
 * 构建变量名
 * @param {Array} path - 嵌套路径
 * @param {string} prop - 属性名
 * @param {string} prefix - 前缀
 * @param {string} delimiter - 分隔符
 * @returns {string} 变量名
 */
function buildVariableName(path, prop, prefix, delimiter) {
  const parts = [];
  
  if (prefix) {
    parts.push(prefix);
  }
  
  parts.push(...path);
  parts.push(prop);
  
  return parts.join(delimiter);
}

module.exports = postcss.plugin('postcss-nest-to-flat-vars', nestToFlatVars); 