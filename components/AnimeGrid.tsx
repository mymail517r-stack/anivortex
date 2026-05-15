'use client';

import { useState, useEffect, useCallback } from 'react';
import AnimeCard from './AnimeCard';
import { Loader, AlertCircle, RotateCcw } from 'lucide-react';

interface Anime {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string } };
  score: number;
  episodes: number;
  year: number;
}

interface AnimeGridProps {
  fetchFunction: (page: number) => Promise<Anime[]>;
  title: string;
}

export default function AnimeGrid({ fetchFunction, title }: AnimeGridProps) {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const loadAnimes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFunction(page);
      if (!data || data.length === 0) {
        if (page === 1) {
          setError('No anime found. Please try again later.');
        }
        setHasMore(false);
        setAnimes(prev => page === 1 ? [] : prev);
      } else {
        if (page === 1) {
          setAnimes(data);
        } else {
          setAnimes(prev => [...prev, ...data]);
        }
        setHasMore(data.length > 0);
        setRetryCount(0);
      }
    } catch (error) {
      console.error('Error loading animes:', error);
      setError('Failed to load anime. Retrying...');
      if (retryCount < 2) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => loadAnimes(), 2000);
      } else {
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }, [page, fetchFunction, retryCount]);

  useEffect(() => {
    loadAnimes();
  }, [loadAnimes]);

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-white mb-6">
        <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-950/50 border border-red-600/50 rounded-lg flex items-center gap-3">
          <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
          <span className="text-red-300">{error}</span>
          <button
            onClick={() => {
              setRetryCount(0);
              loadAnimes();
            }}
            className="ml-auto flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
          >
            <RotateCcw size={16} />
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        {animes.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            id={anime.mal_id}
            title={anime.title}
            image={anime.images?.jpg?.image_url || ''}
            score={anime.score || 0}
            episodes={anime.episodes || 0}
            year={anime.year || new Date().getFullYear()}
          />
        ))}
      </div>

      {loading && animes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Loader className="animate-spin text-red-500" size={40} />
          <p className="text-gray-400">Loading anime...</p>
        </div>
      )}

      {loading && animes.length > 0 && (
        <div className="flex justify-center py-8">
          <Loader className="animate-spin text-red-500" size={32} />
        </div>
      )}

      {hasMore && !loading && animes.length > 0 && (
        <button
          onClick={() => setPage(p => p + 1)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition mb-8"
        >
          Load More
        </button>
      )}

      {!hasMore && animes.length > 0 && (
        <p className="text-center text-gray-400 py-8">No more anime to load</p>
      )}

      {!loading && animes.length === 0 && !error && (
        <p className="text-center text-gray-400 py-12">No anime available</p>
      )}
    </div>
  );
}
