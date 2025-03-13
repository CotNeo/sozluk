'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-3">
          {/* Logo and desktop navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-primary flex items-center">
              <span className="text-secondary">hub</span>
              <span className="text-primary">X</span>
              <span className="text-gray-600 ml-1 font-normal">sözlük</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link href="/popular" className="text-gray-600 hover:text-primary transition-colors">
                popüler
              </Link>
              <Link href="/today" className="text-gray-600 hover:text-primary transition-colors">
                bugün
              </Link>
              <Link href="/debe" className="text-gray-600 hover:text-primary transition-colors">
                debe
              </Link>
              <Link href="/topics/create" className="text-gray-600 hover:text-primary transition-colors">
                yeni başlık
              </Link>
            </nav>
          </div>

          {/* Search and user actions */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <input
                type="text"
                placeholder="başlık, #entry, @yazar"
                className="input w-64 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
                aria-label="Ara"
                title="Ara"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
            
            <div className="hidden md:flex items-center space-x-3">
              <Link href="/login" className="btn-outline py-1.5 px-3">
                giriş
              </Link>
              <Link href="/register" className="btn-primary py-1.5 px-3">
                kayıt ol
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-600 hover:text-primary"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="başlık, #entry, @yazar"
                  className="input w-full pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
                  aria-label="Ara"
                  title="Ara"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
            
            <nav className="flex flex-col space-y-3">
              <Link href="/popular" className="text-gray-600 hover:text-primary transition-colors py-1">
                popüler
              </Link>
              <Link href="/today" className="text-gray-600 hover:text-primary transition-colors py-1">
                bugün
              </Link>
              <Link href="/debe" className="text-gray-600 hover:text-primary transition-colors py-1">
                debe
              </Link>
              <Link href="/topics/create" className="text-gray-600 hover:text-primary transition-colors py-1">
                yeni başlık
              </Link>
              <div className="pt-2 flex space-x-3">
                <Link href="/login" className="btn-outline py-1.5 px-3 flex-1">
                  giriş
                </Link>
                <Link href="/register" className="btn-primary py-1.5 px-3 flex-1">
                  kayıt ol
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 