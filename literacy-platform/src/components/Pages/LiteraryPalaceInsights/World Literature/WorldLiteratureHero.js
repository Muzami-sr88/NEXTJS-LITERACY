


import SearchRedirectForm from '@/components/sharedComponents/SearchRedirectForm';
import Image from 'next/image';

const WorldLiteratureHero = () => {
  return (
    <section
      className="relative text-white min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] flex flex-col justify-between"
    >
   
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center lg:items-end">
          {/* Left Content */}
          <div className="md:pl-6 lg:pl-17 transform translate-y-6 md:translate-y-12 lg:translate-y-24 md:-translate-x-4 lg:-translate-x-12 text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight hero-heading-noto whitespace-nowrap">
              <span className="text-white font-merriweather">
                World Literature
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white opacity-95 mt-8 leading-snug max-w-[80ch]">
              World literature highlights global voices and themes, helping readers explore cultures, compare texts, and understand literature in a wider context.
            </p>
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 transform translate-y-18 sm:translate-y-20 md:translate-y-28 lg:translate-y-42 md:-translate-x-11 lg:-translate-x-13">
              <Image
                src="/World Literature Green-01.svg"
                alt="World Literature Illustration"
                width={260}
                height={260}
                priority
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar at Bottom */}
      <div className="relative z-10 pb-0 -mb-6 px-2 sm:px-4 lg:px-6">
        <div className="w-full flex justify-center">
          <SearchRedirectForm target="/world-literature" placeholder="Search World Literature by authors, titles, and regions." />
        </div>
      </div>
    </section>
  );
};

export default WorldLiteratureHero;