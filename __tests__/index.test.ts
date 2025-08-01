import postcss from 'postcss';
import nestToFlatVars, { PluginOptions } from '../src/index';

function run(input: string, output: string, opts: PluginOptions = {}) {
  return postcss([nestToFlatVars(opts)]).process(input, { from: undefined })
    .then(result => {
      // 标准化输出格式，移除多余的空格和换行
      const normalizedResult = result.css.replace(/\s+/g, ' ').trim();
      const normalizedExpected = output.replace(/\s+/g, ' ').trim();
      expect(normalizedResult).toEqual(normalizedExpected);
      expect(result.warnings()).toHaveLength(0);
    });
}

describe('postcss-nest-to-flat-vars', () => {
  it('should convert nested CSS to flat variables', () => {
    const input = `
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
    `;
    
    const output = `
      :root {
        --theme-colors-primary: #3366ff;
        --theme-colors-secondary: #ff6633;
        --theme-spacing-small: 8px;
        --theme-spacing-medium: 16px
      }
    `;
    
    return run(input, output, { prefix: 'theme' });
  });

  it('should work with custom prefix', () => {
    const input = `
      theme {
        colors {
          primary: #3366ff;
        }
      }
    `;
    
    const output = `
      :root {
        --my-colors-primary: #3366ff
      }
    `;
    
    return run(input, output, { prefix: 'my' });
  });

  it('should work with custom delimiter', () => {
    const input = `
      theme {
        colors {
          primary: #3366ff;
        }
      }
    `;
    
    const output = `
      :root {
        --theme_colors_primary: #3366ff
      }
    `;
    
    return run(input, output, { prefix: 'theme', delimiter: '_' });
  });

  it('should work with both prefix and delimiter', () => {
    const input = `
      theme {
        colors {
          primary: #3366ff;
        }
      }
    `;
    
    const output = `
      :root {
        --my_colors_primary: #3366ff
      }
    `;
    
    return run(input, output, { prefix: 'my', delimiter: '_' });
  });

  it('should handle empty nested rules', () => {
    const input = `
      theme {
        colors {
        }
      }
    `;
    
    const output = `
    `;
    
    return run(input, output);
  });

  it('should preserve non-nested rules', () => {
    const input = `
      .button {
        background: red;
      }
      theme {
        colors {
          primary: #3366ff;
        }
      }
    `;
    
    const output = `
      :root {
        --theme-colors-primary: #3366ff;
      }
      .button {
        background: red;
      }
    `;
    
    return run(input, output, { prefix: 'theme' });
  });
}); 