import axios from 'axios';

const JIKAN_API = 'https://api.jikan.moe/v4';
const ANILIST_API = 'https://graphql.anilist.co';
const API_TIMEOUT = 8000; // 8 second timeout

// Mock fallback data for faster initial display
const MOCK_ANIME = [
  {
    mal_id: 52991,
    title: 'Sousou no Frieren',
    images: { jpg: { image_url: 'https://myanimelist.net/images/anime/1015/138006.jpg' } },
    score: 9.27,
    episodes: 28,
    year: 2023,
  },
  {
    mal_id: 5114,
    title: 'Fullmetal Alchemist: Brotherhood',
    images: { jpg: { image_url: 'https://myanimelist.net/images/anime/1208/94745.jpg' } },
    score: 9.11,
    episodes: 64,
    year: 2009,
  },
  {
    mal_id: 9253,
    title: 'Steins;Gate',
    images: { jpg: { image_url: 'https://myanimelist.net/images/anime/1935/127974.jpg' } },
    score: 9.07,
    episodes: 24,
    year: 2011,
  },
  {
    mal_id: 38524,
    title: 'Attack on Titan Season 3 Part 2',
    images: { jpg: { image_url: 'https://myanimelist.net/images/anime/1517/100633.jpg' } },
    score: 9.05,
    episodes: 10,
    year: 2019,
  },
];

// Create axios instance with timeout
const axiosInstance = axios.create({
  timeout: API_TIMEOUT,
  headers: { 'User-Agent': 'AniVortex' }
});

// Jikan API - Get trending anime
export const getTrendingAnime = async (page: number = 1) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/anime?order_by=score&sort=desc&page=${page}&status=complete&limit=25`
    );
    return response.data.data || MOCK_ANIME;
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    // Return mock data as fallback
    return page === 1 ? MOCK_ANIME : [];
  }
};

// Get anime by search
export const searchAnime = async (query: string) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/anime?query=${encodeURIComponent(query)}&limit=25`
    );
    return response.data.data || [];
  } catch (error) {
    console.error('Error searching anime:', error);
    return [];
  }
};

// Get anime details with episodes
export const getAnimeDetails = async (animeId: number) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/anime/${animeId}`
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return null;
  }
};

// Get anime episodes
export const getAnimeEpisodes = async (animeId: number, page: number = 1) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/anime/${animeId}/episodes?page=${page}`
    );
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return [];
  }
};

// Get anime by genre (filter action, adventure, etc.)
export const getAnimeByGenre = async (genreId: number, page: number = 1) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/anime?genres=${genreId}&order_by=score&sort=desc&page=${page}&limit=25`
    );
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching anime by genre:', error);
    return [];
  }
};

// Get top anime
export const getTopAnime = async (type: string = 'all', page: number = 1) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/top/anime?type=${type}&page=${page}&limit=25`
    );
    return response.data.data || (page === 1 ? MOCK_ANIME : []);
  } catch (error) {
    console.error('Error fetching top anime:', error);
    return page === 1 ? MOCK_ANIME : [];
  }
};

// Get anime recommendations
export const getAnimeRecommendations = async (animeId: number) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/anime/${animeId}/recommendations`
    );
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
};

// Get streaming sources for anime
export const getStreamingSources = async (animeId: number) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/anime/${animeId}/full`
    );
    const anime = response.data.data;
    return {
      streaming: anime.streaming || [],
      trailer: anime.trailer || {},
      externalLinks: anime.external_links || [],
    };
  } catch (error) {
    console.error('Error fetching streaming sources:', error);
    return { streaming: [], trailer: {}, externalLinks: [] };
  }
};

// Get specific episode details
export const getEpisodeDetails = async (animeId: number, episodeNumber: number) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/anime/${animeId}/episodes/${episodeNumber}`
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching episode details:', error);
    return null;
  }
};
