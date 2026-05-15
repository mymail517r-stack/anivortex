'use client';

import { Globe, Volume2, Subtitles } from 'lucide-react';

interface HindiStreamingInfoProps {
  animeTitle: string;
  currentLanguage?: string;
}

export default function HindiStreamingInfo({ 
  animeTitle, 
  currentLanguage = 'Hindi' 
}: HindiStreamingInfoProps) {
  const hindiDubSources = [
    {
      name: 'HiAnime',
      icon: '🎬',
      description: 'Hindi Dubbed & Subtitled',
      url: 'https://hianime.to',
      quality: 'HD'
    },
    {
      name: '9Anime',
      icon: '📺',
      description: 'Multi-language with Hindi',
      url: 'https://9anime.to',
      quality: '720p-1080p'
    },
    {
      name: 'VidSrc',
      icon: '🎥',
      description: 'Multiple Sources & Embeds',
      url: 'https://vidsrc.me',
      quality: 'Variable'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Language & Audio Options */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Volume2 size={20} className="text-red-300" />
          <h3 className="text-lg font-bold text-white">🎤 Hindi Audio Available</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {['Hindi Dubbed', 'Hindi Subtitled', 'English Dubbed', 'Japanese + Hindi Sub'].map((option) => (
            <button
              key={option}
              className="bg-red-700 hover:bg-red-600 text-white text-sm font-semibold py-2 px-3 rounded transition"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Streaming Sources */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={20} className="text-blue-400" />
          <h3 className="text-lg font-bold text-white">📡 Hindi Streaming Sources</h3>
        </div>

        <div className="space-y-3">
          {hindiDubSources.map((source) => (
            <a
              key={source.name}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition group"
            >
              <div>
                <p className="font-bold text-white group-hover:text-red-400 transition">
                  {source.icon} {source.name}
                </p>
                <p className="text-sm text-gray-300">{source.description}</p>
              </div>
              <span className="bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold">
                {source.quality}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-900 text-blue-100 p-4 rounded-lg text-sm space-y-2">
        <p>
          <strong>✅ Hindi Dub Support:</strong> Most episodes have Hindi dubbed or subtitled versions available.
        </p>
        <p>
          <strong>🎯 Recommended:</strong> Use HiAnime for the best Hindi dubbing experience with consistent quality.
        </p>
        <p>
          <strong>🔄 Fallback:</strong> If Hindi not available, English dubbed or Japanese with Hindi subtitles.
        </p>
      </div>
    </div>
  );
}
