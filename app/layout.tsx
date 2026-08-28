import type { Metadata } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KAJITORU CONNECT | はたらくは、もっとおもしろくなる。',
  description:
    '複業、フリーランス、転職、起業、海外勤務。カジトルは、一人ひとりの挑戦と働き方の選択肢を広げます。',
  keywords: [
    '複業',
    'フリーランス',
    '転職',
    '起業',
    '海外勤務',
    'キャリア',
    'プロフェッショナル',
  ],
  openGraph: {
    title: 'KAJITORU CONNECT | はたらくは、もっとおもしろくなる。',
    description:
      '複業、フリーランス、転職、起業、海外勤務。カジトルは、一人ひとりの挑戦と働き方の選択肢を広げます。',
    url: 'https://connect.kajitoru.jp',
    siteName: 'KAJITORU CONNECT',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KAJITORU CONNECT | はたらくは、もっとおもしろくなる。',
    description:
      '複業、フリーランス、転職、起業、海外勤務。カジトルは、一人ひとりの挑戦と働き方の選択肢を広げます。',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} ${notoSansJP.className} bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  )
}
