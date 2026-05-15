'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getAnimeDetails, getAnimeEpisodes } from '@/lib/api';
import { Heart, Play, ChevronLeft } from 'lucide-react';
import { useAnimeStore } from '@/lib/store';
import { useParams } from 'next/navigation';

interface AnimeDetail {
  mal_id: number;
  title: string;
  images: { jpg: { large_image_url: string } };
  synopsis: string;
  episodes: number;
  score: number;
  genres: { name: string }[];
  studios: { name: string }[];
  aired: { from: string };
  status: string;
  rating: string;
}

interface Episode {
  mal_id: number;
  url: string;
  title: string;
  title_japanese: string;
  aired: string;
  score: number;
  filler: boolean;
}

export default function AnimeDetail() {
  const params = useParams();
  const id = params.id as string;
  const [anime, setAnime] = useState<AnimeDetail | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [episodePage, setEpisodePage] = useState(1);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useAnimeStore();
  const inWatchlist = isInWatchlist(Number(id));

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        const detail = await getAnimeDetails(Number(id));
        setAnime(detail);

        const eps = await getAnimeEpisodes(Number(id), 1);
        setEpisodes(eps || []);
      } catch (error) {
        console.error('Error loading anime details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id]);

  const handleLoadMoreEpisodes = async () => {
    try {
      const nextPage = episodePage + 1;
      const eps = await getAnimeEpisodes(Number(id), nextPage);
      if (eps && eps.length > 0) {
        setEpisodes(prev => [...prev, ...eps]);
        setEpisodePage(nextPage);
      }
    } catch (error) {
      console.error('Error loading more episodes:', error);
    }
  };

  const handleWatchlistToggle = () => {
    if (anime) {
      if (inWatchlist) {
        removeFromWatchlist(anime.mal_id);
      } else {
        addToWatchlist({
          id: anime.mal_id,
          title: anime.title,
          image: anime.images?.jpg?.large_image_url || '',
          progress: 0,
        });
      }
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="flex items-center justify-center h-96 mt-20">
          <div className="text-red-500 text-xl">Loading...</div>
        </div>
      </main>
    );
  }

  if (!anime) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="flex items-center justify-center h-96 mt-20">
          <div className="text-gray-400 text-xl">Anime not found</div>
        </div>
      </main>
    );
  }

  const year = anime.aired?.from ? new Date(anime.aired.from).getFullYear() : 'N/A';

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-16">
        <Image
          src={anime.images?.jpg?.large_image_url || '/placeholder.png'}
          alt={anime.title}
          fill
          className="object-cover"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = '/placeholder.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="absolute bottom-8 left-8 right-8 max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-red-400 mb-4 transition"
          >
            <ChevronLeft size={20} />
            Back
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24 relative z-10 mb-12">
          {/* Poster */}
          <div className="md:col-span-1 flex justify-center">
            <div className="relative w-64 h-96 rounded-lg overflow-hidden shadow-2xl border border-red-600/30">
              <Image
                src={anime.images?.jpg?.large_image_url || '/placeholder.png'}
                alt={anime.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {anime.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-300 mb-6">
              <span className="flex items-center gap-1">
                <span className="text-red-500">★</span>
                {anime.score?.toFixed(1)}/10
              </span>
              <span>•</span>
              <span>{anime.episodes || '?'} Episodes</span>
              <span>•</span>
              <span>{year}</span>
              <span>•</span>
              <span className="text-red-400">{anime.status}</span>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-400 mb-2">GENRES</h3>
              <div className="flex flex-wrap gap-2">
                {anime.genres?.map((genre) => (
                  <span
                    key={genre.name}
                    className="bg-red-950/50 text-red-300 px-3 py-1 rounded-full text-sm border border-red-600/30"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-400 mb-2">STUDIOS</h3>
              <div className="flex flex-wrap gap-2">
                {anime.studios?.map((studio) => (
                  <span key={studio.name} className="text-gray-300">
                    {studio.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href={`/watch/${anime.mal_id}`}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition"
              >
                <Play size={20} fill="white" />
                Watch Now
              </Link>
              <button
                onClick={handleWatchlistToggle}
                className={`flex items-center gap-2 font-bold py-3 px-6 rounded transition border ${
                  inWatchlist
                    ? 'bg-red-600 text-white hover:bg-red-700 border-red-600'
                    : 'bg-transparent text-red-400 hover:bg-red-950/50 border-red-500/50'
                }`}
              >
                <Heart size={20} fill={inWatchlist ? 'white' : 'none'} />
                {inWatchlist ? 'In Watchlist' : 'Add to List'}
              </button>
            </div>
          </div>
        </div>

        {/* Synopsis */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
          <p className="text-gray-300 leading-relaxed text-justify">
            {anime.synopsis}
          </p>
        </div>

        {/* Episodes */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Episodes ({anime.episodes || 0})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {episodes.map((episode) => (
              <div
                key={episode.mal_id}
                className="bg-red-950/10 border border-red-900/30 hover:border-red-500/50 rounded-lg p-4 hover:bg-red-950/20 transition cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-white group-hover:text-red-400 transition">
                      Episode {episode.mal_id}
                    </h3>
                    <p className="text-sm text-gray-400">{episode.title}</p>
                    {episode.title_japanese && (
                      <p className="text-xs text-gray-500 mt-1">{episode.title_japanese}</p>
                    )}
                  </div>
                  {episode.score > 0 && (
                    <span className="text-yellow-500 font-bold text-sm ml-2">
                      {episode.score.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{episode.aired || 'TBA'}</span>
                  {episode.filler && (
                    <span className="bg-blue-600/30 text-blue-300 px-2 py-1 rounded text-xs">
                      Filler
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {episodes.length > 0 && episodes.length < (anime.episodes || 0) && (
            <button
              onClick={handleLoadMoreEpisodes}
              className="w-full mt-6 bg-red-950/50 hover:bg-red-950/70 border border-red-600/50 text-red-400 font-bold py-3 px-6 rounded transition"
            >
              Load More Episodes
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
