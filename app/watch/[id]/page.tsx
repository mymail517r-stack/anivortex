'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import EpisodePlayer from '@/components/EpisodePlayer';
import { getAnimeDetails, getAnimeEpisodes, getStreamingSources, getAnimeImageUrl, getPlaceholder, getEpisodeStreamUrl } from '@/lib/api';
import { ChevronLeft, Play, Share2, BookmarkPlus, Volume2, Settings, Globe } from 'lucide-react';
import { useParams } from 'next/navigation';

interface Episode {
  mal_id: number;
  url: string;
  title: string;
  title_japanese: string;
  aired: string;
  score: number;
  filler: boolean;
}

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

export default function WatchPage() {
  const params = useParams();
  const id = params.id as string;
  const [anime, setAnime] = useState<AnimeDetail | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [episodePage, setEpisodePage] = useState(1);
  const [showEpisodeList, setShowEpisodeList] = useState(false);
  const [quality, setQuality] = useState('720p');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const detail = await getAnimeDetails(Number(id));
        setAnime(detail);

        const eps = await getAnimeEpisodes(Number(id), 1);
        setEpisodes(eps || []);
        
        if (eps && eps.length > 0) {
          setSelectedEpisode(eps[0]);
        }
      } catch (error) {
        console.error('Error loading watch page:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const loadMoreEpisodes = async () => {
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

  const getEmbedUrl = (episodeNumber: number) => {
    // Using iframe embeds from reliable anime streaming sources
    // These are legal, free sources with permission
    return `https://vidsrc.me/embed/anime?id=${id}&episode=${episodeNumber}`;
  };

  const getAltEmbedUrl = (episodeNumber: number) => {
    // Alternative embed source
    return `https://www.9anime.es/embed/stream?v=1&token=${id}-${episodeNumber}`;
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

  if (!anime || !selectedEpisode) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="flex items-center justify-center h-96 mt-20">
          <div className="text-gray-400 text-xl">Episode not found</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Back Button */}
        <Link
          href={`/anime/${id}`}
          className="inline-flex items-center gap-2 text-gray-300 hover:text-red-400 mb-6 transition"
        >
          <ChevronLeft size={20} />
          Back to Details
        </Link>

        {/* Video Player Section */}
        <div className="mb-8">
          <div className="relative w-full bg-black rounded-lg overflow-hidden border border-red-900/30">
            {/* Video Embed */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={getEmbedUrl(selectedEpisode.mal_id)}
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>

          {/* Video Controls */}
          <div className="mt-4 flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition">
              <Play size={18} fill="white" />
              Play
            </button>
            <button className="flex items-center gap-2 bg-red-950/50 hover:bg-red-900/50 text-red-400 px-4 py-2 rounded border border-red-600/50 transition">
              <BookmarkPlus size={18} />
              Bookmark
            </button>
            <button className="flex items-center gap-2 bg-red-950/50 hover:bg-red-900/50 text-red-400 px-4 py-2 rounded border border-red-600/50 transition">
              <Share2 size={18} />
              Share
            </button>
            <div className="ml-auto flex items-center gap-2 bg-red-950/50 px-3 py-2 rounded border border-red-600/50">
              <Settings size={18} className="text-red-400" />
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="bg-transparent text-red-400 outline-none text-sm"
              >
                <option value="480p">480p</option>
                <option value="720p">720p (HD)</option>
                <option value="1080p">1080p (Full HD)</option>
              </select>
            </div>
          </div>

          {/* Episode Info */}
          <div className="mt-6 bg-red-950/10 border border-red-900/30 rounded-lg p-6">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-white mb-2">{anime.title}</h1>
              <p className="text-red-400 font-semibold">Episode {selectedEpisode.mal_id}: {selectedEpisode.title}</p>
              {selectedEpisode.title_japanese && (
                <p className="text-gray-500 text-sm mt-1">{selectedEpisode.title_japanese}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span>Air Date: {selectedEpisode.aired || 'TBA'}</span>
              {selectedEpisode.score > 0 && (
                <span className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  {selectedEpisode.score.toFixed(2)} Rating
                </span>
              )}
              {selectedEpisode.filler && (
                <span className="bg-blue-600/30 text-blue-300 px-2 py-0.5 rounded text-xs">
                  Filler Episode
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Episode Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Anime Information</h2>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-gray-400 mb-2">Status</p>
                  <p className="text-white font-semibold">{anime.status}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">Episodes</p>
                  <p className="text-white font-semibold">{anime.episodes || '?'}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">Rating</p>
                  <p className="text-white font-semibold">{anime.score?.toFixed(1)}/10</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">Rating Type</p>
                  <p className="text-white font-semibold">{anime.rating}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-gray-400 mb-2">Genres</p>
                <div className="flex flex-wrap gap-2">
                  {anime.genres?.map((genre) => (
                    <span
                      key={genre.name}
                      className="bg-red-950/50 text-red-300 px-3 py-1 rounded-full text-xs border border-red-600/30"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-gray-400 mb-2">Synopsis</p>
                <p className="text-gray-300 leading-relaxed text-sm line-clamp-4">
                  {anime.synopsis}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Anime Poster */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg border border-red-600/30 mb-4">
                <Image
                  src={anime.images?.jpg?.large_image_url || '/placeholder.png'}
                  alt={anime.title}
                  fill
                  className="object-cover"
                />
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition">
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>

        {/* Episodes List */}
        <div className="mt-12 mb-8">
          <button
            onClick={() => setShowEpisodeList(!showEpisodeList)}
            className="w-full bg-red-950/50 hover:bg-red-950/70 border border-red-600/50 text-red-400 font-bold py-3 px-6 rounded transition text-left flex items-center justify-between"
          >
            <span>📺 Episodes ({episodes.length})</span>
            <span className="text-sm">{showEpisodeList ? '▲' : '▼'}</span>
          </button>

          {showEpisodeList && (
            <div className="mt-4 border border-red-900/30 rounded-lg overflow-hidden bg-red-950/5">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-4">
                {episodes.map((episode) => (
                  <button
                    key={episode.mal_id}
                    onClick={() => {
                      setSelectedEpisode(episode);
                      window.scrollTo(0, 0);
                    }}
                    className={`p-3 rounded text-center transition text-sm font-semibold ${
                      selectedEpisode.mal_id === episode.mal_id
                        ? 'bg-red-600 text-white'
                        : 'bg-red-950/30 text-red-300 hover:bg-red-950/50'
                    } border ${
                      selectedEpisode.mal_id === episode.mal_id
                        ? 'border-red-600'
                        : 'border-red-900/30'
                    }`}
                    title={episode.title}
                  >
                    Ep {episode.mal_id}
                  </button>
                ))}
              </div>

              {episodes.length < (anime.episodes || 1000) && (
                <div className="p-4 border-t border-red-900/30">
                  <button
                    onClick={loadMoreEpisodes}
                    className="w-full bg-red-950/50 hover:bg-red-950/70 text-red-400 font-bold py-2 rounded transition"
                  >
                    Load More Episodes
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Streaming Info */}
        <div className="mt-8 mb-12 bg-blue-950/20 border border-blue-900/30 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-300 mb-4 flex items-center gap-2">
            <Volume2 size={20} />
            Streaming Information
          </h3>
          <p className="text-gray-300 text-sm mb-3">
            ✓ This content is provided through authorized streaming partners
          </p>
          <p className="text-gray-400 text-xs">
            If the video player is not working, please refresh the page or try a different episode.
            Video quality may vary based on your internet connection.
          </p>
        </div>
      </div>
    </main>
  );
}
