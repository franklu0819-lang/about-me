# Vercel 部署配置说明

## 📋 分支部署策略

- **main 分支** → **生产环境** (Production)
  - URL: `https://about-me.vercel.app`
  - 每次推送到 main 会自动部署到生产环境
  
- **develop 分支** → **预览环境** (Preview)
  - URL: 每次部署会有唯一的预览 URL
  - 每次推送到 develop 会自动创建新的预览部署
  - 适合测试和预览

## 🔧 Vercel 默认行为

Vercel 会自动处理：
- Production Branch: `main` (默认)
- 所有其他分支 (包括 `develop`) → Preview Deployments

## 📝 在 Vercel Dashboard 中确认

1. 访问 https://vercel.com/dashboard
2. 找到 `about-me` 项目
3. 进入 **Settings** → **Git**
4. 确认：
   - **Production Branch**: `main`
   - **Auto-deploy**: ✅ 开启

## 🚀 工作流程

```bash
# 开发新功能
git checkout develop
git add .
git commit -m "feat: new feature"
git push origin develop
# → 自动创建预览部署

# 功能测试通过后，合并到 main
git checkout main
git merge develop
git push origin main
# → 自动部署到生产环境
```

## 📦 项目信息

- **项目**: about-me
- **框架**: Next.js 14
- **包管理**: npm
- **构建命令**: npm run build
