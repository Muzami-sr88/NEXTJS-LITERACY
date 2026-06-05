import SearchRedirectForm from '@/components/sharedComponents/SearchRedirectForm';
import Image from 'next/image';

const LiteratureHero = () => {
  // Use existing SVG asset from public folder for the book illustration

  return (
    <section 
      className="relative text-white min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] flex flex-col justify-between"
    >
      {/* Background image with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(7, 41, 78, 0.8) 0%, rgba(10, 58, 107, 0.8) 50%, rgba(7, 41, 78, 0.8) 100%), url('/images/LiteraturePageHeroBg.png')`
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center lg:items-end">
          {/* Left Content */}
          <div className="md:pl-6 lg:pl-17 transform translate-y-6 md:translate-y-12 lg:translate-y-24 md:-translate-x-4 lg:-translate-x-12 text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight hero-heading-noto">
              <span className="text-white font-merriweather">
                Literature
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white opacity-95 mt-8 leading-snug max-w-[80ch]">
              Our Literature Insights offer clear summaries, themes, character analyses, and quotes for classic and modern works, helping to deepen your understanding.
            </p>
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 transform translate-y-12 sm:translate-y-16 md:translate-y-24 lg:translate-y-34 md:-translate-x-11 lg:-translate-x-13">
              <Image
                src="/Literature icon.svg"
                alt="Books Illustration"
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
          <SearchRedirectForm target="/literature" placeholder="Search Literature by authors, title and genres." />
        </div>
      </div>
    </section>
  );
};

export default LiteratureHero;