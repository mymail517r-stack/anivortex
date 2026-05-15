'use client';

import { useState } from 'react';
import { getAnimeStreams, getStreamingLinks } from '@/lib/api';

interface StreamingSource {
  name: string;
  url: string;
  type: 'embed' | 'streaming';
  language: string;
}

interface StreamingSelectorProps {
  animeTitle: string;
  episodeNumber: number;
  animeId?: string;
}

export default function StreamingSelector({
  animeTitle,
  episodeNumber,
  animeId
}: StreamingSelectorProps) {
  const [selectedSource, setSelectedSource] = useState<StreamingSource | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sources, setSources] = useState<StreamingSource[]>([
    {
      name: 'VidSrc (Hindi/English)',
      url: `https://vidsrc.me/embed/anime?title=${encodeURIComponent(animeTitle)}&ep=${episodeNumber}`,
      type: 'embed',
      language: 'Hindi/English'
    },
    {
      name: '9Anime (Hindi/English)',
      url: `https://9anime.to/search?keyword=${encodeURIComponent(animeTitle)}`,
      type: 'streaming',
      language: 'Hindi/English'
    },
    {
      name: 'HiAnime (Hindi Dub)',
      url: `https://hianime.to/search?keyword=${encodeURIComponent(animeTitle)}`,
      type: 'streaming',
      language: 'Hindi Dub'
    }
  ]);

  const handleSelectSource = async (source: StreamingSource) => {
    setLoading(true);
    setError(null);
    try {
      setSelectedSource(source);
    } catch (err) {
      setError('Failed to load stream. Please try another source.');
      console.error('Stream error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Source Selection */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-bold text-white mb-4">📺 Select Streaming Source</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {sources.map((source) => (
            <button
              key={source.name}
              onClick={() => handleSelectSource(source)}
              className={`p-3 rounded-lg font-semibold transition ${
                selectedSource?.name === source.name
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-100 hover:bg-gray-600'
              }`}
            >
              {source.name}
              <br />
              <span className="text-xs">{source.language}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900 text-red-100 p-4 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-gray-800 text-gray-100 p-4 rounded-lg text-center">
          🔄 Loading stream...
        </div>
      )}

      {/* Selected Source Details */}
      {selectedSource && !loading && (
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-300 mb-3">
            📺 Now playing: <strong>{animeTitle}</strong> - Episode {episodeNumber}
          </p>
          <p className="text-gray-400 text-sm mb-4">
            Language: {selectedSource.language}
          </p>
          
          {selectedSource.type === 'embed' ? (
            <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={selectedSource.url}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; encrypted-media"
              />
            </div>
          ) : (
            <a
              href={selectedSource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              🎬 Open in {selectedSource.name} →
            </a>
          )}
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-900 text-blue-100 p-4 rounded-lg text-sm">
        ℹ️ <strong>Hindi Dubbed Content:</strong> Available in HiAnime and 9Anime with Hindi audio tracks. 
        Select your preferred source above to watch with Hindi subtitles or dubbing.
      </div>
    </div>
  );
}
