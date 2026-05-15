'use client';

import Link from 'next/link';
import { Star, Play } from 'lucide-react';

interface AnimeCardProps {
  anime: any;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  // Handle both full anime objects and watchlist items
  const imageUrl = 
    anime?.images?.jpg?.large_image_url ||
    anime?.images?.jpg?.image_url ||
    anime?.image || // fallback for watchlist items
    `https://via.placeholder.com/225x318?text=${encodeURIComponent(anime?.title || 'Anime')}&bg=222&fg=fff`;

  const title = anime?.title || 'Unknown Anime';
  const score = anime?.score || 'N/A';
  const episodes = anime?.episodes || '?';
  
  // Support both mal_id (from API) and id (from watchlist)
  const animeId = anime?.mal_id || anime?.id;

  return (
    <Link href={`/anime/${animeId}`}>
      <div className="group relative overflow-hidden rounded-lg bg-gray-800 hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
        {/* Image Container */}
        <div className="relative w-full aspect-[225/318] bg-gray-700 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://via.placeholder.com/225x318?text=${encodeURIComponent(anime?.title || 'Anime')}&bg=333&fg=666`;
            }}
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                <Star size={14} fill="currentColor" />
                {score}
              </div>
              <Play size={20} className="text-white" fill="white" />
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="p-3 bg-gray-900 group-hover:bg-gray-800 transition">
          <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-red-400 transition">
            {title}
          </h3>
          <p className="text-xs text-gray-400 mt-1">{episodes} episodes</p>
        </div>
      </div>
    </Link>
  );
}
