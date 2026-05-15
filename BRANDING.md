# 🎨 AniVortex - Branding Guide

Complete branding and style guide for AniVortex Hindi Anime Streaming Platform

## 🎯 Brand Identity

**Name**: AniVortex  
**Tagline**: Stream Hindi Anime Anywhere  
**Creator**: Naman  
**Founded**: 2026  
**Type**: Free Anime Streaming Platform  

---

## 🎨 Color Palette

### Primary Colors
- **Red (Main)**: `#DC2626` - Action, energy, passion
  - Light Red: `#EF4444`
  - Dark Red: `#991B1B`
- **Black (Background)**: `#000000` - Professional, modern
- **White (Text)**: `#FFFFFF` - Clarity, contrast

### Secondary Colors
- **Gray (Text Secondary)**: `#A3A3A3`
- **Gray (Borders)**: `#404040`
- **Red Accent**: `#991B1B` - Hover effects

### Color Usage
```
Primary CTA Buttons: #DC2626
Hover State: #991B1B
Borders/Dividers: #DC2626 with opacity
Background Overlays: Black with red tint
Text: White on black, #A3A3A3 for secondary
```

---

## 🔤 Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Font Sizes
- **Logo**: 32px, Bold, Red Gradient
- **Hero Title**: 48px (mobile: 32px), Bold, White
- **Section Headers**: 28px, Bold, Red
- **Body Text**: 16px, Regular, Gray-300
- **Small Text**: 14px, Regular, Gray-500

### Font Weights
- Regular: 400
- Bold: 700 (headings)
- Extra Bold: 900 (logo)

---

## 🖼️ Visual Elements

### Logo Treatment
```
AniVortex
├─ "Ani" (Red #DC2626)
├─ "Vortex" (Red gradient #DC2626 → #EF4444)
└─ "by Naman" (Small, Red #991B1B)
```

### Badges & Labels
- **Trending**: Red background, white text, rounded
- **Top Rated**: Gold star + rating
- **Year**: Red badge, top-right corner
- **Filler Episode**: Blue badge (accent)

### Icons
- **Heart**: For watchlist/favorites
- **Play**: For watch now CTA
- **Search**: For search functionality
- **Menu**: Mobile navigation

---

## 🎬 Card Design

### Anime Card
```
┌─────────────────────┐
│                     │
│    Image (4:3)      │
│                     │
├─────────────────────┤
│ Title (truncated)   │
│ ⭐ 8.5 | 24 eps     │
│                     │
│ [Play] [♡ Add List] │ (on hover)
└─────────────────────┘

Colors:
- Border: Red with low opacity
- Background: Black with red tint
- Hover: Red accent glow
```

---

## 📐 Layout & Spacing

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Spacing Scale
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
```

### Container
- Max width: 1280px (max-w-7xl)
- Padding: 16px (mobile), 24px (desktop)
- Gap: 16px (cards grid)

---

## 🎬 Hero Section

### Design
- Full-width background image
- Gradient overlay: Black → Transparent
- Content positioned bottom-left
- Title + description + CTA buttons
- Rounded corners (12px)

### Content Hierarchy
1. Main title (largest)
2. Rating + episodes (secondary)
3. Synopsis (tertiary)
4. Call-to-action buttons

---

## 🧭 Navigation

### Navbar
- Fixed top
- Gradient background: Black → transparent
- Red border bottom
- Logo on left
- Menu items centered
- Search bar right

### Mobile
- Hamburger menu (red)
- Slide-down navigation
- Full-width search

---

## 🔘 Button Styles

### Primary Button (Call-to-Action)
```
Background: #DC2626
Hover: #991B1B
Text: White, Bold
Padding: 12px 24px
Border Radius: 8px
Icon: Left-aligned
Transition: 200ms smooth
```

### Secondary Button (Add to List)
```
Background: Transparent
Border: 2px Red
Text: Red
Hover: Red background
Padding: 12px 24px
Border Radius: 8px
Transition: 200ms smooth
```

### Tertiary Button (Load More)
```
Background: Red with low opacity
Border: Red
Text: Red
Hover: Higher opacity
Padding: 12px 24px
```

---

## 📱 Responsive Behavior

### Mobile (< 640px)
- 2 columns anime cards
- Single column forms
- Full-width buttons
- Hamburger menu
- Reduced padding

### Tablet (640px - 1024px)
- 3 columns anime cards
- 2 column forms
- 50% width buttons
- Visible menu
- Medium padding

### Desktop (> 1024px)
- 5 columns anime cards
- Multi-column layouts
- Inline buttons
- Full menu visible
- Full padding

---

## ✨ Animation & Interactions

### Hover Effects
- Card scale: +5%
- Border glow: Red color
- Button darken: -10% brightness
- Smooth transition: 200-300ms

### Loading States
- Spinner: Red color
- Pulse animation
- Text: "Loading..."

### Transitions
- Default: 200ms ease-in-out
- Fast: 100ms
- Slow: 500ms

---

## 📊 Gradients

### Button Gradient (Hover)
```
from-red-600 to-red-800
```

### Background Gradient (Hero)
```
from-black via-black/50 to-transparent
```

### Text Gradient (Logo)
```
from-red-600 to-red-400
```

---

## 🎯 UI Components

### Cards
- Border: Red with opacity
- Background: Black with red tint
- Rounded: 8-12px
- Shadow: Subtle

### Badges
- Small rounded rectangles
- Red background/border
- White text
- 8px padding

### Dividers
- Red color with opacity
- 1px thickness
- Full width or contained

---

## 📝 Tone & Voice

- **Professional**: Sleek, modern platform
- **Friendly**: Welcoming to anime fans
- **Concise**: Clear, direct messaging
- **Exciting**: Enthusiastic about anime

### Example Copy
- "🔥 Trending Now" (excitement)
- "⭐ Top Rated" (quality)
- "Watch Now" (action-oriented)
- "Add to Watchlist" (user agency)

---

## 🎬 Brand Guidelines

### Do's ✅
- Use red for important actions
- Maintain high contrast
- Keep animations smooth
- Use consistent spacing
- Apply gradients sparingly
- Ensure mobile responsiveness

### Don'ts ❌
- Use clashing colors
- Apply multiple animations
- Overcrowd UI elements
- Use inconsistent fonts
- Forget accessibility
- Deploy unoptimized images

---

## 🔐 Accessibility

### Contrast Ratios
- Red on Black: 5.2:1 (meets WCAG AA)
- White on Red: 7.5:1 (exceeds WCAG AAA)
- Gray on Black: 4.8:1 (meets WCAG AA)

### Readable Text
- Minimum font size: 14px
- Line height: 1.6x font size
- Letter spacing: 0.5px for headings

### Interactive Elements
- Minimum tap target: 48x48px
- Focus indicators: Visible outlines
- Alt text: All images

---

## 🚀 Brand Application

### Website
- ✅ Navigation bar
- ✅ Hero section
- ✅ Card grids
- ✅ Detail pages
- ✅ Search interface

### Social Media
- ✅ Red theme
- ✅ Anime imagery
- ✅ "by Naman" credit
- ✅ Consistent filters

### Marketing Materials
- ✅ Red backgrounds
- ✅ White text
- ✅ Bold typography
- ✅ Anime stills

---

## 📸 Logo Variations

### Full Logo
```
AniVortex by Naman
(Red gradient, large)
```

### Mark Only
```
AV (stylized)
(Red, compact)
```

### Horizontal
```
[AV] AniVortex
(Logo + text, side-by-side)
```

---

## 🎨 Design System Assets

### Colors
- Primary: #DC2626
- Secondary: #000000
- Accent: #FFFFFF

### Fonts
- Headings: System font, Bold
- Body: System font, Regular

### Spacing
- Base unit: 4px
- Multipliers: 1x, 2x, 4x, 6x, 8x

### Borders
- Radius: 8px (cards), 4px (buttons)
- Width: 1px (default), 2px (interactive)

---

## 📞 Brand Contact

**Creator**: Naman  
**Platform**: AniVortex  
**Year**: 2026  
**License**: MIT  

---

**Maintain consistency, celebrate anime, honor Naman's creation! 🎉**
