// ✅ No "use client" — this is now a Server Component (faster, no JS bundle)
import Image from 'next/image';
import Link from 'next/link';

const AboutUs = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Top Section - Fixed Spacing */}
        <div className="mb-5 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-28">

          {/* Image - Clean layout */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <Image
                src="/images/AboutUs.png"
                alt="Person reading a book — About Literary Palace"
                width={520}
                height={520}
                loading="lazy"
                className="w-full max-w-[480px] md:max-w-[520px] h-auto object-contain rounded-2xl shadow-xl"
              />
              <div className="absolute bottom-4 right-4 w-16 h-1 bg-[#c3e26e] rounded-full" />
            </div>
          </div>

          {/* Text - Fixed Spacing */}
          <div className="pl-0 lg:pl-4">
            <div className="inline-block bg-[#c3e26e]/20 px-6 py-2 rounded-full text-[#07294e] text-xs font-semibold tracking-wider uppercase mb-6">
              About Literary Palace
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#07294e] mb-6 leading-tight">
              About Us
            </h2>

            <div className="w-16 h-1 bg-[#c3e26e] rounded-full mb-8" />

            <p className="text-[#334155] text-lg leading-relaxed max-w-[55ch] mb-10">
              At Literary Palace, we make literature clear, reliable, and accessible for everyone.
              Our curated summaries, analyses, literary terms, and critical perspectives are designed
              to help students, teachers, and researchers study with confidence. Rooted in expertise
              and academic integrity, we connect classic works, modern thought, and world literature
              to give you resources you can trust.
            </p>

            <Link
              href="/about-us"
              className="inline-block bg-[#07294e] text-white px-12 py-4 rounded-xl font-semibold hover:bg-[#0a3a6b] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
            >
              Learn More About Us
            </Link>
          </div>
        </div>

        {/* Statistics Bar - Fixed Spacing */}
        <div className="w-full overflow-hidden relative z-10 -mb-28">
          <div className="w-full bg-[#c3e26e] py-12 rounded-3xl shadow-xl">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-[#07294e] items-center">

                <div className="md:pr-8 md:border-r md:border-[#07294e]/30 md:py-2">
                  <dt className="sr-only">Literature Insights</dt>
                  <div className="bg-white/20 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                    <Image src="/Literature Insights (Reviews).svg" alt="" aria-hidden="true"
                      width={32} height={32} className="w-8 h-8 object-contain" />
                  </div>
                  <dd>
                    <div className="text-4xl md:text-5xl font-extrabold">2k+</div>
                    <div className="text-sm font-medium mt-2">Literature Insights</div>
                  </dd>
                </div>

                <div className="md:px-8 md:border-r md:border-[#07294e]/30 md:py-2">
                  <dt className="sr-only">Literary Terms</dt>
                  <div className="bg-white/20 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                    <Image src="/Literary Terms icon (Reviews)-01.svg" alt="" aria-hidden="true"
                      width={32} height={32} className="w-8 h-8 object-contain" />
                  </div>
                  <dd>
                    <div className="text-4xl md:text-5xl font-extrabold">100+</div>
                    <div className="text-sm font-medium mt-2">Literary Terms</div>
                  </dd>
                </div>

                <div className="md:px-8 md:border-r md:border-[#07294e]/30 md:py-2">
                  <dt className="sr-only">Critical Insights</dt>
                  <div className="bg-white/20 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                    <Image src="/Criticle Insights (Reviews).svg" alt="" aria-hidden="true"
                      width={32} height={32} className="w-8 h-8 object-contain" />
                  </div>
                  <dd>
                    <div className="text-4xl md:text-5xl font-extrabold">1k+</div>
                    <div className="text-sm font-medium mt-2">Critical Insights</div>
                  </dd>
                </div>

                <div className="md:pl-8 md:py-2">
                  <dt className="sr-only">World Literature</dt>
                  <div className="bg-white/20 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                    <Image src="/World Literature (Reviews)-01.svg" alt="" aria-hidden="true"
                      width={32} height={32} className="w-8 h-8 object-contain" />
                  </div>
                  <dd>
                    <div className="text-4xl md:text-5xl font-extrabold">500+</div>
                    <div className="text-sm font-medium mt-2">World Literature</div>
                  </dd>
                </div>

              </dl>
            </div>
          </div>
        </div>

        {/* Full-width Dark Block - Fixed Spacing */}
        <div className="py-5 w-full bg-[#07294e] rounded-3xl pt-32 pb-20 px-8 sm:px-12 lg:px-16 text-white shadow-2xl relative z-0">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left Column */}
            <div>
              <div className="inline-block bg-[#c3e26e]/20 px-6 py-2 rounded-full text-[#c3e26e] text-xs font-semibold tracking-wider uppercase mb-6">
                Literature Simplified
              </div>
              <h3 className="text-4xl md:text-5xl font-extrabold leading-tight mb-10">
                Explore Literature<br />Like Never Before
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { src: '/Expert Analysis Made Simple icon-01.svg', label: 'Expert Analysis Made Simple' },
                  { src: '/Every Work You Need Icon-01.svg', label: 'Every Work You Need' },
                  { src: '/For Every Reading Lover Icon-01.svg', label: 'For Every Reading Lover' },
                ].map(({ src, label }) => (
                  <div key={label} className="flex items-center gap-3 bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-colors">
                    <div className="w-12 h-12 min-w-[48px] bg-[#c3e26e] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <Image src={src} alt="" aria-hidden="true"
                        width={24} height={24} className="w-6 h-6 object-contain" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm leading-snug">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="flex items-center lg:justify-end">
              <div className="max-w-md bg-white/10 p-8 rounded-2xl border border-white/20 backdrop-blur-sm">
                <div className="w-16 h-1 bg-[#c3e26e] rounded-full mb-6" />
                <p className="text-white text-lg leading-relaxed">
                  We explain books, poems, and plays in plain English so you can learn faster and enjoy reading more.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="mt-12 w-full h-px bg-gradient-to-r from-transparent via-[#c3e26e]/50 to-transparent" />
        </div>

      </div>
    </section>
  );
};

export default AboutUs;