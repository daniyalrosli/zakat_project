'use client';

import Navbar from '@/components/navbar';
import { useLanguage } from '@/context/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  const models = [
    { name: 'SVM (RBF)', accuracy: 94.73, precision: 94.80, recall: 94.73, f1: 94.70, roc: 98.96, selected: true, color: 'pink' },
    { name: 'Gradient Boosting', accuracy: 94.12, precision: 94.15, recall: 94.12, f1: 94.10, roc: 98.45, selected: false, color: 'yellow' },
    { name: 'Random Forest', accuracy: 93.87, precision: 93.90, recall: 93.87, f1: 93.85, roc: 98.21, selected: false, color: 'emerald' },
    { name: 'Logistic Regression', accuracy: 91.25, precision: 91.30, recall: 91.25, f1: 91.20, roc: 96.42, selected: false, color: 'blue' },
  ];

  const getFeatures = () => [
    { icon: '👤', titleKey: 'about.feat.demographics', descKey: 'about.feat.demographics.desc', gradient: 'from-pink-500 to-rose-500' },
    { icon: '💰', titleKey: 'about.feat.financial', descKey: 'about.feat.financial.desc', gradient: 'from-emerald-500 to-teal-500' },
    { icon: '💼', titleKey: 'about.feat.employment', descKey: 'about.feat.employment.desc', gradient: 'from-blue-500 to-indigo-500' },
    { icon: '🏥', titleKey: 'about.feat.health', descKey: 'about.feat.health.desc', gradient: 'from-red-500 to-pink-500' },
    { icon: '🏠', titleKey: 'about.feat.assets', descKey: 'about.feat.assets.desc', gradient: 'from-purple-500 to-violet-500' },
    { icon: '📍', titleKey: 'about.feat.geographic', descKey: 'about.feat.geographic.desc', gradient: 'from-cyan-500 to-blue-500' },
  ];

  const getMethodology = () => [
    { step: '01', titleKey: 'about.method1.title', descKey: 'about.method1.desc', icon: '📊' },
    { step: '02', titleKey: 'about.method2.title', descKey: 'about.method2.desc', icon: '⚙️' },
    { step: '03', titleKey: 'about.method3.title', descKey: 'about.method3.desc', icon: '🤖' },
    { step: '04', titleKey: 'about.method4.title', descKey: 'about.method4.desc', icon: '✅' },
  ];

  const getSvmReasons = () => [
    { titleKey: 'about.svm1.title', descKey: 'about.svm1.desc', color: 'pink' },
    { titleKey: 'about.svm2.title', descKey: 'about.svm2.desc', color: 'cyan' },
    { titleKey: 'about.svm3.title', descKey: 'about.svm3.desc', color: 'purple' },
    { titleKey: 'about.svm4.title', descKey: 'about.svm4.desc', color: 'emerald' },
  ];

  const features = getFeatures();
  const methodology = getMethodology();
  const svmReasons = getSvmReasons();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1e] via-[#1a1035] to-[#0d1a2d]">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          
          {/* Hero Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              <span className="text-sm text-purple-300">{t('about.badge')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('about.title')} <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">{t('about.title2')}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>

          {/* Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: '51,962', label: t('home.stats.recipients'), icon: '👥' },
              { value: '89', label: t('home.stats.features'), icon: '📈' },
              { value: '12', label: t('home.stats.districts'), icon: '📍' },
              { value: '3', label: t('about.dataCollected'), icon: '📅' },
            ].map((stat, i) => (
              <div key={i} className="group relative bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-2xl mb-3 block">{stat.icon}</span>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Research Overview */}
          <div className="relative mb-16">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-[#1e1445]/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-purple-500/20">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-xl shadow-lg shadow-pink-500/30">
                  📋
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{t('about.researchOverview')}</h2>
                  <p className="text-base text-gray-400">{t('about.understandingScope')}</p>
                </div>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed text-base">
                <p>
                  This project develops a <span className="text-white font-semibold">machine learning-based predictive model</span> to assess the probability 
                  of zakat recipients escaping poverty. Using comprehensive data from <span className="text-pink-400 font-semibold">51,962 asnaf</span> (zakat recipients) 
                  in Kedah, Malaysia collected between 2022-2024, we analyze <span className="text-cyan-400 font-semibold">89 socioeconomic features</span> to 
                  predict escape potential within a 3-year horizon.
                </p>
                <p>
                  The model enables zakat institutions to <span className="text-white font-semibold">optimize resource allocation</span> and develop 
                  <span className="text-purple-400 font-semibold"> targeted intervention strategies</span> tailored to different recipient profiles, 
                  maximizing the social impact of zakat distribution.
                </p>
              </div>
            </div>
          </div>

          {/* Model Performance Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-lg shadow-lg shadow-cyan-500/30">
                🎯
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{t('about.modelPerformance')}</h2>
                <p className="text-base text-gray-400">{t('about.comparingAlgorithms')}</p>
              </div>
            </div>

            {/* Model Cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {models.map((model, i) => (
                <div 
                  key={i} 
                  className={`relative rounded-2xl p-6 border transition-all ${
                    model.selected 
                      ? 'bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-pink-500/40 shadow-lg shadow-pink-500/10' 
                      : 'bg-[#1e1445]/60 border-purple-500/20 hover:border-purple-500/30'
                  }`}
                >
                  {model.selected && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30">
                      <span className="text-xs text-pink-300 font-medium">✓ {t('about.selectedModel')}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-3 h-3 rounded-full bg-${model.color}-500`}></div>
                    <h3 className={`font-semibold ${model.selected ? 'text-white text-lg' : 'text-gray-300'}`}>{model.name}</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className={`text-xl font-bold ${model.selected ? 'text-white' : 'text-gray-300'}`}>{model.accuracy}%</div>
                      <div className="text-xs text-gray-500">Accuracy</div>
                    </div>
                    <div>
                      <div className={`text-xl font-bold ${model.selected ? 'text-cyan-400' : 'text-gray-400'}`}>{model.roc}%</div>
                      <div className="text-xs text-gray-500">ROC-AUC</div>
                    </div>
                    <div>
                      <div className={`text-xl font-bold ${model.selected ? 'text-purple-400' : 'text-gray-400'}`}>{model.f1}%</div>
                      <div className="text-xs text-gray-500">F1-Score</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Why SVM Section */}
            <div className="bg-gradient-to-r from-[#1e1445] to-[#1a1035] rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('about.whySVM')}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Highest ROC-AUC (98.96%)', desc: 'Superior ability to distinguish between recipients who can escape poverty vs. those who cannot.', color: 'pink' },
                  { title: 'Best Accuracy (94.73%)', desc: 'Outperforms all other models in correctly classifying recipient outcomes.', color: 'cyan' },
                  { title: 'Handles High Dimensions', desc: 'Effectively processes 89 features using RBF kernel for complex non-linear relationships.', color: 'purple' },
                  { title: 'Robust to Overfitting', desc: 'Margin-based optimization provides better generalization on unseen data.', color: 'emerald' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-white/5 rounded-xl border border-purple-500/10">
                    <div className={`w-2 h-2 rounded-full bg-${item.color}-500 mt-2 flex-shrink-0`}></div>
                    <div>
                      <div className="text-base font-semibold text-white mb-1">{item.title}</div>
                      <div className="text-sm text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Analyzed */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-lg shadow-lg shadow-yellow-500/30">
                🔍
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{t('about.keyFeatures')}</h2>
                <p className="text-base text-gray-400">{t('about.socioeconomicIndicators')}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, i) => (
                <div key={i} className="group relative bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2">{t(feature.titleKey)}</h3>
                  <p className="text-sm text-gray-400">{t(feature.descKey)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-lg shadow-lg shadow-emerald-500/30">
                🔬
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{t('about.methodologyTitle')}</h2>
                <p className="text-base text-gray-400">{t('about.ourProcess')}</p>
              </div>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500 via-purple-500 to-cyan-500 hidden md:block"></div>
              
              <div className="space-y-6">
                {methodology.map((item, i) => (
                  <div key={i} className="relative flex gap-6 items-start group">
                    {/* Step number */}
                    <div className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform flex-shrink-0">
                      {item.step}
                    </div>
                    {/* Content */}
                    <div className="flex-1 bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{item.icon}</span>
                        <h3 className="text-white font-semibold text-base">{t(item.titleKey)}</h3>
                      </div>
                      <p className="text-sm text-gray-400">{t(item.descKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Source Footer */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl blur-lg"></div>
            <div className="relative bg-[#1e1445]/60 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-2xl mb-4 shadow-lg shadow-purple-500/30">
                🏛️
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{t('common.dataSource')}</p>
              <p className="text-xl font-bold text-white mb-1">Lembaga Zakat Negeri Kedah (LZNK)</p>
              <p className="text-sm text-gray-400">Official zakat recipient records from 2022-2024</p>
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="px-4 py-2 rounded-full bg-white/5 border border-purple-500/20 text-xs text-gray-400">
                  📍 Kedah, Malaysia
                </div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-purple-500/20 text-xs text-gray-400">
                  📅 2022-2024
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
