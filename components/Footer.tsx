'use client'

import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/lib/links'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Top section */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          {/* Logo */}
          <div className="text-4xl font-bold tracking-widest mb-4">
            <span className="text-[#FF6B6B]">*</span>
            <span className="text-[#FFA500]">K</span>
            <span className="text-[#9D4EDD]">A</span>
            <span className="text-[#3A86FF]">J</span>
            <span className="text-[#00C9A7]">I</span>
            <span className="text-white">TORU</span>
          </div>

          {/* Tagline */}
          <p className="text-lg text-gray-400 mb-4">Take the helm.</p>

          {/* Philosophy */}
          <p className="text-gray-300 font-medium max-w-md">
            自分で選び、正解にする。
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-12"></div>

        {/* Links section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-medium mb-3 text-white">COMPANY</h4>
            <Link
              href={EXTERNAL_LINKS.COMPANY}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
            >
              会社サイト
            </Link>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-white">PROJECTS</h4>
            <Link
              href={EXTERNAL_LINKS.PROJECTS}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
            >
              案件を見る
            </Link>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-white">TALENTBOOK</h4>
            <Link
              href={EXTERNAL_LINKS.TALENTBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
            >
              ストーリーを読む
            </Link>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-white">LINKEDIN</h4>
            <Link
              href={EXTERNAL_LINKS.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
            >
              フォローする
            </Link>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© KAJITORU</p>
          <p className="text-gray-500 text-sm">
            Empowering professionals worldwide.
          </p>
        </div>
      </div>
    </footer>
  )
}
