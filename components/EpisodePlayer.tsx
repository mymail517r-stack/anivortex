'use client';

import { useState } from 'react';
import { Play, ExternalLink, RefreshCw } from 'lucide-react';

interface EpisodePlayerProps {
  animeId: string;
  episodeNumber: number;
  animeTitle: string;
}

export default function EpisodePlayer({
  animeId,
  episodeNumber,
  animeTitle
}: EpisodePlayerProps) {
  const [selectedSource, setSelectedSource] = useState<'vidsrc' | 'nineanime'>('vidsrc');
  const [refreshKey, setRefreshKey] = useState(0);

  const streamUrls = {
    vidsrc: `https://vidsrc.me/embed/anime?id=${animeId}&episode=${episodeNumber}`,
    nineanime: `https://9anime.to/watch/${animeId}?ep=${episodeNumber}`
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-4">
      {/* Source Selector */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-sm font-bold text-gray-200 mb-3 flex items-center gap-2">
          <Play size={16} /> Select Streaming Source
        </h3>
        
        <div className="flex gap-2 flex-wrap">
          {[
            { id: 'vidsrc', name: 'VidSrc (Recommended)', emoji: '🎬' },
            { id: 'nineanime', name: '9Anime (Alternative)', emoji: '📺' }
          ].map((source) => (
            <button
              key={source.id}
              onClick={() => setSelectedSource(source.id as 'vidsrc' | 'nineanime')}
              className={`px-4 py-2 rounded font-semibold transition flex items-center gap-2 ${
                selectedSource === source.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-100 hover:bg-gray-600'
              }`}
            >
              <span>{source.emoji}</span>
              {source.name}
            </button>
          ))}
        </div>
      </div>

      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        className="bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 py-2 rounded font-semibold transition flex items-center gap-2"
      >
        <RefreshCw size={16} /> Refresh Stream
      </button>

      {/* Video Player */}
      {selectedSource === 'vidsrc' ? (
        <div
          key={refreshKey}
          className="relative w-full bg-black rounded-lg overflow-hidden"
          style={{ paddingBottom: '56.25%' }}
        >
          <iframe
            src={streamUrls.vidsrc}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen={true}
            allow="autoplay; encrypted-media; fullscreen"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-gray-300 mb-4">
            Opening 9Anime for {animeTitle} - Episode {episodeNumber}
          </p>
          <a
            href={streamUrls.nineanime}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            <ExternalLink size={20} /> Watch on 9Anime →
          </a>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-900 text-blue-100 p-4 rounded-lg text-sm">
        <p>
          <strong>📺 Episode {episodeNumber}:</strong> {animeTitle}
        </p>
        <p className="text-xs text-blue-200 mt-2">
          If the video doesn't load, try refreshing or switching to the alternative source (9Anime).
          Both sources support Hindi audio when available.
        </p>
      </div>
    </div>
  );
}
