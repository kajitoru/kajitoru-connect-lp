'use client'

const CAREER_OPTIONS = [
  {
    id: 'freelance',
    label: '複業',
    icon: '👤',
    color: '#FF6B6B',
  },
  {
    id: 'independent',
    label: 'フリーランス',
    icon: '💻',
    color: '#FFA500',
  },
  {
    id: 'career',
    label: '転職',
    icon: '🎯',
    color: '#9D4EDD',
  },
  {
    id: 'startup',
    label: '起業',
    icon: '🚀',
    color: '#3A86FF',
  },
  {
    id: 'global',
    label: '海外勤務',
    icon: '🌍',
    color: '#00C9A7',
  },
]

export default function CareerPath() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm md:text-base font-medium text-gray-500 tracking-widest uppercase mb-2">
            How do you want to work?
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-black">
            どこから、はじめますか？
          </h3>
        </div>

        {/* Career path visualization */}
        <div className="relative h-auto">
          {/* SVG path connecting the options */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid slice"
            style={{ height: '100%' }}
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="25%" stopColor="#FFA500" />
                <stop offset="50%" stopColor="#9D4EDD" />
                <stop offset="75%" stopColor="#3A86FF" />
                <stop offset="100%" stopColor="#00C9A7" />
              </linearGradient>
            </defs>

            {/* Curved path - showing interconnectedness and flow */}
            <path
              d="M 80 200 Q 200 100 320 200 T 560 200 T 800 200 T 1040 200"
              stroke="url(#pathGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              fill="none"
              opacity="0.6"
            />

            {/* Return paths - showing you can go back */}
            <path
              d="M 320 200 Q 320 300 240 300 Q 160 300 80 200"
              stroke="url(#pathGradient)"
              strokeWidth="1"
              strokeDasharray="3,3"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M 560 200 Q 560 300 440 300 Q 320 300 200 300"
              stroke="url(#pathGradient)"
              strokeWidth="1"
              strokeDasharray="3,3"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M 800 200 Q 800 300 680 300 Q 560 300 440 300"
              stroke="url(#pathGradient)"
              strokeWidth="1"
              strokeDasharray="3,3"
              fill="none"
              opacity="0.3"
            />
          </svg>

          {/* Career option cards */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-4">
            {CAREER_OPTIONS.map((option) => (
              <div
                key={option.id}
                className="group flex flex-col items-center justify-center p-6 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 bg-white hover:shadow-lg"
              >
                <div
                  className="text-4xl md:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300"
                >
                  {option.icon}
                </div>
                <h4
                  className="text-lg md:text-xl font-bold text-center"
                  style={{ color: option.color }}
                >
                  {option.label}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="mt-16 text-center space-y-2">
          <p className="text-gray-700 text-lg">ひとつに決めなくてもいい。</p>
          <p className="text-gray-600">働き方は、途中で変えていい。</p>
        </div>
      </div>
    </section>
  )
}
