'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Info } from 'lucide-react';

interface HeroAnime {
  mal_id: number;
  title: string;
  images: { jpg: { large_image_url: string } };
  synopsis?: string;
  episodes: number;
  score: number;
}

export default function HeroSection({ anime }: { anime: HeroAnime | null }) {
  if (!anime) return null;

  const synopsis = anime.synopsis?.substring(0, 200) + '...' || 'An amazing anime waiting to be discovered.';

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg mt-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={anime.images?.jpg?.large_image_url || '/placeholder.png'}
          alt={anime.title}
          fill
          className="object-cover"
          priority
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = '/placeholder.png';
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-12 gap-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 line-clamp-2">
            {anime.title}
          </h1>
          <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 mb-4">
            <span className="flex items-center gap-1">
              <span className="text-red-500">★</span>
              {anime.score?.toFixed(1)}/10
            </span>
            <span>•</span>
            <span>{anime.episodes || '?'} Episodes</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm md:text-base max-w-2xl line-clamp-3">
          {synopsis}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Link
            href={`/anime/${anime.mal_id}`}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded flex items-center gap-2 transition transform hover:scale-105"
          >
            <Play size={20} fill="white" />
            Watch Now
          </Link>
          <Link
            href={`/anime/${anime.mal_id}`}
            className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded flex items-center gap-2 transition border border-white/30"
          >
            <Info size={20} />
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
}
