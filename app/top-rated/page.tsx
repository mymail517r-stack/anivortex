'use client';

import Navbar from '@/components/Navbar';
import AnimeGrid from '@/components/AnimeGrid';
import { getTopAnime } from '@/lib/api';

export default function TopRatedPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <AnimeGrid
          fetchFunction={(page) => getTopAnime('tv', page)}
          title="⭐ Top Rated Anime"
        />
      </div>
    </main>
  );
}
