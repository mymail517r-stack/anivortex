// Streaming service with Tatakai API and multiple fallbacks
import axios from 'axios';

const STREAMING_TIMEOUT = 6000; // 6 second timeout

interface StreamSource {
  url: string;
  quality?: string;
  server?: string;
  type?: string;
}

// Tatakai API - Primary source
export const getTatakaiStreams = async (
  animeId: number,
  episodeNumber: number
): Promise<StreamSource[]> => {
  try {
    const response = await axios.get(
      `https://api.tatakai.work/episode?id=${animeId}&ep=${episodeNumber}`,
      { timeout: STREAMING_TIMEOUT }
    );

    if (response.data?.sources && Array.isArray(response.data.sources)) {
      return response.data.sources.map((source: any) => ({
        url: source.url || source.link,
        quality: source.quality || '720p',
        server: 'Tatakai',
        type: 'embed',
      }));
    }
    return [];
  } catch (error) {
    console.error('Tatakai API error:', error);
    return [];
  }
};

// Consumet API - Fallback source
export const getConsumetStreams = async (
  animeId: number,
  episodeNumber: number
): Promise<StreamSource[]> => {
  try {
    const response = await axios.get(
      `https://api.consumet.org/anime/gogoanime/watch/${animeId}-episode-${episodeNumber}`,
      { timeout: STREAMING_TIMEOUT }
    );

    if (response.data?.sources && Array.isArray(response.data.sources)) {
      return response.data.sources.map((source: any) => ({
        url: source.url,
        quality: source.quality || '720p',
        server: 'Consumet',
        type: 'direct',
      }));
    }
    return [];
  } catch (error) {
    console.error('Consumet API error:', error);
    return [];
  }
};

// VidSrc Embed - Reliable fallback
export const getVidSrcEmbed = (
  animeId: number,
  episodeNumber: number
): StreamSource => {
  return {
    url: `https://vidsrc.me/embed/anime?id=${animeId}&episode=${episodeNumber}`,
    quality: '720p',
    server: 'VidSrc',
    type: 'embed',
  };
};

// 9Anime Embed - Alternative fallback
export const getNineAnimeEmbed = (
  animeId: number,
  episodeNumber: number,
  animeTitle: string
): StreamSource => {
  return {
    url: `https://9anime.to/watch/${animeTitle.toLowerCase().replace(/\s+/g, '-')}?ep=${episodeNumber}`,
    quality: '720p',
    server: '9Anime',
    type: 'link',
  };
};

// HiAnime Embed - Hindi dub option
export const getHiAnimeEmbed = (
  animeId: number,
  episodeNumber: number,
  animeTitle: string
): StreamSource => {
  return {
    url: `https://hianime.to/watch/${animeTitle.toLowerCase().replace(/\s+/g, '-')}?ep=${episodeNumber}`,
    quality: '720p',
    server: 'HiAnime',
    type: 'link',
  };
};

// Get all available streams with fallbacks
export const getAllStreams = async (
  animeId: number,
  episodeNumber: number,
  animeTitle: string
): Promise<StreamSource[]> => {
  const streams: StreamSource[] = [];

  try {
    // Try Tatakai first (primary)
    console.log('Fetching Tatakai streams...');
    const tatakaiStreams = await getTatakaiStreams(animeId, episodeNumber);
    if (tatakaiStreams.length > 0) {
      streams.push(...tatakaiStreams);
      console.log(`✓ Got ${tatakaiStreams.length} Tatakai streams`);
    }
  } catch (error) {
    console.error('Tatakai fetch failed:', error);
  }

  try {
    // Try Consumet as fallback
    if (streams.length === 0) {
      console.log('Fetching Consumet streams...');
      const consumetStreams = await getConsumetStreams(animeId, episodeNumber);
      if (consumetStreams.length > 0) {
        streams.push(...consumetStreams);
        console.log(`✓ Got ${consumetStreams.length} Consumet streams`);
      }
    }
  } catch (error) {
    console.error('Consumet fetch failed:', error);
  }

  // Add embed fallbacks
  streams.push(getVidSrcEmbed(animeId, episodeNumber));
  streams.push(getNineAnimeEmbed(animeId, episodeNumber, animeTitle));
  streams.push(getHiAnimeEmbed(animeId, episodeNumber, animeTitle));

  console.log(`✓ Total streams available: ${streams.length}`);
  return streams;
};

// Get best stream (prefer high quality and direct)
export const getBestStream = async (
  animeId: number,
  episodeNumber: number,
  animeTitle: string
): Promise<StreamSource> => {
  const streams = await getAllStreams(animeId, episodeNumber, animeTitle);

  if (streams.length === 0) {
    // Ultimate fallback
    return getVidSrcEmbed(animeId, episodeNumber);
  }

  // Prefer direct streams over embeds, then prefer high quality
  const directStreams = streams.filter((s) => s.type === 'direct');
  if (directStreams.length > 0) {
    return directStreams.sort(
      (a, b) => (parseInt(b.quality || '0') || 0) - (parseInt(a.quality || '0') || 0)
    )[0];
  }

  // Otherwise return first available
  return streams[0];
};

export default {
  getTatakaiStreams,
  getConsumetStreams,
  getVidSrcEmbed,
  getNineAnimeEmbed,
  getHiAnimeEmbed,
  getAllStreams,
  getBestStream,
};
