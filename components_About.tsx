'use client'

import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/lib/links'

export default function About() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-sm md:text-base font-medium text-gray-500 tracking-widest uppercase mb-4">
          About Kajitoru
        </h2>

        {/* Main message */}
        <h3 className="text-4xl md:text-5xl font-bold mb-8 text-black">
          挑戦者のための、港になる。
        </h3>

        {/* Description */}
        <p className="text-lg text-gray-700 leading-relaxed mb-12">
          カジトルは、挑戦する企業と個人をつなぎ、
          <br />
          一人ひとりの選択肢を増やしていく会社です。
        </p>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <Link
            href={EXTERNAL_LINKS.COMPANY}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-black text-black font-medium rounded-lg hover:bg-black hover:text-white transition-colors duration-300"
          >
            会社サイトを見る
          </Link>
          <Link
            href={EXTERNAL_LINKS.TALENTBOOK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-black text-black font-medium rounded-lg hover:bg-black hover:text-white transition-colors duration-300"
          >
            Talentbookを見る
          </Link>
          <Link
            href={EXTERNAL_LINKS.LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-black text-black font-medium rounded-lg hover:bg-black hover:text-white transition-colors duration-300"
          >
            LinkedInを見る
          </Link>
        </div>
      </div>
    </section>
  )
}
