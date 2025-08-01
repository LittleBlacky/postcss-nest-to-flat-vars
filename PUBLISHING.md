# 发布指南

## 发布到 npm

### 1. 登录 npm

```bash
npm login
```

### 2. 检查包信息

```bash
npm pack --dry-run
```

### 3. 发布

```bash
npm publish
```

### 4. 发布到 GitHub

```bash
git add .
git commit -m "Release v1.0.0"
git tag v1.0.0
git push origin main
git push origin v1.0.0
```

## 版本更新

### 补丁版本 (1.0.1)
```bash
npm version patch
```

### 次要版本 (1.1.0)
```bash
npm version minor
```

### 主要版本 (2.0.0)
```bash
npm version major
```

## 检查清单

- [ ] 所有测试通过
- [ ] 构建成功
- [ ] README 文档完整
- [ ] 版本号正确
- [ ] 包名称可用
- [ ] 许可证文件存在 