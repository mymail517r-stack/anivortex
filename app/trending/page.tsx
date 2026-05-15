'use client';

import Navbar from '@/components/Navbar';
import AnimeGrid from '@/components/AnimeGrid';
import { getTrendingAnime } from '@/lib/api';

export default function TrendingPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <AnimeGrid
          fetchFunction={getTrendingAnime}
          title="🔥 Trending Anime"
        />
      </div>
    </main>
  );
}
