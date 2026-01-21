'use client';

import Navbar from '@/components/navbar';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface FAQItem {
  questionKey: string;
  answerKey: string;
  category: string;
}

const faqData: FAQItem[] = [
  // General
  {
    category: 'General',
    questionKey: 'faq.q1',
    answerKey: 'faq.a1',
  },
  {
    category: 'General',
    questionKey: 'faq.q2',
    answerKey: 'faq.a2',
  },
  {
    category: 'General',
    questionKey: 'faq.q3',
    answerKey: 'faq.a3',
  },
  // Prediction Model
  {
    category: 'Prediction Model',
    questionKey: 'faq.q4',
    answerKey: 'faq.a4',
  },
  {
    category: 'Prediction Model',
    questionKey: 'faq.q5',
    answerKey: 'faq.a5',
  },
  {
    category: 'Prediction Model',
    questionKey: 'faq.q6',
    answerKey: 'faq.a6',
  },
  {
    category: 'Prediction Model',
    questionKey: 'faq.q7',
    answerKey: 'faq.a7',
  },
  // Data & Statistics
  {
    category: 'Data & Statistics',
    questionKey: 'faq.q8',
    answerKey: 'faq.a8',
  },
  {
    category: 'Data & Statistics',
    questionKey: 'faq.q9',
    answerKey: 'faq.a9',
  },
  {
    category: 'Data & Statistics',
    questionKey: 'faq.q10',
    answerKey: 'faq.a10',
  },
  {
    category: 'Data & Statistics',
    questionKey: 'faq.q11',
    answerKey: 'faq.a11',
  },
  // Using the System
  {
    category: 'Using the System',
    questionKey: 'faq.q12',
    answerKey: 'faq.a12',
  },
  {
    category: 'Using the System',
    questionKey: 'faq.q13',
    answerKey: 'faq.a13',
  },
  {
    category: 'Using the System',
    questionKey: 'faq.q14',
    answerKey: 'faq.a14',
  },
  // Technical
  {
    category: 'Technical',
    questionKey: 'faq.q15',
    answerKey: 'faq.a15',
  },
  {
    category: 'Technical',
    questionKey: 'faq.q16',
    answerKey: 'faq.a16',
  },
  {
    category: 'Technical',
    questionKey: 'faq.q17',
    answerKey: 'faq.a17',
  },
];

export default function FAQ() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'All', label: t('faq.cat.all') },
    { key: 'General', label: t('faq.cat.general') },
    { key: 'Prediction Model', label: t('faq.cat.model') },
    { key: 'Data & Statistics', label: t('faq.cat.data') },
    { key: 'Using the System', label: t('faq.cat.usage') },
    { key: 'Technical', label: t('faq.cat.technical') },
  ];

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const question = t(faq.questionKey);
    const answer = t(faq.answerKey);
    const matchesSearch = 
      question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1e] via-[#1a1035] to-[#0d1a2d]">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <span className="text-lg">❓</span>
              <span className="text-sm text-purple-300">{t('faq.badge')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('faq.title')} <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">{t('faq.title2')}</span>
            </h1>
            <p className="text-base text-gray-400 max-w-2xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder={t('faq.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-4 pl-12 bg-[#1e1445]/60 border border-purple-500/20 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => {
                  setActiveCategory(category.key);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.key
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30'
                    : 'bg-[#1e1445]/60 text-gray-400 hover:text-white hover:bg-[#1e1445] border border-purple-500/20'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ Count */}
          <div className="text-center mb-6">
            <span className="text-sm text-gray-500">
              {t('faq.showing')} {filteredFAQs.length} {t('faq.of')} {faqData.length} {t('faq.questions')}
            </span>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl border transition-all ${
                    openIndex === index
                      ? 'border-pink-500/40 shadow-lg shadow-pink-500/10'
                      : 'border-purple-500/20 hover:border-purple-500/40'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <div className="flex items-start gap-4 pr-4">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        faq.category === 'General' ? 'bg-purple-500/20 text-purple-300' :
                        faq.category === 'Prediction Model' ? 'bg-pink-500/20 text-pink-300' :
                        faq.category === 'Data & Statistics' ? 'bg-cyan-500/20 text-cyan-300' :
                        faq.category === 'Using the System' ? 'bg-emerald-500/20 text-emerald-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {faq.category === 'General' ? t('faq.cat.general') :
                         faq.category === 'Prediction Model' ? t('faq.cat.model') :
                         faq.category === 'Data & Statistics' ? t('faq.cat.data') :
                         faq.category === 'Using the System' ? t('faq.cat.usage') :
                         t('faq.cat.technical')}
                      </span>
                      <span className="text-base font-medium text-white">{t(faq.questionKey)}</span>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      openIndex === index
                        ? 'bg-gradient-to-br from-pink-500 to-purple-600 rotate-180'
                        : 'bg-purple-500/20'
                    }`}>
                      <svg
                        className={`w-4 h-4 ${openIndex === index ? 'text-white' : 'text-gray-400'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {openIndex === index && (
                    <div className="px-6 pb-5">
                      <div className="pl-16 pr-4 pt-2 border-t border-purple-500/20">
                        <p className="text-base text-gray-300 leading-relaxed mt-4">
                          {t(faq.answerKey)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{t('faq.noResults')}</h3>
                <p className="text-sm text-gray-500">{t('faq.noResults.desc')}</p>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/30">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t('faq.contact.title')}</h3>
            <p className="text-base text-gray-400 mb-6 max-w-md mx-auto">
              {t('faq.contact.desc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:daniyalrosli@gmail.com"
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-xl hover:from-pink-400 hover:to-purple-500 transition-all shadow-lg shadow-pink-500/30"
              >
                {t('faq.contact.btn')}
              </a>
              <a
                href="/about"
                className="px-6 py-3 bg-[#1e1445]/80 border border-purple-500/30 text-gray-300 font-medium rounded-xl hover:bg-[#1e1445] hover:text-white transition-all"
              >
                {t('faq.contact.learn')}
              </a>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '94.73%', labelKey: 'faq.stats.accuracy', icon: '🎯' },
              { value: '51,962', labelKey: 'faq.stats.recipients', icon: '👥' },
              { value: '113', labelKey: 'faq.stats.features', icon: '📊' },
              { value: '12', labelKey: 'faq.stats.districts', icon: '📍' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#1e1445]/60 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 text-center">
                <span className="text-xl mb-2 block">{stat.icon}</span>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-500">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
