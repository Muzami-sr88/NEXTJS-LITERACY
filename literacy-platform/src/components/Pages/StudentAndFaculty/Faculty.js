import Image from "next/image";

const SocialIcons = () => (
    <div className="flex gap-2 justify-center mt-3">
        {/* X / Twitter */}
        <a href="#" className="w-8 h-8 rounded-full bg-[#0d1b35] flex items-center justify-center hover:opacity-75 transition">
            <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        </a>
        {/* Instagram */}
        <a href="#" className="w-8 h-8 rounded-full bg-[#0d1b35] flex items-center justify-center hover:opacity-75 transition">
            <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        </a>
        {/* Facebook */}
        <a href="#" className="w-8 h-8 rounded-full bg-[#0d1b35] flex items-center justify-center hover:opacity-75 transition">
            <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        </a>
        {/* LinkedIn */}
        <a href="#" className="w-8 h-8 rounded-full bg-[#0d1b35] flex items-center justify-center hover:opacity-75 transition">
            <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        </a>
    </div>
);

export default function Faculty() {
    return (
        <div className="font-sans bg-[#f8fafc] min-h-screen mt-14">
            
            {/* Hero Section - Redesigned */}
            <section className="relative bg-gradient-to-br from-[#07294e] via-[#0a3b5c] to-[#1a5a7a] text-white text-center py-20 px-4 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-[#c3e26e] rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#c3e26e] rounded-full blur-3xl" />
                </div>
                
                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="mb-4 inline-block bg-[#c3e26e]/20 backdrop-blur-sm px-4 py-1 rounded-full text-[#c3e26e] text-xs font-semibold tracking-wider uppercase">
                        Under Supervision
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#c3e26e]">
                            Special Thanks To
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-200 text-base md:text-lg leading-relaxed">
                        We unite our ideas, passion, and purpose to shape a future built on excellence and trust.
                    </p>
                    <div className="w-16 h-1 bg-[#c3e26e] mt-6 mx-auto rounded-full" />
                </div>
            </section>

            {/* Main Content - Redesigned */}
            <section className="py-16 px-6 max-w-5xl mx-auto">
                
                <div className="text-center mb-12">
                    <p className="text-[#c3e26e] text-xs font-bold uppercase tracking-widest mb-2">
                        Under Supervision
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#07294e]">
                        Bright Ideas Light the Way
                    </h2>
                </div>

                {/* Card - Redesigned */}
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden">
                        <div className="relative">
                            <div className="w-full h-72 md:h-80 overflow-hidden">
                                <Image 
                                    src="/images/TeamProfiles/6.jpeg"
                                    alt="Dr. Eram Jameel"
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                            {/* Lime accent band */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#c3e26e]" />
                        </div>
                        
                        <div className="p-8 text-center">
                            <h3 className="text-xl font-extrabold text-[#07294e]">Dr. Eram Jameel</h3>
                            <p className="text-[#c3e26e] font-semibold text-sm mt-1">
                                HOD Department of English
                            </p>
                            <p className="text-[#c3e26e] font-semibold text-sm">
                                Thal University Bhakkar
                            </p>
                            <div className="w-12 h-0.5 bg-[#c3e26e] mx-auto my-3" />
                            <SocialIcons />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#07294e] via-[#c3e26e] to-[#07294e]" />
        </div>
    );
}