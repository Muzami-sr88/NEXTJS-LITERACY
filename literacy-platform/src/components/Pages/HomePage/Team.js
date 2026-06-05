// ✅ Server Component — no "use client" needed
import Image from 'next/image';
import Link from 'next/link';

const teamMembers = [
  { id: 1, image: '/images/TeamProfiles/1.png' },
  { id: 2, image: '/images/TeamProfiles/2.png' },
  { id: 3, image: '/images/TeamProfiles/3.png' },
  { id: 4, image: '/images/TeamProfiles/4.png' },
  { id: 5, image: '/images/TeamProfiles/5.png' },
];

export default function Team() {
  return (
    <section className="relative py-20 pb-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-[#b5d56a] uppercase tracking-wider text-sm font-semibold mb-3"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
          >
            THE LEADERSHIP
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#07294e]">
            Meet The Team
          </h2>
        </div>

        {/* Team Images */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
          {teamMembers.map((member) => (
            <div key={member.id} className="relative">
              <div className="relative w-[215px] h-[215px] rounded-lg overflow-hidden shadow-lg
                transition-transform duration-300 hover:scale-105">
                <Image
                  src={member.image}
                  alt={`Team member ${member.id}`}
                  fill
                  loading="lazy"           // ✅ below fold — lazy load
                  sizes="215px"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button — ✅ Link instead of plain button */}
        <div className="text-center">
          <Link
            href="/our-team"
            className="inline-block bg-[#07294e] text-white px-12 py-3 mb-10 rounded-lg
              font-semibold hover:bg-[#0a3a6b] transition-colors duration-200
              shadow-md hover:shadow-lg"
          >
            Our Team
          </Link>
        </div>

      </div>
    </section>
  );
}