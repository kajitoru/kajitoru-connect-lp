'use client'

export default function StayConnected() {
  return (
    <section
      id="stay-connected"
      className="py-20 px-4 bg-gray-50 scroll-mt-20"
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-sm md:text-base font-medium text-gray-500 tracking-widest uppercase mb-4">
          Stay Connected
        </h2>

        {/* Main message */}
        <h3 className="text-3xl md:text-4xl font-bold mb-8 text-black leading-tight">
          今すぐ転職しなくても、
          <br />
          今すぐ独立しなくてもいい。
        </h3>

        {/* Sub message */}
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          次の挑戦を考えたときに、
          <br />
          思い出してもらえる関係から。
        </p>

        {/* Small note */}
        <p className="text-sm text-gray-500 mb-8">
          30秒程度で登録できます
        </p>
      </div>
    </section>
  )
}
