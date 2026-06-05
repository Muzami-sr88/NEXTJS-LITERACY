"use client";
import { useState, useEffect } from "react";

const sections = [
  { id: "about-literary-palace", label: "About Literary Palace" },
  { id: "our-mission", label: "Our Mission" },
  { id: "what-we-offer", label: "What We Offer" },
  { id: "what-makes-different", label: "What Makes Literary Palace Different" },
  { id: "our-team", label: "Our Team" },
  { id: "trust-integrity", label: "Trust & Academic Integrity" },
  { id: "stay-connected", label: "Stay Connected" },
  { id: "place-trust", label: "A Place You Can Trust" },
];

const AboutUsMain = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sections.map((section) => {
        const el = document.getElementById(section.id);
        if (!el) return { id: section.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: section.id, top: Math.abs(rect.top) };
      });
      const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      setActiveSection(closest.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <section className="py-16 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* SIDEBAR - Redesigned as a floating card */}
          <aside className="lg:w-1/4 order-first lg:order-none">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-[#07294e] px-5 py-4">
                <h3 className="text-white font-bold text-lg">On This Page</h3>
              </div>
              <ul className="flex flex-col">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() => handleClick(section.id)}
                      className={`
                        block w-full px-5 py-3 text-left transition-all duration-200 border-l-4
                        ${activeSection === section.id
                          ? "border-[#c3e26e] bg-[#c3e26e]/10 font-semibold text-[#07294e]"
                          : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-200"
                        }
                      `}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* MAIN CONTENT - Redesigned with cards and better spacing */}
          <div className="lg:w-3/4 order-last lg:order-none">
            <article className="space-y-12">
              
              {/* Section: About */}
              <div id="about-literary-palace" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    About Literary Palace
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Sometimes literature feels overwhelming. A dense novel, a complex theory, or an essay packed with unfamiliar terms can make studying harder than it should be.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Literary Palace is here to change that. We make literature simple,
                    engaging, and accessible—whether you’re preparing for an exam,
                    teaching in a classroom, writing research papers, or simply exploring
                    the world of books for pleasure.
                  </p>
                </div>
              </div>

              {/* Section: Mission */}
              <div id="our-mission" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Our Mission
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    At Literary Palace, our mission is clear: to make literature understandable, meaningful, and enjoyable for everyone.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We believe literature isn’t just about passing exams—it’s about discovering human experiences, exploring cultures, and connecting stories across time and space. That’s why we combine clarity with depth, giving you tools that make learning literature less stressful and far more rewarding.
                  </p>
                </div>
              </div>

              {/* Section: What We Offer */}
              <div id="what-we-offer" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    What We Offer
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">We provide multiple ways to learn, teach, and explore literature:</p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Book Guides & Summaries</strong> – Chapter-wise breakdowns, themes, symbols, and character analysis for classics and modern works.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Literary Theories & Criticism</strong> – From structuralism to postcolonialism, explained in simple words.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Literary Terms A to Z</strong> – Easy definitions with real examples from texts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Comparative & World Literature</strong> – Insights that connect cultures, genres, and periods.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Downloadable PDFs & Study Guides</strong> – Well-organized, exam-ready references.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Learning Services</strong> – 1-on-1 mentorship, online classes, and personalized study support.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Community Hub</strong> – Forums, discussions, and collaborative learning with fellow readers.</span>
                    </li>
                  </ul>
                  <p className="text-lg text-gray-700 leading-relaxed mt-4">
                    Whether you’re a beginner or an advanced scholar, our content adapts to your learning needs.
                  </p>
                </div>
              </div>

              {/* Section: Different */}
              <div id="what-makes-different" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    What Makes Literary Palace Different?
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    There are many literature websites out there, but here’s why readers and students choose us:
                  </p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Clarity with Depth</strong> – We go beyond summaries, linking literature to history, philosophy, and culture.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Original Voice</strong> – Every guide is written by real experts—educators, researchers, and literature graduates.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Structured for Learning</strong> – Content organized by literary periods, authors, genres, and terms for easy navigation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Printable PDFs</strong> – Designed for quick study, teaching, and exam prep.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Interactive Community</strong> – Discussions, Q&As, and opportunities to grow with other learners.</span>
                    </li>
                  </ul>
                  <p className="text-lg text-gray-700 leading-relaxed mt-4">
                    We don’t just explain literature—we help you experience it.
                  </p>
                </div>
              </div>

              {/* Section: Team */}
              <div id="our-team" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Our Team
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    The Literary Palace team is built by educators, writers, and literature specialists who are passionate about words and stories. Our contributors include graduates from leading universities, researchers in English literature, and experienced teachers who know the challenges students face.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We also collaborate with scholars and learners worldwide to make sure our content is authentic, updated, and relevant.
                  </p>
                </div>
              </div>

              {/* Section: Trust */}
              <div id="trust-integrity" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Trust & Academic Integrity
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    We believe in honesty, transparency, and respect for learning. All our resources are:
                  </p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Plagiarism-free</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Fact-checked and research-based</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Regularly updated with new insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Made for learning, not for shortcuts</span>
                    </li>
                  </ul>
                  <p className="text-lg text-gray-700 leading-relaxed mt-4">
                    Our guides are designed to support education, not replace it. We encourage students to use our work as a tool for growth—not as an alternative to original reading or research.
                  </p>
                </div>
              </div>

              {/* Section: Connect */}
              <div id="stay-connected" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Stay Connected
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">We’re not just a website—we’re a growing community of readers, students, and teachers. Stay in touch with us:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-lg">
                    <li className="flex items-center gap-2"><span className="text-[#c3e26e]">📘</span> Facebook: @literarypalace</li>
                    <li className="flex items-center gap-2"><span className="text-[#c3e26e]">📷</span> Instagram: @literarypalace</li>
                    <li className="flex items-center gap-2"><span className="text-[#c3e26e]">🐦</span> Twitter/X: @literarypalace_</li>
                    <li className="flex items-center gap-2"><span className="text-[#c3e26e]">▶️</span> YouTube: @literarypalace</li>
                    <li className="flex items-center gap-2"><span className="text-[#c3e26e]">💬</span> WhatsApp Channel: Join Here</li>
                    <li className="flex items-center gap-2"><span className="text-[#c3e26e]">✉️</span> Email: official@literarypalace.com</li>
                  </ul>
                  <p className="text-lg text-gray-700 leading-relaxed mt-4">
                    Share your feedback, suggest topics, or simply join us in celebrating literature.
                  </p>
                </div>
              </div>

              {/* Section: Final Trust */}
              <div id="place-trust" className="scroll-mt-24">
                <div className="bg-[#07294e] rounded-2xl shadow-lg p-8 md:p-10 text-white">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    A Place You Can Trust
                  </h2>
                  <p className="text-lg text-gray-200 leading-relaxed mb-4">
                    Literary Palace is built on expertise, driven by passion, and guided by a commitment to real learning. Here, books meet clarity, ideas meet context, and readers become thinkers.
                  </p>
                  <p className="text-xl font-semibold text-white leading-relaxed">
                    Come read with us.<br />Come Learn with us.<br />Come grow with us at Literary Palace.
                  </p>
                  <div className="mt-6">
                    <span className="inline-block bg-[#c3e26e] text-[#07294e] px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider">
                      Join Our Community
                    </span>
                  </div>
                </div>
              </div>

            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsMain;