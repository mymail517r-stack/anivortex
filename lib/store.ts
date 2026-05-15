import { create } from 'zustand';

interface WatchlistItem {
  id: number;
  title: string;
  image: string;
  progress: number;
}

interface AnimeStore {
  watchlist: WatchlistItem[];
  addToWatchlist: (anime: WatchlistItem) => void;
  removeFromWatchlist: (id: number) => void;
  updateProgress: (id: number, progress: number) => void;
  isInWatchlist: (id: number) => boolean;
}

export const useAnimeStore = create<AnimeStore>((set, get) => ({
  watchlist: typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('anivortex-watchlist') || '[]')
    : [],
  
  addToWatchlist: (anime) => {
    const current = get().watchlist;
    const exists = current.some(item => item.id === anime.id);
    if (!exists) {
      const updated = [...current, anime];
      set({ watchlist: updated });
      if (typeof window !== 'undefined') {
        localStorage.setItem('anivortex-watchlist', JSON.stringify(updated));
      }
    }
  },
  
  removeFromWatchlist: (id) => {
    const updated = get().watchlist.filter(item => item.id !== id);
    set({ watchlist: updated });
    if (typeof window !== 'undefined') {
      localStorage.setItem('anivortex-watchlist', JSON.stringify(updated));
    }
  },
  
  updateProgress: (id, progress) => {
    const updated = get().watchlist.map(item =>
      item.id === id ? { ...item, progress } : item
    );
    set({ watchlist: updated });
    if (typeof window !== 'undefined') {
      localStorage.setItem('anivortex-watchlist', JSON.stringify(updated));
    }
  },
  
  isInWatchlist: (id) => {
    return get().watchlist.some(item => item.id === id);
  },
}));
