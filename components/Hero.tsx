'use client'

import Link from 'next/link'

export default function Hero() {
  const handleScrollToForm = () => {
    const formSection = document.getElementById('stay-connected')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleScrollToExplore = () => {
    const exploreSection = document.getElementById('explore-kajitoru')
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden bg-white">
      {/* Background decoration - subtle curved lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="25%" stopColor="#FFA500" />
            <stop offset="50%" stopColor="#9D4EDD" />
            <stop offset="75%" stopColor="#3A86FF" />
            <stop offset="100%" stopColor="#00C9A7" />
          </linearGradient>
        </defs>
        <path
          d="M 0 200 Q 300 100 600 200 T 1200 200"
          stroke="url(#bgGradient)"
          strokeWidth="80"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M 0 400 Q 300 300 600 400 T 1200 400"
          stroke="url(#bgGradient)"
          strokeWidth="60"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M 0 600 Q 300 500 600 600 T 1200 600"
          stroke="url(#bgGradient)"
          strokeWidth="100"
          fill="none"
          opacity="0.3"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Logo placeholder */}
        <div className="mb-8 flex justify-center">
          <div className="text-5xl font-bold tracking-widest">
            <span className="text-black">*</span>
            <span className="text-[#FF6B6B]">K</span>
            <span className="text-[#FFA500]">A</span>
            <span className="text-[#9D4EDD]">J</span>
            <span className="text-[#3A86FF]">I</span>
            <span className="text-[#00C9A7]">T</span>
            <span className="text-black">ORU</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl font-medium text-gray-700 mb-8 leading-relaxed">
          Take the helm.
        </p>

        {/* Main copy with colored accent */}
        <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
          はたらくは、もっと
          <span className="inline-block">
            <span className="text-[#FF6B6B]">お</span>
            <span className="text-[#FFA500]">も</span>
            <span className="text-[#9D4EDD]">し</span>
            <span className="text-[#3A86FF]">ろ</span>
            <span className="text-[#00C9A7]">く</span>
          </span>
          なる。
        </h1>

        {/* Career options */}
        <div className="my-10 space-y-3 text-lg md:text-xl text-gray-700">
          <p>複業、フリーランス、転職、起業、海外勤務。</p>
        </div>

        {/* Philosophy */}
        <div className="mb-10 space-y-2 text-base md:text-lg text-gray-600">
          <p>どこからはじめてもいいし、戻ってきてもいい。</p>
          <p className="font-medium">自分で選び、正解にする。</p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleScrollToForm}
            className="px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-300 text-lg"
          >
            カジトルとつながる
          </button>
          <button
            onClick={handleScrollToExplore}
            className="px-8 py-4 bg-white text-black border-2 border-black font-medium rounded-lg hover:bg-gray-50 transition-colors duration-300 text-lg"
          >
            案件を見てみる
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
