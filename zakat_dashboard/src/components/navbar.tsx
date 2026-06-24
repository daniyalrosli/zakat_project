'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { nameKey: 'nav.home', href: '/' },
    { nameKey: 'nav.about', href: '/about' },
    { nameKey: 'nav.overview', href: '/overview' },
    { nameKey: 'nav.forecast', href: '/forecast' },
    { nameKey: 'nav.statistics', href: '/statistics' },
    { nameKey: 'nav.report', href: '/report' },
    { nameKey: 'nav.faq', href: '/faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-[#1a1035]/95 backdrop-blur-md shadow-lg dark:shadow-purple-900/20 shadow-gray-200/50' 
        : 'bg-white/80 dark:bg-[#1a1035]/80'
    } border-b border-gray-200 dark:border-purple-500/20`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 dark:from-pink-500 dark:to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg dark:shadow-purple-500/30 shadow-blue-200/50">
                <span className="text-white font-bold text-sm">P2P</span>
              </div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-pink-300 transition-colors">
                P2P-Zakat
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.nameKey}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive(item.href)
                      ? 'text-blue-700 dark:text-white bg-gradient-to-r from-blue-100 dark:from-pink-500/20 to-cyan-100 dark:to-purple-500/20 border border-blue-300 dark:border-purple-500/30'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  {t(item.nameKey)}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 dark:from-pink-500 to-cyan-500 dark:to-cyan-400 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Language Switcher - Desktop */}
            <div className="ml-2 relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-all border border-gray-200 dark:border-purple-500/20"
              >
                <Globe size={16} />
                <span>{language === 'en' ? 'EN' : 'BM'}</span>
              </button>
              
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#1a1035] border border-gray-200 dark:border-purple-500/30 rounded-lg shadow-xl dark:shadow-purple-900/30 overflow-hidden z-50">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setLangMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center gap-2 ${
                      language === 'en'
                        ? 'bg-blue-100 dark:bg-pink-500/20 text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <span>🇬🇧</span> English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('ms');
                      setLangMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center gap-2 ${
                      language === 'ms'
                        ? 'bg-blue-100 dark:bg-pink-500/20 text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <span>🇲🇾</span> Bahasa Melayu
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-purple-500/20 bg-white/95 dark:bg-[#1a1035]/95 backdrop-blur-md">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.nameKey}
                href={item.href}
                className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-700 dark:text-white bg-gradient-to-r from-blue-100 dark:from-pink-500/20 to-cyan-100 dark:to-purple-500/20 border border-blue-300 dark:border-purple-500/30'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.nameKey)}
              </Link>
            ))}
            
            {/* Language Switcher - Mobile */}
            <div className="pt-2 border-t border-gray-200 dark:border-purple-500/20 mt-2">
              <div className="flex gap-2 px-4">
                <button
                  onClick={() => {
                    setLanguage('en');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    language === 'en'
                      ? 'bg-gradient-to-r from-blue-200 dark:from-pink-500/30 to-cyan-200 dark:to-purple-500/30 text-gray-900 dark:text-white border border-blue-300 dark:border-purple-500/30'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span>🇬🇧</span> EN
                </button>
                <button
                  onClick={() => {
                    setLanguage('ms');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    language === 'ms'
                      ? 'bg-gradient-to-r from-blue-200 dark:from-pink-500/30 to-cyan-200 dark:to-purple-500/30 text-gray-900 dark:text-white border border-blue-300 dark:border-purple-500/30'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span>🇲🇾</span> BM
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
