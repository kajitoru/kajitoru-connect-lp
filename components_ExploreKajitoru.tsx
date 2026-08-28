'use client'

import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/lib/links'

const EXPLORE_CARDS = [
  {
    id: 'projects',
    title: 'プロジェクトを探す',
    description: 'AI / Microsoft / CRM / Cloud / Security など、カジトルが扱うプロジェクトを見る。',
    cta: '案件を見る',
    href: EXTERNAL_LINKS.PROJECTS,
    icon: '📋',
    color: '#FF6B6B',
  },
  {
    id: 'people',
    title: '人とストーリーを読む',
    description: '社員、フリーランス、挑戦する人たちのストーリーを見る。',
    cta: 'Talentbookを見る',
    href: EXTERNAL_LINKS.TALENTBOOK,
    icon: '👥',
    color: '#FFA500',
  },
  {
    id: 'guild',
    title: '挑戦者とつながる',
    description: '複業・フリーランス・専門家がつながるコミュニティ。',
    cta: 'Guildを見る',
    href: EXTERNAL_LINKS.GUILD,
    icon: '🛡️',
    color: '#9D4EDD',
  },
  {
    id: 'global',
    title: '世界で働く',
    description: '海外勤務、海外プロジェクト、海外での挑戦について知る。',
    cta: 'Globalを見る',
    href: EXTERNAL_LINKS.GLOBAL,
    icon: '🌐',
    color: '#00C9A7',
  },
]

export default function ExploreKajitoru() {
  return (
    <section
      id="explore-kajitoru"
      className="py-20 px-4 bg-white scroll-mt-0"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm md:text-base font-medium text-gray-500 tracking-widest uppercase mb-2">
            Explore Kajitoru
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-black">
            カジトルを、のぞいてみる。
          </h3>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {EXPLORE_CARDS.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-gray-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                style={{ backgroundColor: card.color }}
              ></div>

              {/* Icon */}
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>

              {/* Content */}
              <h4
                className="text-xl font-bold mb-3"
                style={{ color: card.color }}
              >
                {card.title}
              </h4>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                {card.description}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 font-medium" style={{ color: card.color }}>
                <span>{card.cta}</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-gray-200"></div>
      </div>
    </section>
  )
}
