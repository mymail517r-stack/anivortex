'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Play } from 'lucide-react';
import { useAnimeStore } from '@/lib/store';

interface AnimeCardProps {
  id: number;
  title: string;
  image: string;
  score: number;
  episodes: number;
  year: number;
}

export default function AnimeCard({ id, title, image, score, episodes, year }: AnimeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useAnimeStore();
  const inWatchlist = isInWatchlist(id);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWatchlist) {
      removeFromWatchlist(id);
    } else {
      addToWatchlist({
        id,
        title,
        image,
        progress: 0,
      });
    }
  };

  return (
    <Link href={`/anime/${id}`}>
      <div
        className="group relative bg-red-950/20 rounded-lg overflow-hidden border border-red-900/30 hover:border-red-500/50 transition-all duration-300 cursor-pointer h-80"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative w-full h-64 overflow-hidden bg-gray-900">
          <Image
            src={image || '/placeholder.png'}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = '/placeholder.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 h-28 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm line-clamp-2 text-white group-hover:text-red-400 transition">
              {title}
            </h3>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              {score?.toFixed(1) || 'N/A'}
            </span>
            <span>{episodes || 0} eps</span>
          </div>
        </div>

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-red-950/50 to-transparent flex flex-col justify-end p-4 gap-3">
            <Link
              href={`/watch/${id}`}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 transition"
            >
              <Play size={18} fill="white" />
              Watch Now
            </Link>
            <button
              onClick={handleWatchlistToggle}
              className={`w-full py-2 px-4 rounded font-bold transition flex items-center justify-center gap-2 ${
                inWatchlist
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-red-950/50 text-red-400 hover:bg-red-900/50 border border-red-500/50'
              }`}
            >
              <Heart size={18} fill={inWatchlist ? 'white' : 'none'} />
              {inWatchlist ? 'In Watchlist' : 'Add to List'}
            </button>
          </div>
        )}

        {/* Year Badge */}
        <div className="absolute top-2 right-2 bg-red-600/90 text-white text-xs px-2 py-1 rounded font-bold">
          {year}
        </div>
      </div>
    </Link>
  );
}
