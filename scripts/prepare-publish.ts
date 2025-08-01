#!/usr/bin/env node

import fs from 'fs';
import { execSync } from 'child_process';

console.log('准备发布...');

// 检查 dist 目录是否存在
if (!fs.existsSync('dist')) {
  console.log('构建项目...');
  execSync('npm run build', { stdio: 'inherit' });
}

// 检查测试是否通过
console.log('运行测试...');
execSync('npm test', { stdio: 'inherit' });

console.log('✅ 发布准备完成！');
console.log('现在可以运行: npm publish'); 