// Streaming and Episode Resolution Service
// Uses multiple free sources for reliable anime episode access

const STREAMING_SOURCES = {
  // Primary sources - use direct embeds
  vidsrc: (animeId: number, episode: number) => 
    `https://vidsrc.me/embed/anime?id=${animeId}&episode=${episode}`,
  
  // Alternative embed sources
  vidStreaming: (animeTitle: string, episode: number) =>
    `https://api.consumet.org/utils/embed?url=gogoanime/${animeTitle.toLowerCase().replace(/\s+/g, '-')}-${episode}`,
};

// Get working episode stream URL
export const getWorkingStreamUrl = (animeId: number, episodeNumber: number): string => {
  return STREAMING_SOURCES.vidsrc(animeId, episodeNumber);
};

// Get alternative stream if primary fails
export const getAlternativeStreamUrl = (animeTitle: string, episodeNumber: number): string => {
  return `https://9anime.to/watch/${animeTitle.toLowerCase().replace(/\s+/g, '-')}?ep=${episodeNumber}`;
};

// Get Hindi dub stream
export const getHindiDubStreamUrl = (animeTitle: string, episodeNumber: number): string => {
  return `https://hianime.to/watch/${animeTitle.toLowerCase().replace(/\s+/g, '-')}?ep=${episodeNumber}`;
};

export default {
  getWorkingStreamUrl,
  getAlternativeStreamUrl,
  getHindiDubStreamUrl,
};
