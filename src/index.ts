import postcss, { Root, Rule, Declaration } from 'postcss';

export interface PluginOptions {
  prefix?: string;
  delimiter?: string;
}

/**
 * 构建嵌套路径
 * @param rule - PostCSS 规则对象
 * @returns 嵌套路径数组
 */
function buildNestPath(rule: Rule): string[] {
  const path: string[] = [];
  let currentRule: Rule | undefined = rule;
  
  while (currentRule?.parent?.type === 'rule') {
    path.unshift(currentRule.selector);
    currentRule = currentRule.parent as Rule;
  }
  
  return path;
}

/**
 * 构建变量名
 * @param path - 嵌套路径
 * @param prop - 属性名
 * @param prefix - 前缀
 * @param delimiter - 分隔符
 * @returns 变量名
 */
function buildVariableName(path: string[], prop: string, prefix: string, delimiter: string): string {
  const parts: string[] = [];
  
  if (prefix) {
    parts.push(prefix);
  }
  
  parts.push(...path);
  parts.push(prop);
  
  return parts.join(delimiter);
}

/**
 * 将嵌套的 CSS 结构转换为扁平的 CSS 变量
 * @param options - 插件选项
 * @returns PostCSS 插件函数
 */
const nestToFlatVars = (options: PluginOptions = {}) => {
  const { prefix = '', delimiter = '-' } = options;
  
  return (root: Root) => {
    const variables = new Map<string, string>();
    const processedRules = new Set<Rule>();
    
    // 第一遍：收集所有变量
    root.walkRules((rule: Rule) => {
      if (rule.parent?.type === 'rule' && 
          !rule.selector.startsWith(':root') && 
          !rule.selector.startsWith(':host')) {
        const path = buildNestPath(rule);
        
        rule.walkDecls((decl: Declaration) => {
          const varName = buildVariableName(path, decl.prop, prefix, delimiter);
          const varValue = decl.value;
          variables.set(varName, varValue);
          processedRules.add(rule);
        });
      }
    });
    
    // 第二遍：移除已处理的规则和空规则
    root.walkRules((rule: Rule) => {
      if (processedRules.has(rule)) {
        rule.remove();
      } else if (rule.parent?.type === 'rule' && 
                 !rule.selector.startsWith(':root') && 
                 !rule.selector.startsWith(':host')) {
        // 移除空的嵌套规则
        if (rule.nodes.length === 0) {
          rule.remove();
        }
      }
    });
    
    // 移除空的父规则
    root.walkRules((rule: Rule) => {
      if (rule.nodes.length === 0 && 
          !rule.selector.startsWith(':root') && 
          !rule.selector.startsWith(':host')) {
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
};

export default nestToFlatVars; 