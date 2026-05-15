# 🚀 GitHub & Vercel Deployment Guide for AniVortex

## Step 1: Upload to GitHub

### Option A: Using GitHub Web Interface (Recommended - No Technical Issues)

1. **Create a new repository on GitHub:**
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `anivortex`
   - Description: "Hindi anime streaming platform with Netflix-style design"
   - Select: **Public** (for free deployment on Vercel)
   - DO NOT initialize with README (we already have one)
   - Click **Create repository**

2. **Upload files via GitHub Web UI:**
   - On the new repository page, you'll see "Quick setup" instructions
   - Click **"uploading an existing file"** or drag-and-drop files
   - Or click **"Add file"** → **"Upload files"**
   - Select all files from `/workspace/anivortex/` (excluding `node_modules/` and `.next/`)
   - Commit with message: "Initial commit: AniVortex - Hindi anime streaming platform"

3. **Verify upload:**
   - Repository should show all 40 files
   - `package.json`, `app/`, `components/`, etc. all visible

### Option B: Using Git CLI (If Token Issues Resolved)

```bash
cd /workspace/anivortex
git remote add origin https://github.com/YOUR_USERNAME/anivortex.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Step 2: Deploy to Vercel

### Prerequisites
- ✅ GitHub repository created and files uploaded
- ✅ GitHub account active
- ✅ Vercel account (free tier works perfectly)

### Deployment Steps

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign in or create free account (use GitHub login for easiest auth)

2. **Import GitHub Repository:**
   - Click **"Add New..."** → **"Project"**
   - Select **"Import Git Repository"**
   - Search for `anivortex` repository
   - Click **"Import"**

3. **Configure Project Settings:**
   - **Project Name:** `anivortex` (or custom name)
   - **Framework Preset:** Should auto-detect **Next.js** ✓
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
   - **Environment Variables:** None required for this project
   - Click **"Deploy"**

4. **Wait for Deployment:**
   - Vercel will install dependencies (~2-3 minutes)
   - Build the project (~3-5 minutes)
   - Deploy to CDN (automatic)
   - You'll get a live URL: `https://anivortex.vercel.app` (or similar)

5. **Verify Deployment:**
   - Wait for ✅ "Production" status
   - Click the live URL to test
   - Check homepage loads anime instantly
   - Click "Watch Now" on any anime
   - Verify `/watch/[id]` page loads with video player
   - Test episode selection
   - Confirm quality selector works

---

## Step 3: Configure Custom Domain (Optional)

1. **Go to Vercel Project Settings:**
   - Project → Settings → Domains
   - Add custom domain (requires DNS configuration)
   - Recommended: Point `anivortex.com` to your Vercel deployment

2. **Example Domain Setup:**
   - Domain: `anivortex.com`
   - Vercel provides DNS records to add to your registrar
   - Takes 10-30 minutes to propagate

---

## Step 4: Enable Auto-Deploy on GitHub Push

**Automatic with Vercel:**
- Every time you push to `main` branch on GitHub, Vercel auto-deploys
- No additional configuration needed
- Deployment takes ~2-3 minutes per push
- Previous deployment is kept as backup (can rollback)

**Example Workflow:**
```bash
# After making changes locally:
git add .
git commit -m "Fix: Updated API timeout to 10 seconds"
git push origin main

# Vercel automatically builds and deploys
# New version live within 2-3 minutes
```

---

## Deployment Checklist

### Before Deployment
- ✅ All 40 files committed to GitHub
- ✅ No sensitive data in `.env` files (use `.env.example`)
- ✅ `package.json` has all dependencies
- ✅ `next.config.ts` configured correctly
- ✅ `vercel.json` present with build settings
- ✅ TypeScript build passes: `npm run build`
- ✅ All routes working on dev server

### After Deployment
- ✅ Homepage loads with anime
- ✅ Search functionality works
- ✅ Video player at `/watch/[id]` works
- ✅ Episode selection loads properly
- ✅ Quality selector functions
- ✅ Watchlist saves data (uses browser localStorage)
- ✅ Error handling shows fallback anime if API slow
- ✅ Mobile responsive on all breakpoints

### Performance Targets
- ✅ Homepage load: < 2 seconds
- ✅ Video player load: < 3 seconds
- ✅ Episode load: < 1 second per page
- ✅ Lighthouse Score: > 80

---

## Monitoring After Deployment

### Vercel Dashboard
- **Project** → **Overview** shows:
  - Last deployment status
  - Build time
  - Function calls
  - Bandwidth usage (free tier: 100GB/month)
  - Viewer analytics

### GitHub Actions (Optional)
- Can set up CI/CD pipeline to run tests before deploy
- Currently: Direct deploy on every push

### Error Monitoring
- Check Vercel **Functions** tab for any API errors
- Check browser console for client-side errors
- Monitor API response times from Jikan API

---

## Rollback/Revert Changes

If deployment has issues:

1. **On Vercel Dashboard:**
   - Project → Deployments
   - Find previous working deployment
   - Click **"Promote to Production"**

2. **Or use Git:**
   ```bash
   git revert HEAD
   git push origin main
   # Vercel auto-deploys the reverted version
   ```

---

## Environment Variables (If Needed in Future)

Create `.env.local` for local development:
```
NEXT_PUBLIC_API_BASE=https://api.jikan.moe/v4
NEXT_PUBLIC_API_TIMEOUT=8000
```

For Vercel, add in **Settings** → **Environment Variables**:
- Key: `NEXT_PUBLIC_API_BASE`
- Value: `https://api.jikan.moe/v4`

---

## Live URLs After Deployment

### Development (Current)
- Dev Preview: `https://desert-bound-elephant.3000.dev.raccoonai.tech`
- Status: Running locally, expires after 24 hours

### Production (After Vercel Deploy)
- Vercel URL: `https://anivortex.vercel.app` (or assigned name)
- Status: Live, permanent, auto-updated on GitHub push
- Availability: 99.95% SLA (Vercel guarantee)
- CDN: Global (fast access from anywhere)

### Custom Domain (Optional)
- Custom URL: `https://anivortex.com` (if configured)
- Status: Points to Vercel deployment
- Setup: Add DNS records from Vercel

---

## Troubleshooting

### Issue: Build fails on Vercel
**Solution:** 
- Check Vercel build logs for errors
- Verify `npm run build` works locally
- Check TypeScript compilation: `npx tsc --noEmit`
- Ensure all imports are correct

### Issue: Anime not loading on production
**Solution:**
- Jikan API is public (no auth needed)
- Check Network tab in browser DevTools
- Verify API timeout is 8 seconds (as configured)
- Check if API is rate-limited (very unlikely on Vercel)

### Issue: Video player showing blank
**Solution:**
- Verify episode data loads (check Network tab)
- Check if VidSrc.me embed is accessible
- Try incognito mode (some extensions block embeds)
- Fallback to 9Anime embed should work

### Issue: Pages not found (404)
**Solution:**
- Verify routes exist: `app/page.tsx`, `app/watch/[id]/page.tsx`, etc.
- Check `next.config.ts` for route configuration
- Rebuild on Vercel: Project → **Redeploy**

---

## Success Criteria

Your deployment is **successful** when:

1. ✅ GitHub repository created with all files
2. ✅ Vercel project imported and deployed
3. ✅ Production URL is live and public
4. ✅ Homepage loads instantly with anime data
5. ✅ Video player page accessible at `/watch/[id]`
6. ✅ Episode streaming embeds work
7. ✅ Mobile responsive on all devices
8. ✅ No errors in Vercel Function logs
9. ✅ Anime loads even if API is slow (fallback shows mock data)

---

## Next Steps After Deployment

1. **Share the link:**
   - Production URL ready to share: `https://anivortex.vercel.app`
   - Send to friends/community

2. **Monitor performance:**
   - Check Vercel Analytics
   - Monitor API response times
   - Track user engagement

3. **Add features (Future):**
   - User authentication (Supabase/Auth0)
   - Comment system
   - Rating/review functionality
   - Recommendation engine
   - Offline support (Service Workers)

4. **Optimize performance:**
   - Image optimization (Next.js Image component)
   - Code splitting improvements
   - Caching strategies
   - Database for user data (if adding auth)

---

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **GitHub Help:** https://docs.github.com
- **Jikan API Docs:** https://jikan.moe/
- **Tailwind CSS:** https://tailwindcss.com/docs

---

**Created:** 2026-05-15
**Project:** AniVortex v1.0
**Status:** Ready for Production Deployment ✅
