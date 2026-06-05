import Link from "next/link";
import Image from "next/image";
import SearchRedirectForm from "@/components/sharedComponents/SearchRedirectForm";

const cards = [
  {
    iconSrc: "/LiteratureBlue%20icon.svg",
    title: "Literature",
    desc: "Summaries, themes, characters, symbols, quotes, and analysis of novels, plays, essays and more.",
    link: "/literature",
  },
  {
    iconSrc: "/Criticle%20Perspective%20icon.svg",
    title: "Critical Perspectives",
    desc: "Major literary theories, criticism, and philosophical ideas, explained with context and practical insights.",
    link: "/critical-perspectives",
  },
  {
    iconSrc: "/Literary%20Terms%20icon-01.svg",
    title: "Literary Terms",
    desc: "Clear definitions with examples, explanations, and resources to make complex concepts easy to learn.",
    link: "/literary-terms",
  },
  {
    iconSrc: "/World%20Literature-01.svg",
    title: "World Literature",
    desc: "Comparative studies, cross-cultural analysis, and insights into global texts, traditions, and movements.",
    link: "/world-literature",
  },
];

export default function Hero() {
  return (
    <div className="relative">
      <section className="relative flex min-h-[85vh] flex-col justify-between overflow-hidden border-b border-black/10">
        <Image
          src="/images/herobg.jpg"
          alt="Literary Palace hero background"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="z-0 object-cover object-center"
        />

        {/* 50% black image effect */}
        <div className="absolute inset-0 z-10 bg-black/50" />

        <div className="relative z-20 flex flex-1 items-center justify-center px-4 pb-20 pt-36 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#b5d56a]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white">
                Literary Palace
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-7xl">
              A Gateway to the World
              <br className="hidden sm:block" /> of Literature
            </h1>

            <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-[#b5d56a]" />

            <p className="mx-auto max-w-3xl text-base leading-8 text-white/90 md:text-lg lg:text-xl">
              Explore clear, reliable guides to thousands of literary works and ideas, designed to
              help you read deeply, learn better, and teach with confidence.
            </p>
          </div>
        </div>

        <div className="mb-4 mt-2 relative z-20 -mb-12 px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-3xl justify-center">
            <SearchRedirectForm
              target="/literature"
              placeholder="Search authors, poems, plays, theories, terms, and more..."
            />
          </div>
        </div>
      </section>

      <section className="py-5 bg-[#f8fafc] py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <div className="mb-4 inline-block rounded-full bg-[#b5d56a]/20 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#07294e]">
                Literature
              </div>

              <h2 className="text-4xl font-extrabold leading-tight text-[#07294e] md:text-5xl">
                Literary Palace
                <br />
                Insights
              </h2>

              <div className="mt-5 h-1 w-14 rounded-full bg-[#b5d56a]" />
            </div>

            <div className="lg:flex lg:justify-end">
              <p className="max-w-md text-base leading-8 text-[#334155]">
                Simple, organized resources to help you explore, learn, and enjoy literature effortlessly.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <Link
                key={card.title}
                href={card.link}
                className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#07294e] to-[#b5d56a]" />

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#b5d56a]/10 transition-colors duration-300 group-hover:bg-[#b5d56a]">
                  <Image
                    src={card.iconSrc}
                    alt=""
                    aria-hidden="true"
                    width={48}
                    height={48}
                    className="h-11 w-11 object-contain"
                  />
                </div>

                <h3 className="mb-3 text-xl font-extrabold text-[#07294e]">
                  {card.title}
                </h3>

                <p className="mb-6 flex-1 text-sm leading-7 text-[#334155]">
                  {card.desc}
                </p>

                <div className="mt-auto inline-flex items-center text-sm font-bold text-[#07294e]">
                  Explore
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <div className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-[#b5d56a]/10 transition-all duration-300 group-hover:scale-125 group-hover:bg-[#b5d56a]/20" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}