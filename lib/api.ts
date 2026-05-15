import axios from 'axios';

const JIKAN_API = 'https://api.jikan.moe/v4';
const ANILIST_API = 'https://graphql.anilist.co';
const CONSUMET_API = 'https://api.consumet.org/anime/gogoanime'; // Free streaming API
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

// ============================================================================
// 🎬 STREAMING API - Hindi Dub Support & Free Streaming Integration
// ============================================================================

// Get anime streams with Hindi dub support
export const getAnimeStreams = async (animeTitle: string) => {
  try {
    // Try Consumet API for streaming sources
    const response = await axiosInstance.get(
      `${CONSUMET_API}/search?query=${encodeURIComponent(animeTitle)}`
    );
    
    if (response.data && response.data.results && response.data.results.length > 0) {
      const anime = response.data.results[0];
      return {
        id: anime.id,
        title: anime.title,
        image: anime.image || getPlaceholderImage(),
        episodeId: anime.episodeId,
        rating: anime.rating || 'N/A',
        releaseDate: anime.releaseDate || 'N/A',
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching anime streams:', error);
    return null;
  }
};

// Get streaming links with multiple sources
export const getStreamingLinks = async (animeId: string, episodeNumber: number) => {
  try {
    const response = await axiosInstance.get(
      `${CONSUMET_API}/${animeId}/episodes`
    );
    
    if (response.data && response.data.length > 0) {
      const episode = response.data[episodeNumber - 1];
      return {
        episodeNumber,
        title: episode.title || `Episode ${episodeNumber}`,
        sources: [
          {
            name: 'VidSrc',
            url: `https://vidsrc.me/embed/anime?title=${animeId}&ep=${episodeNumber}`,
            type: 'embed',
            language: 'Hindi/English'
          },
          {
            name: '9Anime',
            url: `https://9anime.to/watch/${animeId}?ep=${episodeNumber}`,
            type: 'streaming',
            language: 'Hindi/English'
          },
          {
            name: 'HiAnime',
            url: `https://hianime.to/watch/${animeId}?ep=${episodeNumber}`,
            type: 'streaming',
            language: 'Hindi Dub'
          }
        ],
        image: episode.image || getPlaceholderImage()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching streaming links:', error);
    return null;
  }
};

// Search Hindi dubbed anime
export const searchHindiDubAnime = async (query: string) => {
  try {
    // First try Jikan API
    const jikanResponse = await axiosInstance.get(
      `${JIKAN_API}/anime?query=${encodeURIComponent(query)}&limit=10`
    );
    
    if (jikanResponse.data && jikanResponse.data.data) {
      return jikanResponse.data.data.map((anime: any) => ({
        mal_id: anime.mal_id,
        title: anime.title,
        title_english: anime.title_english,
        image: anime.images?.jpg?.image_url || getPlaceholderImage(),
        score: anime.score,
        episodes: anime.episodes,
        status: anime.status,
        synopsis: anime.synopsis,
        aired: anime.aired?.from,
        genres: anime.genres?.map((g: any) => g.name),
        source: 'hindi-dub' // Mark as Hindi dub source
      }));
    }
    return [];
  } catch (error) {
    console.error('Error searching Hindi dub anime:', error);
    return [];
  }
};

// Get anime image with fallback
export const getAnimeImage = (anime: any): string => {
  try {
    // Try multiple image sources with fallbacks
    const imageUrl = 
      anime.images?.jpg?.image_url ||
      anime.images?.jpg?.large_image_url ||
      anime.image ||
      anime.posterImage?.medium ||
      anime.posterImage?.large ||
      getPlaceholderImage();
    
    return imageUrl;
  } catch (error) {
    return getPlaceholderImage();
  }
};

// Placeholder image generator
export const getPlaceholderImage = (): string => {
  return 'https://via.placeholder.com/225x318?text=Anime+Poster';
};

// Get anime cover image with quality fallback
export const getAnimeCoverImage = (anime: any): string => {
  try {
    const imageUrl = 
      anime.images?.jpg?.large_image_url ||
      anime.images?.jpg?.image_url ||
      anime.coverImage?.extraLarge ||
      anime.coverImage?.large ||
      getPlaceholderImage();
    
    return imageUrl;
  } catch (error) {
    return getPlaceholderImage();
  }
};

// Fetch anime with image verification
export const fetchAnimeWithImages = async (animeList: any[]) => {
  try {
    return animeList.map(anime => ({
      ...anime,
      image: getAnimeImage(anime),
      coverImage: getAnimeCoverImage(anime)
    }));
  } catch (error) {
    console.error('Error fetching anime with images:', error);
    return animeList;
  }
};

// Get latest Hindi dubbed releases
export const getLatestHindiDubbed = async (page: number = 1) => {
  try {
    const response = await axiosInstance.get(
      `${JIKAN_API}/seasons/now?page=${page}&limit=25`
    );
    
    if (response.data && response.data.data) {
      return response.data.data.map((anime: any) => ({
        mal_id: anime.mal_id,
        title: anime.title,
        image: getAnimeImage(anime),
        score: anime.score,
        episodes: anime.episodes,
        status: anime.status,
        aired: anime.aired?.from,
        isHindiAvailable: true // Assume Hindi availability for current season
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching latest Hindi dubbed anime:', error);
    return [];
  }
};

// Get anime by language preference (Hindi, English, etc.)
export const getAnimeByLanguage = async (language: string = 'Hindi', page: number = 1) => {
  try {
    // Use Jikan to get anime, then filter by language preferences
    const response = await axiosInstance.get(
      `${JIKAN_API}/anime?order_by=score&sort=desc&page=${page}&status=complete&limit=25`
    );
    
    if (response.data && response.data.data) {
      return response.data.data.map((anime: any) => ({
        mal_id: anime.mal_id,
        title: anime.title,
        image: getAnimeImage(anime),
        score: anime.score,
        episodes: anime.episodes,
        language: language,
        available_languages: ['Hindi', 'English', 'Japanese']
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching anime by language:', error);
    return [];
  }
};

// Fix images in response data
export const fixAnimeImages = (animeData: any) => {
  if (Array.isArray(animeData)) {
    return animeData.map(anime => ({
      ...anime,
      images: anime.images || { jpg: { image_url: getPlaceholderImage() } },
      image: getAnimeImage(anime)
    }));
  }
  
  return {
    ...animeData,
    images: animeData.images || { jpg: { image_url: getPlaceholderImage() } },
    image: getAnimeImage(animeData)
  };
};
