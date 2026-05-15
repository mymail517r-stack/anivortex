'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AnimeGrid from '@/components/AnimeGrid';
import { getTrendingAnime, getTopAnime } from '@/lib/api';

interface Anime {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string; large_image_url: string } };
  score: number;
  episodes: number;
  year: number;
  synopsis?: string;
}

export default function Home() {
  const [heroAnime, setHeroAnime] = useState<Anime | null>(null);

  useEffect(() => {
    const loadHero = async () => {
      try {
        const trending = await getTrendingAnime(1);
        if (trending && trending.length > 0) {
          setHeroAnime(trending[0]);
        }
      } catch (error) {
        console.error('Error loading hero anime:', error);
      }
    };

    loadHero();
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Hero Section */}
        <HeroSection anime={heroAnime} />

        {/* Trending Section */}
        <div className="mt-16">
          <AnimeGrid
            fetchFunction={getTrendingAnime}
            title="🔥 Trending Now"
          />
        </div>

        {/* Top Rated Section */}
        <div className="mt-16 pb-12">
          <AnimeGrid
            fetchFunction={(page) => getTopAnime('tv', page)}
            title="⭐ Top Rated"
          />
        </div>
      </div>
    </main>
  );
}
