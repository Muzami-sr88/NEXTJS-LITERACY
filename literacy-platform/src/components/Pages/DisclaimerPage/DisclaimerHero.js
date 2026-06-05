const DisclaimerHero = () => {
  return (
    <section
      className="
        relative text-white
        flex items-center justify-center
        min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh]
        text-center
        bg-gradient-to-br from-[#07294e] via-[#0a3b5c] to-[#1a5a7a]
        overflow-hidden
      "
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#c3e26e] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#c3e26e] rounded-full blur-3xl" />
      </div>

      {/* Center Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center">
        
        {/* Badge / Subtle Accent */}
        <div className="mt-4 mb-4 inline-block bg-[#c3e26e]/20 backdrop-blur-sm px-4 py-1 rounded-full text-[#c3e26e] text-xs font-semibold tracking-wider uppercase">
          Legal Information
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#c3e26e]">
            Disclaimer
          </span>
        </h1>

        {/* Tagline - updated for better readability */}
        <p className="
          max-w-2xl
          text-base sm:text-lg md:text-xl lg:text-2xl
          text-gray-200 leading-relaxed
        ">
          Important information about using Literary Palace.
        </p>

        {/* Decorative line */}
        <div className="w-16 h-1 bg-[#c3e26e] mt-6 rounded-full" />
      </div>
    </section>
  );
};

export default DisclaimerHero;