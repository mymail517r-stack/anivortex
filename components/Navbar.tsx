'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-b from-black via-black/80 to-transparent z-50 border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              AniVortex
            </div>
            <span className="text-xs text-red-500 font-bold">by Naman</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-200 hover:text-red-500 transition duration-200"
            >
              Home
            </Link>
            <Link
              href="/trending"
              className="text-gray-200 hover:text-red-500 transition duration-200"
            >
              Trending
            </Link>
            <Link
              href="/top-rated"
              className="text-gray-200 hover:text-red-500 transition duration-200"
            >
              Top Rated
            </Link>
            <Link
              href="/watchlist"
              className="text-gray-200 hover:text-red-500 transition duration-200 flex items-center gap-1"
            >
              <Heart size={18} />
              Watchlist
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex items-center gap-2 bg-red-950/20 rounded-full px-4 py-2 border border-red-900/30 hover:border-red-500/50 transition">
            <Search size={18} className="text-red-500" />
            <input
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm w-40 text-white placeholder-gray-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-red-500 hover:text-red-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-red-900/20 mt-4 pt-4">
            <Link
              href="/"
              className="block py-2 text-gray-200 hover:text-red-500 transition"
            >
              Home
            </Link>
            <Link
              href="/trending"
              className="block py-2 text-gray-200 hover:text-red-500 transition"
            >
              Trending
            </Link>
            <Link
              href="/top-rated"
              className="block py-2 text-gray-200 hover:text-red-500 transition"
            >
              Top Rated
            </Link>
            <Link
              href="/watchlist"
              className="block py-2 text-gray-200 hover:text-red-500 transition"
            >
              My Watchlist
            </Link>
            <div className="mt-4 flex items-center gap-2 bg-red-950/20 rounded-full px-4 py-2 border border-red-900/30">
              <Search size={18} className="text-red-500" />
              <input
                type="text"
                placeholder="Search anime..."
                className="bg-transparent outline-none text-sm w-full text-white placeholder-gray-500"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
