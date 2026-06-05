import Image from "next/image";

const founders = [
    {
        name: "Muhammad Rizwan Hassan",
        role: "SEO Specialist",
        img: "/images/TeamProfiles/1.png",
    },
    {
        name: "Muhammad Bilal Haider",
        role: "Digital Strategist",
        img: "/images/TeamProfiles/5.png",
    },
];

const coFounders = [
    {
        name: "Nisha Fareed",
        role: "SEO Specialist",
        img: "/images/TeamProfiles/2.png",
    },
    {
        name: "Habiba Ubaidullah Anwar",
        role: "Digital Strategist",
        img: "/images/TeamProfiles/3.png",
    },
    {
        name: "Sania Iqbal",
        role: "Digital Strategist",
        img: "/images/TeamProfiles/4.png",
    },
];

const SocialIcons = () => (
    <div className="flex gap-2 justify-center mt-3">
        <a href="#" className="w-7 h-7 rounded-full bg-[#07294e] flex items-center justify-center hover:opacity-75 transition">
            <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        </a>
        <a href="#" className="w-7 h-7 rounded-full bg-[#07294e] flex items-center justify-center hover:opacity-75 transition">
            <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        </a>
        <a href="#" className="w-7 h-7 rounded-full bg-[#07294e] flex items-center justify-center hover:opacity-75 transition">
            <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        </a>
        <a href="#" className="w-7 h-7 rounded-full bg-[#07294e] flex items-center justify-center hover:opacity-75 transition">
            <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        </a>
    </div>
);

const MemberCard = ({ member, large = false }) => (
    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center p-6 border border-gray-100 ${large ? "max-w-xs" : "max-w-[220px]"} w-full`}>
        <div className={`${large ? "w-40 h-40" : "w-32 h-32"} rounded-xl overflow-hidden mb-4 border-2 border-[#c3e26e]`}>
            <Image src={member.img} alt={member.name} width={150} height={150} className="w-full h-full object-cover" />
        </div>
        <h3 className="font-bold text-[#07294e] text-center text-sm leading-snug">{member.name}</h3>
        <p className="text-[#c3e26e] text-xs font-semibold mt-1">{member.role}</p>
        <div className="w-full border-t border-gray-100 mt-3 pt-2">
            <SocialIcons />
        </div>
    </div>
);

export default function OurTeam() {
    return (
        <div className="font-sans bg-[#f8fafc] min-h-screen mt-14">
            
            {/* Hero Section - Redesigned */}
            <section className="relative bg-gradient-to-br from-[#07294e] via-[#0a3b5c] to-[#1a5a7a] text-white text-center py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-[#c3e26e] rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#c3e26e] rounded-full blur-3xl" />
                </div>
                
                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="mb-4 inline-block bg-[#c3e26e]/20 backdrop-blur-sm px-4 py-1 rounded-full text-[#c3e26e] text-xs font-semibold tracking-wider uppercase">
                        Our Team
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#c3e26e]">
                            Our Team
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-200 text-base md:text-lg leading-relaxed">
                        We unite our ideas, passion, and purpose to shape a future built on excellence and trust.
                    </p>
                    <div className="w-16 h-1 bg-[#c3e26e] mt-6 mx-auto rounded-full" />
                </div>
            </section>

            {/* About Section - Redesigned */}
            <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="mb-4 inline-block bg-[#c3e26e]/10 px-3 py-1 rounded text-[#c3e26e] text-xs font-bold uppercase tracking-widest">
                        Our Team
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#07294e] leading-snug mb-4">
                        Alone we grow, together<br />we build Literary Palace.
                    </h2>
                    <div className="w-12 h-1 bg-[#c3e26e] rounded mb-6" />
                    <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg border border-gray-100">
                        <Image
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop"
                            alt="Team"
                            width={600}
                            height={384}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            unoptimized
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <p className="text-gray-600 text-sm leading-relaxed">
                        At Literary Palace, we are committed to making English literature clear, accessible, and academically reliable through structured, research-based, and student-focused guidance.
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        We believe literature should inspire critical thinking and creativity, not confusion or stress. Through quality content and innovative digital learning, we aim to build a trusted global platform that empowers literature learners worldwide.
                    </p>

                    <div className="mt-2">
                        <p className="font-['Pacifico',cursive] text-2xl text-gray-700 italic">founders</p>
                        <p className="font-bold text-[#07294e] text-sm mt-1">Founders</p>
                    </div>

                    <ul className="space-y-2 mt-2">
                        {["Academic Excellence", "Research-Based Analysis", "Clear & Simplified Explanations", "Student-Centered Approach", "Continuous Learning & Innovation"].map((v) => (
                            <li key={v} className="flex items-center gap-2 text-sm text-gray-700">
                                <span className="text-[#c3e26e] font-bold text-base">✦</span> {v}
                            </li>
                        ))}
                    </ul>

                    <button className="mt-4 self-start bg-[#07294e] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#051f38] transition-colors">
                        Discover More
                    </button>
                </div>
            </section>

            {/* Founders Section - Redesigned */}
            <section className="bg-white py-14 px-6">
                <div className="text-center mb-10">
                    <div className="mb-2 inline-block bg-[#c3e26e]/10 px-3 py-1 rounded text-[#c3e26e] text-xs font-bold uppercase tracking-widest">
                        Founders
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#07294e]">Bright Ideas Light the Way</h2>
                </div>
                <div className="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto">
                    {founders.map((f) => (
                        <MemberCard key={f.name} member={f} large />
                    ))}
                </div>
            </section>

            {/* Co-Founders Section - Redesigned */}
            <section className="py-14 px-6 bg-[#f8fafc]">
                <div className="text-center mb-10">
                    <div className="mb-2 inline-block bg-[#c3e26e]/10 px-3 py-1 rounded text-[#c3e26e] text-xs font-bold uppercase tracking-widest">
                        Co-Founders
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#07294e]">
                        Team Work Makes the<br />Dream Work
                    </h2>
                </div>
                <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                    {coFounders.map((m) => (
                        <MemberCard key={m.name} member={m} />
                    ))}
                </div>
            </section>

            {/* Footer accent */}
            <div className="h-1.5 bg-gradient-to-r from-[#07294e] via-[#c3e26e] to-[#07294e]" />
        </div>
    );
}