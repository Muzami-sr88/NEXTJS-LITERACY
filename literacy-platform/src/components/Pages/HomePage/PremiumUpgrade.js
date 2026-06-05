// ✅ Server Component — no state or effects needed
import Image from 'next/image';

const features = [
  { iconPath: '/AI Tools Icon-01.svg',           title: 'AI Tools',          description: 'Picture study and teaching support powered by AI.' },
  { iconPath: '/Advanced Search Icon-01.svg',    title: 'Advanced Search',   description: 'Find specific terms, themes, and passages instantly.' },
  { iconPath: '/Expert Insights Icon-01.svg',    title: 'Expert Insights',   description: 'Advanced critical reading guidance from literary experts.' },
  { iconPath: '/Qoute Analysis-01.svg',          title: 'Quote Analysis',    description: 'Understand key literary quotes deeply and clearly.' },
  { iconPath: '/Printable PDFs Icon.svg',        title: 'Printable PDFs',    description: 'Download detailed literary insights for offline use.' },
  { iconPath: '/Plus Much More Icon-01.svg',     title: 'Plus Much More',    description: 'Quizzes, saved notes, flashcards, and much more.' },
];

const PremiumUpgrade = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-[#f4f4f4]">

      {/* Curvy top transition */}
      <div className="absolute top-[-100px] left-0 right-0 h-[100px] pointer-events-none">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,200 Q720,-150 1440,200 L1440,200 L0,200 Z" fill="#f4f4f4" />
        </svg>
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(#07294e 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_-10px_rgba(7,41,78,0.15)] border border-gray-100 overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#b5d56a] via-[#d4ed99] to-[#b5d56a]" />

          <div className="p-8 md:p-12">

            {/* Header */}
            <div className="flex items-start justify-between mb-8 md:mb-10">
              <div className="flex-1 text-left">
                <span className="inline-block text-[#b5d56a] text-xs font-bold tracking-[0.2em] uppercase mb-3">
                  Premium Plan
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#07294e] leading-tight mb-3"
                  style={{ fontFamily: 'var(--font-merriweather)' }}>
                  Upgrade to{' '}
                  <span className="relative inline-block">
                    <Image
                      src="/Logo Icons/Literary Palace SVG-01.svg"
                      alt="Literary Palace"
                      width={250} height={60}
                      className="h-12 w-auto object-contain"
                    />
                    <span className="absolute top-0 right-0 text-[7px] sm:text-[9px] md:text-xs font-extrabold text-[#07294e] leading-none"
                      style={{ fontFamily: 'var(--font-merriweather)' }}>
                      PLUS
                    </span>
                  </span>
                </h2>
                <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed">
                  Over 270,000 students and teachers trust Literary Palace. Upgrade to unlock
                  the analysis and tools that make you a more confident reader.
                </p>
              </div>

              {/* A+ badge */}
              <div className="flex-shrink-0 ml-4 md:ml-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#f4f4f4] flex items-center justify-center shadow-inner">
                  <Image src="/A+ Icon-01.svg" alt="A+" width={40} height={40}
                    className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                </div>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200 mb-8 md:mb-10" />

            {/* Features Grid — ✅ removed inline animation styles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-[#b5d56a]/20
                    border border-[#b5d56a]/40 flex items-center justify-center flex-shrink-0
                    group-hover:bg-[#b5d56a]/40 transition-colors duration-200">
                    <Image src={feature.iconPath} alt="" aria-hidden="true"
                      width={22} height={22} className="w-5 h-5 object-contain" />
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-sm md:text-[15px] font-bold text-[#07294e] mb-0.5">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-gray-200 mb-8" />

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-400 text-center sm:text-left">
                No credit card required &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; Instant access
              </p>
              <button className="bg-[#07294e] text-white px-8 py-3 rounded-xl font-semibold
                text-sm md:text-base hover:bg-[#0a3a6b] hover:scale-[1.03] active:scale-[0.97]
                transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto
                cursor-pointer tracking-wide">
                Sign Up for A+
              </button>
            </div>

          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6 tracking-wide">
          Trusted by <span className="font-semibold text-[#07294e]">270,000+</span> students &amp; teachers worldwide
        </p>
      </div>
    </section>
  );
};

export default PremiumUpgrade;