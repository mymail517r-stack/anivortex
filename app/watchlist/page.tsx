'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import AnimeCard from '@/components/AnimeCard';
import { useAnimeStore } from '@/lib/store';
import { Heart } from 'lucide-react';

interface WatchlistItem {
  id: number;
  title: string;
  image: string;
  progress: number;
}

export default function WatchlistPage() {
  const { watchlist } = useAnimeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="flex items-center justify-center h-96 mt-20">
          <div className="text-red-500 text-xl">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="text-red-500" size={32} fill="red" />
          <h1 className="text-4xl font-bold text-white">My Watchlist</h1>
        </div>

        {watchlist.length > 0 ? (
          <>
            <p className="text-gray-400 mb-8">
              {watchlist.length} anime{watchlist.length === 1 ? '' : 's'} in your watchlist
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {watchlist.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  id={anime.id}
                  title={anime.title}
                  image={anime.image}
                  score={0}
                  episodes={0}
                  year={new Date().getFullYear()}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <Heart className="mx-auto text-red-500/30 mb-4" size={64} />
            <p className="text-gray-400 text-lg mb-4">Your watchlist is empty</p>
            <p className="text-gray-500 mb-8">
              Add anime from the home page to get started!
            </p>
            <a
              href="/"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded transition"
            >
              Explore Anime
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
