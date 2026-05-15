import axios from 'axios';

const JIKAN_API = 'https://api.jikan.moe/v4';
const API_TIMEOUT = 8000; // 8 second timeout

// Mock fallback data with working image URLs
const MOCK_ANIME = [
  {
    mal_id: 52991,
    title: 'Sousou no Frieren',
    images: {
      jpg: {
        image_url: 'https://myanimelist.net/images/anime/1015/138006.jpg',
        small_image_url: 'https://myanimelist.net/images/anime/1015/138006t.jpg',
        large_image_url: 'https://myanimelist.net/images/anime/1015/138006l.jpg'
      },
      webp: {
        image_url: 'https://myanimelist.cdn-dena.com/images/anime/1015/138006.webp'
      }
    },
    score: 9.27,
    episodes: 28,
    year: 2023,
  },
  {
    mal_id: 5114,
    title: 'Fullmetal Alchemist: Brotherhood',
    images: {
      jpg: {
        image_url: 'https://myanimelist.net/images/anime/1208/94745.jpg',
        large_image_url: 'https://myanimelist.net/images/anime/1208/94745l.jpg'
      }
    },
    score: 9.11,
    episodes: 64,
    year: 2009,
  },
  {
    mal_id: 9253,
    title: 'Steins;Gate',
    images: {
      jpg: {
        image_url: 'https://myanimelist.net/images/anime/1935/127974.jpg',
        large_image_url: 'https://myanimelist.net/images/anime/1935/127974l.jpg'
      }
    },
    score: 9.07,
    episodes: 24,
    year: 2011,
  },
  {
    mal_id: 38524,
    title: 'Attack on Titan Season 3 Part 2',
    images: {
      jpg: {
        image_url: 'https://myanimelist.net/images/anime/1517/100633.jpg',
        large_image_url: 'https://myanimelist.net/images/anime/1517/100633l.jpg'
      }
    },
    score: 9.05,
    episodes: 10,
    year: 2019,
  },
];

// Create axios instance with timeout
const axiosInstance = axios.create({
  timeout: API_TIMEOUT,
  headers: { 'User-Agent': 'AniVortex/1.0' }
});

// Get trending anime with working images
export const getTrendingAnime = async (page: number = 1) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/top/anime?type=tv&filter=airing&page=${page}&limit=25`
    );
    
    if (response.data?.data) {
      return response.data.data.map((anime: any) => ({
        mal_id: anime.mal_id,
        title: anime.title,
        images: anime.images || { jpg: { image_url: getPlaceholder() } },
        score: anime.score,
        episodes: anime.episodes,
        year: anime.year,
        status: anime.status,
        synopsis: anime.synopsis,
        aired: anime.aired?.from,
      }));
    }
    return page === 1 ? MOCK_ANIME : [];
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    return page === 1 ? MOCK_ANIME : [];
  }
};

// Get top anime with working images
export const getTopAnime = async (type: string = 'tv', page: number = 1) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/top/anime?type=${type}&page=${page}&limit=25`
    );
    
    if (response.data?.data) {
      return response.data.data.map((anime: any) => ({
        mal_id: anime.mal_id,
        title: anime.title,
        images: anime.images || { jpg: { image_url: getPlaceholder() } },
        score: anime.score,
        episodes: anime.episodes,
        year: anime.year,
        status: anime.status,
      }));
    }
    return page === 1 ? MOCK_ANIME : [];
  } catch (error) {
    console.error('Error fetching top anime:', error);
    return page === 1 ? MOCK_ANIME : [];
  }
};

// Search anime with working images
export const searchAnime = async (query: string) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/anime?query=${encodeURIComponent(query)}&limit=25`
    );
    
    if (response.data?.data) {
      return response.data.data.map((anime: any) => ({
        mal_id: anime.mal_id,
        title: anime.title,
        images: anime.images || { jpg: { image_url: getPlaceholder() } },
        score: anime.score,
        episodes: anime.episodes,
        year: anime.year,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error searching anime:', error);
    return [];
  }
};

// Get anime details with images
export const getAnimeDetails = async (animeId: number) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/anime/${animeId}/full`
    );
    
    if (response.data?.data) {
      const anime = response.data.data;
      return {
        mal_id: anime.mal_id,
        title: anime.title,
        title_english: anime.title_english,
        synopsis: anime.synopsis,
        episodes: anime.episodes,
        score: anime.score,
        scored_by: anime.scored_by,
        rank: anime.rank,
        popularity: anime.popularity,
        status: anime.status,
        aired: anime.aired?.from,
        aired_string: anime.aired?.string,
        genres: anime.genres?.map((g: any) => g.name),
        studios: anime.studios?.map((s: any) => s.name),
        images: anime.images || { jpg: { image_url: getPlaceholder() } },
        images_large: anime.images?.jpg?.large_image_url || getPlaceholder(),
        trailer: anime.trailer,
        rating: anime.rating,
        source: anime.source,
        season: anime.season,
        year: anime.year,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return null;
  }
};

// Get anime episodes (pagination)
export const getAnimeEpisodes = async (animeId: number, page: number = 1) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/anime/${animeId}/episodes?page=${page}`
    );
    
    if (response.data?.data) {
      return response.data.data.map((ep: any) => ({
        mal_id: ep.mal_id,
        url: ep.url,
        title: ep.title || `Episode ${ep.mal_id}`,
        title_japanese: ep.title_japanese,
        title_romanji: ep.title_romanji,
        aired: ep.aired,
        score: ep.score,
        filler: ep.filler,
        recap: ep.recap,
        episode_number: ep.mal_id,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return [];
  }
};

// Get anime by genre
export const getAnimeByGenre = async (genreId: number, page: number = 1) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/anime?genres=${genreId}&order_by=score&sort=desc&page=${page}&limit=25`
    );
    
    if (response.data?.data) {
      return response.data.data.map((anime: any) => ({
        mal_id: anime.mal_id,
        title: anime.title,
        images: anime.images || { jpg: { image_url: getPlaceholder() } },
        score: anime.score,
        episodes: anime.episodes,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching anime by genre:', error);
    return [];
  }
};

// Get anime recommendations
export const getAnimeRecommendations = async (animeId: number) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/anime/${animeId}/recommendations`
    );
    return response.data?.data || [];
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
};

// Get streaming sources
export const getStreamingSources = async (animeId: number) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/anime/${animeId}/full`
    );
    
    const anime = response.data?.data;
    return {
      streaming: anime?.streaming || [],
      trailer: anime?.trailer || {},
      external_links: anime?.external_links || [],
    };
  } catch (error) {
    console.error('Error fetching streaming sources:', error);
    return { streaming: [], trailer: {}, external_links: [] };
  }
};

// Get episode details
export const getEpisodeDetails = async (animeId: number, episodeNumber: number) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/anime/${animeId}/episodes/${episodeNumber}`
    );
    return response.data?.data || null;
  } catch (error) {
    console.error('Error fetching episode details:', error);
    return null;
  }
};

// Get anime image URL with fallback
export const getAnimeImageUrl = (anime: any): string => {
  try {
    return (
      anime?.images?.jpg?.large_image_url ||
      anime?.images?.jpg?.image_url ||
      anime?.images?.webp?.image_url ||
      anime?.coverImage?.extraLarge ||
      anime?.coverImage?.large ||
      getPlaceholder()
    );
  } catch {
    return getPlaceholder();
  }
};

// Get placeholder image
export const getPlaceholder = (): string => {
  return 'https://via.placeholder.com/225x318?text=Anime&bg=222&fg=fff';
};

// Get episode stream URL (free sources)
export const getEpisodeStreamUrl = (animeId: number, episodeNumber: number): string => {
  // Using free anime streaming embed - VidSrc
  return `https://vidsrc.me/embed/anime?id=${animeId}&episode=${episodeNumber}`;
};

// Get alternative episode stream
export const getAlternativeStreamUrl = (animeTitle: string, episodeNumber: number): string => {
  // Alternative: 9Anime search link
  return `https://9anime.to/search?keyword=${encodeURIComponent(animeTitle)}&ep=${episodeNumber}`;
};

// Hindi dub anime search
export const searchHindiDubAnime = async (query: string) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/anime?query=${encodeURIComponent(query)}&limit=10`
    );
    
    if (response.data?.data) {
      return response.data.data.map((anime: any) => ({
        mal_id: anime.mal_id,
        title: anime.title,
        images: anime.images || { jpg: { image_url: getPlaceholder() } },
        score: anime.score,
        episodes: anime.episodes,
        synopsis: anime.synopsis,
        source: 'hindi-dub',
      }));
    }
    return [];
  } catch (error) {
    console.error('Error searching Hindi dub anime:', error);
    return [];
  }
};

// Get latest Hindi dubbed anime
export const getLatestHindiDubbed = async (page: number = 1) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/seasons/now?page=${page}&limit=25`
    );
    
    if (response.data?.data) {
      return response.data.data.map((anime: any) => ({
        mal_id: anime.mal_id,
        title: anime.title,
        images: anime.images || { jpg: { image_url: getPlaceholder() } },
        score: anime.score,
        episodes: anime.episodes,
        isHindiAvailable: true,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching latest Hindi dubbed anime:', error);
    return [];
  }
};

// Ensure all anime data has proper images
export const fixAnimeImages = (animeData: any) => {
  if (Array.isArray(animeData)) {
    return animeData.map(anime => ({
      ...anime,
      images: anime.images || { jpg: { image_url: getPlaceholder() } },
    }));
  }
  
  return {
    ...animeData,
    images: animeData.images || { jpg: { image_url: getPlaceholder() } },
  };
};
