'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AnimeCard from '@/components/AnimeCard';
import { searchAnime } from '@/lib/api';
import { Loader, Search as SearchIcon } from 'lucide-react';

interface Anime {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string } };
  score: number;
  episodes: number;
  year: number;
}

function SearchContent() {
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const data = await searchAnime(searchInput);
      setResults(data || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-12">
        <div className="flex gap-2 bg-red-950/20 rounded-lg px-4 py-3 border border-red-900/30 hover:border-red-500/50 transition">
          <SearchIcon className="text-red-500" size={24} />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search anime..."
            className="bg-transparent outline-none text-lg w-full text-white placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader className="animate-spin text-red-500" size={40} />
        </div>
      ) : results.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold text-white mb-6">
            Results <span className="text-red-500">({results.length})</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {results.map((anime) => (
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
        </>
      ) : hasSearched ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            {searchInput ? `No results found for "${searchInput}"` : 'Try searching for an anime'}
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <SearchIcon className="mx-auto text-red-500/30 mb-4" size={64} />
          <p className="text-gray-400 text-lg">Search for your favorite anime</p>
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <SearchContent />
      </div>
    </main>
  );
}
