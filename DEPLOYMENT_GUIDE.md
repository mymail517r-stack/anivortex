# 🚀 AniVortex - Complete Deployment Guide

Deploy your Hindi anime streaming platform **AniVortex** to Vercel in minutes!

## 🎯 Quick Deploy (Easiest)

### Option 1: Deploy with Vercel Button (One-Click)

```
Click this button to deploy:
https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/anivortex
```

### Option 2: Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Navigate to project
cd anivortex

# 3. Deploy
vercel

# 4. Follow the prompts and accept defaults
# Your site will be live at: https://anivortex.vercel.app
```

### Option 3: GitHub + Vercel Integration (Best for CI/CD)

#### Step 1: Push to GitHub
```bash
# Initialize git repository
cd anivortex
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: AniVortex - Hindi Anime Streaming Platform"

# Add GitHub remote (replace with your repo URL)
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/anivortex.git

# Push to GitHub
git push -u origin main
```

#### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Paste your repository URL
5. Click **"Import"**
6. Configure project:
   - **Project Name**: `anivortex` (or your choice)
   - **Framework**: `Next.js`
   - **Root Directory**: `./` (or `./anivortex` if in monorepo)
7. Click **"Deploy"**

✅ **Your site is now live!** Check the deployment URL in your Vercel dashboard.

---

## 📋 Pre-Deployment Checklist

- [ ] Node.js 18+ or 20+ installed locally
- [ ] All dependencies installed: `npm install`
- [ ] Build succeeds: `npm run build`
- [ ] Dev server runs: `npm run dev`
- [ ] No console errors in development
- [ ] Git repository initialized (if using GitHub)
- [ ] GitHub account created (if using GitHub method)
- [ ] Vercel account created (https://vercel.com/signup)

---

## 🔧 Environment Variables

AniVortex uses free APIs that don't require authentication. However, you can customize via environment variables.

### Optional `.env.local` (for development):
```env
NEXT_PUBLIC_JIKAN_API=https://api.jikan.moe/v4
NEXT_PUBLIC_SITE_NAME=AniVortex
NEXT_PUBLIC_SITE_URL=https://anivortex.vercel.app
```

### On Vercel:
1. Go to **Project Settings** → **Environment Variables**
2. Add any variables from `.env.example`
3. **Re-deploy** for changes to take effect

---

## 🎬 Testing Before Deployment

### Local Development
```bash
# Start dev server
npm run dev

# Open http://localhost:3000
```

### Production Build Test
```bash
# Build for production
npm run build

# Start production server
npm start

# Open http://localhost:3000
```

### What to Test
- ✅ Homepage loads with hero section
- ✅ Trending anime cards appear
- ✅ Top Rated section loads
- ✅ Click on an anime → detail page opens
- ✅ Search functionality works
- ✅ Add to watchlist → saved in localStorage
- ✅ Responsive on mobile/tablet/desktop

---

## 📦 Deployment Methods Comparison

| Method | Time | Difficulty | Auto-Deploy |
|--------|------|-----------|------------|
| **Vercel CLI** | 2 min | ⭐ Easy | ❌ Manual |
| **GitHub Integration** | 3 min | ⭐⭐ Easy | ✅ Auto on push |
| **One-Click Deploy** | 1 min | ⭐ Easiest | ✅ Auto on push |

---

## 🚨 Troubleshooting

### Issue: Build Fails
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Issue: Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Issue: API Errors
- Check internet connection
- Verify Jikan API: https://api.jikan.moe/v4/anime/1
- Clear browser cache (Ctrl+Shift+Del)

### Issue: Images Not Loading
- Check image URLs in console
- Verify CDN access (cdn.myanimelist.net)
- Try incognito/private mode

### Issue: TypeScript Errors
```bash
# Ensure TypeScript is up to date
npm install -D typescript@latest

# Rebuild
npm run build
```

---

## 🔄 Continuous Deployment (GitHub)

Once deployed via GitHub, every push to `main` branch automatically redeploys:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically redeploys! ✨
```

---

## 📊 Monitoring & Analytics

### View Logs
1. Go to Vercel Dashboard
2. Select your project
3. Click **"Deployments"**
4. Click on latest deployment
5. View **"Function Logs"** tab

### View Usage
- **Analytics**: Shows traffic, slowest pages
- **Error Logs**: Shows 404s, API errors
- **Performance**: Build time, deployment status

---

## 🛡️ Security Best Practices

✅ **Already Implemented:**
- No sensitive data stored in code
- All API calls to public endpoints
- HTTPS enforced by Vercel
- Environment variables supported

✅ **Additional Steps (Optional):**
```env
# Add rate limiting via middleware (future)
# Add CORS protection (future)
# Add CSP headers (future)
```

---

## 💰 Costs

**AniVortex on Vercel:**
- **Hobby Plan**: FREE ✅
  - Unlimited deployments
  - Automatic HTTPS
  - Global CDN
  - Perfect for personal projects

- **Pro Plan**: $20/month
  - For production sites with more traffic

---

## 🎨 Custom Domain Setup

### Add Your Domain to Vercel

1. **Vercel Dashboard** → Select Project
2. **Settings** → **Domains**
3. Click **"Add Domain"**
4. Enter your domain (e.g., `anivortex.com`)
5. Choose DNS provider
6. Update DNS records at your registrar
7. Done! ✅

### Example DNS Records:
```
Type: A
Name: @
Value: 76.76.19.165
```

---

## 🚀 Performance Optimization

### Already Optimized:
- ✅ Next.js Image optimization
- ✅ Code splitting & lazy loading
- ✅ Automatic minification
- ✅ CDN distribution via Vercel

### Monitor Performance:
- Go to **Deployments** → select one
- Click **"Analytics"** tab
- View Core Web Vitals

---

## 📱 Mobile & PWA Features

### Mobile Responsiveness
- ✅ Fully responsive design
- ✅ Touch-friendly buttons
- ✅ Mobile navigation menu
- ✅ Optimized images

### Add to Home Screen (Future)
```bash
# Add service worker for offline support
npm install workbox-webpack-plugin
```

---

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Jikan API Docs**: https://jikan.moe
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com

---

## 📞 Support

### Getting Help
- **Vercel Support**: https://vercel.com/support
- **Discord**: Vercel Community
- **GitHub Issues**: Report bugs on GitHub

### Common Resources
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Best Practices](https://vercel.com/docs)
- [API Status](https://jikan.moe/status)

---

## ✨ Post-Deployment Checklist

- [ ] Site loads on deployed URL
- [ ] All pages accessible
- [ ] API calls working
- [ ] Images loading
- [ ] Search functional
- [ ] Watchlist persisting
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Share link with friends! 🎉

---

## 🎉 Success!

Your AniVortex anime streaming platform is now live! 

**Next Steps:**
1. Share your deployment URL
2. Add custom domain (optional)
3. Monitor performance
4. Add more features
5. Celebrate! 🎊

---

**Made with ❤️ by Naman**

Questions? Check the README.md or GitHub Issues!
