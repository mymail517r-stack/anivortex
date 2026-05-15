# ⚡ AniVortex - Quick Start Guide

Get your Hindi anime streaming platform running in 5 minutes!

## 🚀 Instant Deploy (Choose One)

### Option 1: Deploy with One Click
```bash
# Copy this link and open in browser:
https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/anivortex
```

### Option 2: Deploy from Command Line
```bash
npm install -g vercel
cd anivortex
vercel
# Follow prompts → Done! 🎉
```

### Option 3: Deploy via GitHub (Recommended)
```bash
# 1. Push to GitHub
git init && git add . && git commit -m "AniVortex"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/anivortex.git
git push -u origin main

# 2. Go to vercel.com → New Project → Import GitHub Repo
# 3. Select your repo → Deploy
# Done in 2 minutes! ✨
```

---

## 💻 Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

---

## 📁 Project Structure

```
anivortex/
├── app/                    # Pages (home, anime, search, etc)
├── components/            # UI components (navbar, cards, etc)
├── lib/                   # API & utilities
├── public/                # Static assets
├── README.md              # Full documentation
├── DEPLOYMENT_GUIDE.md    # Detailed deployment steps
└── package.json           # Dependencies
```

---

## ✨ Features Included

✅ **Netflix-Style UI** with red theme  
✅ **Trending & Top-Rated** anime feeds  
✅ **Search** functionality  
✅ **Anime Details** with episodes  
✅ **Watchlist** (saved locally)  
✅ **Fully Responsive** mobile/tablet/desktop  
✅ **Free API** (Jikan - no auth needed)  
✅ **Ready for Vercel** deployment  

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  red: {
    600: '#YOUR_HEX_COLOR',
  }
}
```

### Change Site Name
Edit `app/layout.tsx`:
```typescript
title: 'Your App Name - Hindi Anime Streaming'
```

### Add Navigation Links
Edit `components/Navbar.tsx` - add your links!

---

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npm run dev -- -p 3001` |
| Build fails | `npm run build` |
| API errors | Check internet/refresh |
| Images not loading | Clear browser cache |

---

## 📚 Learn More

- **Full Docs**: See `README.md`
- **Deployment**: See `DEPLOYMENT_GUIDE.md`
- **API Docs**: https://jikan.moe
- **Next.js**: https://nextjs.org/docs

---

## 🎯 Next Steps

1. ✅ Clone/download project
2. ✅ Run locally: `npm run dev`
3. ✅ Test features
4. ✅ Deploy: `vercel` or GitHub
5. ✅ Share link with friends!

---

## 📞 Need Help?

- Check `README.md` for detailed info
- See `DEPLOYMENT_GUIDE.md` for deployment
- Visit https://vercel.com/docs
- Check Jikan API status: https://jikan.moe

---

**Ready to stream? 🎬 Deploy now!**

Made with ❤️ by Naman
