'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getAnimeImageUrl } from '@/lib/api';
import { Star, Play } from 'lucide-react';

interface AnimeImageCardProps {
  anime: any;
  link?: string;
}

export default function AnimeImageCard({ anime, link = `/anime/${anime.mal_id}` }: AnimeImageCardProps) {
  const imageUrl = getAnimeImageUrl(anime);
  const title = anime.title || 'Unknown';
  const score = anime.score || 'N/A';

  return (
    <Link href={link}>
      <div className="group relative overflow-hidden rounded-lg bg-gray-800 hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Container with Fallback */}
        <div className="relative w-full aspect-[225/318] bg-gray-700">
          {imageUrl && imageUrl !== 'https://via.placeholder.com/225x318?text=Anime&bg=222&fg=fff' ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/225x318?text=Loading&bg=222&fg=999';
              }}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-gray-600 to-gray-800 flex items-center justify-center text-gray-400">
              <span className="text-center px-4">
                <div className="text-4xl mb-2">🎬</div>
                <p className="text-xs">{title}</p>
              </span>
            </div>
          )}

          {/* Overlay */}
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

        {/* Title */}
        <div className="p-3 bg-gray-900 group-hover:bg-gray-800 transition">
          <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-red-400 transition">
            {title}
          </h3>
          {anime.episodes && (
            <p className="text-xs text-gray-400 mt-1">{anime.episodes} episodes</p>
          )}
        </div>
      </div>
    </Link>
  );
}
