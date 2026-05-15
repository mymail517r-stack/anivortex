# 🎬 AniVortex - Hindi Anime Streaming Platform

A Netflix-style anime streaming website featuring Hindi anime content with a sleek red-themed design.

**Made by Naman** ✨

## Features

✨ **Netflix-Style UI**
- Dark theme with red accent colors
- Hero section with featured anime
- Smooth animations and hover effects
- Responsive design for all devices

📺 **Anime Browsing**
- Trending anime feed
- Top-rated anime section
- Advanced search functionality
- Detailed anime information with episodes

❤️ **Watchlist**
- Add/remove anime from your watchlist
- Persistent storage using localStorage
- Track your watching progress

🎨 **Beautiful Design**
- Red color scheme (#DC2626, #EF4444)
- Professional gradient overlays
- Fast loading and smooth transitions

## Tech Stack

- **Frontend**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **API**: Jikan API (MyAnimeList) - Free, no authentication required
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd anivortex

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Setup

Create a `.env.local` file (optional, APIs work without it):

```env
NEXT_PUBLIC_JIKAN_API=https://api.jikan.moe/v4
NEXT_PUBLIC_SITE_NAME=AniVortex
NEXT_PUBLIC_SITE_URL=https://anivortex.vercel.app
```

## API Integration

### Jikan API (MyAnimeList)
- **Base URL**: https://api.jikan.moe/v4
- **Features**:
  - Trending anime
  - Top-rated anime
  - Search functionality
  - Detailed anime information
  - Episode listings
  - Recommendations

**No authentication required!** ✓

## Deployment on Vercel

### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project directory
cd anivortex
vercel

# Follow the prompts to complete deployment
```

### Method 2: GitHub Integration (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: AniVortex anime streaming"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/anivortex.git
git push -u origin main
```

2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Connect your GitHub repository
5. Select the `anivortex` directory (if in monorepo)
6. Click "Deploy"

### Method 3: Direct Upload

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Paste your repository URL
5. Configure build settings (already in `vercel.json`)
6. Deploy

## Build & Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
anivortex/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── anime/
│   │   └── [id]/page.tsx       # Anime detail page
│   ├── search/page.tsx         # Search results
│   ├── watchlist/page.tsx      # Watchlist page
│   ├── trending/page.tsx       # Trending page
│   ├── top-rated/page.tsx      # Top-rated page
│   └── globals.css             # Global styles
├── components/
│   ├── Navbar.tsx              # Navigation bar
│   ├── HeroSection.tsx         # Hero component
│   ├── AnimeCard.tsx           # Anime card component
│   └── AnimeGrid.tsx           # Grid layout component
├── lib/
│   ├── api.ts                  # API integration
│   └── store.ts                # Zustand store
├── public/
│   └── placeholder.png         # Fallback image
├── next.config.ts              # Next.js config
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind config
└── vercel.json                 # Vercel config
```

## Features Explained

### 🔥 Trending Section
Shows currently trending anime based on MyAnimeList scores and popularity.

### ⭐ Top Rated
Displays the highest-rated anime of all time with detailed information.

### 🔍 Search
Full-text search across anime titles and information using Jikan API.

### 📖 Anime Details
- Full synopsis and information
- Episode list with air dates
- Genre and studio information
- Rating and status
- Recommendations

### ❤️ Watchlist
- Add/remove anime
- Track watching progress
- Persists locally in browser
- Export watchlist (future feature)

## Customization

### Change Color Scheme
Edit `tailwind.config.ts` and change red colors:
```typescript
colors: {
  red: {
    600: '#YOUR_COLOR',
    // ... other shades
  }
}
```

### Add More Pages
1. Create new file in `app/[page-name]/page.tsx`
2. Add link in `components/Navbar.tsx`
3. Use existing components for consistency

### Connect Different API
1. Update `lib/api.ts`
2. Modify fetch functions to match new API structure
3. Update components to match new data format

## Performance Tips

✅ Images are optimized with Next.js Image component
✅ Code splitting with dynamic imports
✅ API calls are cached in browser
✅ Lazy loading for episodes list
✅ Responsive images for all devices

## Known Limitations

- Streaming actual videos not available (requires legal agreements)
- Episode links are informational only
- Some anime may have incomplete episode data
- API rate limits: ~60 requests/minute per IP

## Future Enhancements

- [ ] User authentication & profiles
- [ ] Rating system for anime
- [ ] Comments section
- [ ] Advanced filters (year, season, studio)
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Notifications for new episodes

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### API errors
- Check internet connection
- Verify Jikan API is working: https://api.jikan.moe/v4/anime/1
- Clear browser cache

### Build errors
```bash
npm run build
# If still failing:
rm -rf .next node_modules
npm install
npm run build
```

## Support & Contact

- **Creator**: Naman
- **Issues**: Report bugs via GitHub Issues
- **Email**: Contact via GitHub profile

## License

MIT License - Feel free to use for personal and commercial projects

## Deployment Checklist

- [ ] All pages working locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors or warnings
- [ ] Images load correctly
- [ ] API calls working
- [ ] Watchlist saving to localStorage
- [ ] Responsive on mobile, tablet, desktop
- [ ] Meta tags and SEO optimized
- [ ] Environment variables configured

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Jikan API Docs](https://jikan.moe)
- [Vercel Docs](https://vercel.com/docs)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

---

**Enjoy streaming anime with AniVortex! 🎬**
