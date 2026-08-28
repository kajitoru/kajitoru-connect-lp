'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { submitLead, LeadData } from '@/lib/submitLead'
import { getAnalyticsParams, logAnalytics } from '@/lib/analytics'

const INTEREST_OPTIONS = [
  { id: 'freelance', label: '複業' },
  { id: 'independent', label: 'フリーランス' },
  { id: 'career', label: '転職' },
  { id: 'startup', label: '起業' },
  { id: 'global', label: '海外勤務' },
  { id: 'unknown', label: 'まだわからない' },
]

export default function ConnectForm() {
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedInUrl: '',
    interests: [] as string[],
  })

  const [analyticsData, setAnalyticsData] = useState({
    from: '',
    ref: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // URLパラメータを初期化
  useEffect(() => {
    if (searchParams) {
      const params = getAnalyticsParams(searchParams)
      logAnalytics(params)
      setAnalyticsData({
        from: params.from || '',
        ref: params.ref || '',
        utm_source: params.utm_source || '',
        utm_medium: params.utm_medium || '',
        utm_campaign: params.utm_campaign || '',
        utm_content: params.utm_content || '',
      })
    }
  }, [searchParams])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = '名前は必須です'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスは必須です'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleInterestToggle = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setSubmitStatus('idle')

    try {
      const leadData: LeadData = {
        name: formData.name,
        email: formData.email,
        linkedInUrl: formData.linkedInUrl || undefined,
        interests: formData.interests,
        source: 'online_meeting',
        referrer: analyticsData.from || analyticsData.ref,
        utm_source: analyticsData.utm_source,
        utm_medium: analyticsData.utm_medium,
        utm_campaign: analyticsData.utm_campaign,
        utm_content: analyticsData.utm_content,
      }

      const result = await submitLead(leadData)

      if (result.success) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          linkedInUrl: '',
          interests: [],
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {submitStatus === 'idle' ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            {/* Name field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                名前 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="山田太郎"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="yamada@example.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* LinkedIn URL field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn URL <span className="text-gray-400">(任意)</span>
              </label>
              <input
                type="url"
                name="linkedInUrl"
                value={formData.linkedInUrl}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
              />
            </div>

            {/* Interests field */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                興味があること <span className="text-gray-400">(複数選択可)</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {INTEREST_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleInterestToggle(option.id)}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                      formData.interests.includes(option.id)
                        ? 'bg-black text-white border-2 border-black'
                        : 'bg-white text-black border-2 border-gray-300 hover:border-black'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isLoading ? '送信中...' : 'KAJITORUとつながる'}
            </button>

            {/* Disclaimer */}
            <p className="text-center text-sm text-gray-500 mt-4">
              履歴書・職務経歴書は不要です。
            </p>
          </form>
        ) : submitStatus === 'success' ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">
                つながってくれて、ありがとうございます。
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                次の挑戦を考えたとき、
                <br />
                いつでもカジトルを思い出してください。
              </p>
            </div>

            {/* Success CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="https://kajitoru.com/projects"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                案件を見る
              </a>
              <a
                href="https://www.talent-book.jp/kajitoru"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-black text-black font-medium rounded-lg hover:bg-black hover:text-white transition-colors duration-300"
              >
                Talentbookを見る
              </a>
              <a
                href="https://www.linkedin.com/in/tanakajitoru?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-black text-black font-medium rounded-lg hover:bg-black hover:text-white transition-colors duration-300"
              >
                LinkedInでつながる
              </a>
            </div>

            {/* Register another button */}
            <button
              onClick={() => {
                setSubmitStatus('idle')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
            >
              別の方を登録する
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">
                エラーが発生しました
              </h3>
              <p className="text-gray-700 text-base">
                申し訳ございません。もう一度お試しください。
              </p>
            </div>

            <button
              onClick={() => setSubmitStatus('idle')}
              className="mt-6 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              フォームに戻る
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
