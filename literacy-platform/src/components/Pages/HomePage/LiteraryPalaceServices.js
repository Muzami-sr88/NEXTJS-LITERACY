import Image from "next/image";
import Link from "next/link";

const tiles = [
  {
    id: 1,
    img: "/Personalized Literature Membership Icon-01.svg",
    title: "Personalized Literature Mentorship",
    desc: "Master complex texts with one-on-one guidance from literary experts.",
    bg: "bg-[#07294e]",
    textColor: "text-white",
  },
  {
    id: 2,
    img: "/Literary Term & Theory Simplification Icon-01.svg",
    title: "Literary Term & Theory Simplification",
    desc: "Learn complex literary terms through simple explanations and real examples.",
    bg: "bg-[#b5d56a]",
    textColor: "text-[#07294e]",
  },
  {
    id: 3,
    img: "/Academic Writing Help (Literature Only)-01.svg",
    title: "Academic Writing Help (Literature Only)",
    desc: "Professional essay and research paper support from qualified literature specialists.",
    bg: "bg-[#b5d56a]",
    textColor: "text-[#07294e]",
  },
  {
    id: 4,
    img: "/Literary Career & research Consultation-01.svg",
    title: "Literary Career & Research Consultation",
    desc: "Turn your literature degree into teaching, publishing, or research careers.",
    bg: "bg-[#07294e]",
    textColor: "text-white",
  },
];

function ServiceTile({ img, title, desc, bg, textColor }) {
  return (
    <div
      className={`${bg} ${textColor} flex h-52 w-full max-w-xs flex-col items-center justify-center rounded-2xl border border-white/10 p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:h-60 md:w-64 md:p-8`}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
        <Image
          src={img}
          alt=""
          aria-hidden="true"
          width={40}
          height={40}
          className="h-8 w-8 object-contain md:h-10 md:w-10"
        />
      </div>

      <h3 className="mb-2 text-base font-bold leading-tight md:text-lg">
        {title}
      </h3>

      <p
        className={`text-xs leading-relaxed md:text-sm ${
          textColor === "text-white" ? "text-white/80" : "text-[#07294e]/80"
        }`}
      >
        {desc}
      </p>
    </div>
  );
}

export default function LiteraryPalaceServices() {
  return (
    <section className="bg-[#f8fafc] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="pr-4 lg:pr-8">
            <div className="mb-4 inline-block rounded-full bg-[#b5d56a]/20 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#07294e]">
              Literary Palace Services
            </div>

            <h2 className="mb-6 text-4xl font-extrabold leading-tight text-[#07294e] md:text-5xl">
              Guidance From Literary Experts
            </h2>

            <div className="mb-6 h-1 w-12 rounded-full bg-[#b5d56a]" />

            <p className="mb-8 max-w-[58ch] text-lg leading-relaxed text-[#334155]">
              Get genuine understanding, not just answers. Our literature
              specialists with advanced degrees provide personalized support to
              help you master texts, write with confidence, and achieve your
              academic goals. We build the critical thinking skills that turn
              students into scholars.
            </p>

            <Link
              href="/literary-terms"
              className="inline-block rounded-xl bg-[#07294e] px-8 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0a3a6b] hover:shadow-lg"
            >
              Explore Our Services
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-8">
            <div className="flex flex-col gap-6 md:gap-8">
              {tiles.slice(0, 2).map((tile) => (
                <ServiceTile key={tile.id} {...tile} />
              ))}
            </div>

            <div className="flex flex-col gap-6 md:-mt-8 md:gap-8">
              {tiles.slice(2, 4).map((tile) => (
                <ServiceTile key={tile.id} {...tile} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}