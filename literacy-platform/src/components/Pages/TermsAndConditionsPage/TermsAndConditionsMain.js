"use client";
import { useState, useEffect } from "react";

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "acceptance-of-terms", label: "Acceptance of Terms" },
  { id: "use-of-service", label: "Use of Service" },
  { id: "user-accounts", label: "User Accounts" },
  { id: "content-ownership", label: "Content Ownership" },
  { id: "prohibited-uses", label: "Prohibited Uses" },
  { id: "termination", label: "Termination" },
  { id: "disclaimer", label: "Disclaimer" },
  { id: "limitation-of-liability", label: "Limitation of Liability" },
  { id: "governing-law", label: "Governing Law" },
  { id: "changes-to-terms", label: "Changes to Terms" },
  { id: "contact-information", label: "Contact Information" },
];

const TermsAndConditionsMain = () => {
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
              
              {/* Section: Introduction */}
              <div id="introduction" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h1 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Introduction
                  </h1>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Welcome to Literary Palace. These Terms and Conditions ("Terms") govern your use of our website, services, and any content provided by Literary Palace. By accessing or using our platform, you agree to be bound by these Terms.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    If you do not agree to these Terms, please do not use our website or services. We reserve the right to modify these Terms at any time, and your continued use constitutes acceptance of the changes.
                  </p>
                </div>
              </div>

              {/* Section: Acceptance of Terms */}
              <div id="acceptance-of-terms" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Acceptance of Terms
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    By using Literary Palace, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. These Terms apply to all users, including visitors, registered users, and subscribers.
                  </p>
                </div>
              </div>

              {/* Section: Use of Service */}
              <div id="use-of-service" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Use of Service
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">Literary Palace provides educational content, study guides, and community features for literature enthusiasts. You agree to use our services only for lawful purposes and in accordance with these Terms.</p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Access our content for personal, educational, or professional use.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Share content with proper attribution.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Respect intellectual property rights.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section: User Accounts */}
              <div id="user-accounts" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    User Accounts
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    You agree to provide accurate and complete information when creating an account and to update it as necessary.
                  </p>
                </div>
              </div>

              {/* Section: Content Ownership */}
              <div id="content-ownership" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Content Ownership
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    All content on Literary Palace, including text, images, videos, and study guides, is owned by Literary Palace or our licensors and is protected by copyright and other intellectual property laws.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    You may not reproduce, distribute, or create derivative works without our express written permission.
                  </p>
                </div>
              </div>

              {/* Section: Prohibited Uses */}
              <div id="prohibited-uses" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Prohibited Uses
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">You agree not to:</p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Use our services for any illegal or unauthorized purpose.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Violate any laws or regulations.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Infringe on the rights of others.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Distribute harmful or malicious content.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Attempt to gain unauthorized access to our systems.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section: Termination */}
              <div id="termination" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Termination
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We reserve the right to terminate or suspend your account and access to our services at our discretion, without prior notice, for conduct that violates these Terms or is harmful to other users or our platform.
                  </p>
                </div>
              </div>

              {/* Section: Disclaimer */}
              <div id="disclaimer" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Disclaimer
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Literary Palace provides content for educational purposes. While we strive for accuracy, we do not guarantee the completeness or reliability of our content. Use at your own risk.
                  </p>
                </div>
              </div>

              {/* Section: Limitation of Liability */}
              <div id="limitation-of-liability" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Limitation of Liability
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    In no event shall Literary Palace be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services.
                  </p>
                </div>
              </div>

              {/* Section: Governing Law */}
              <div id="governing-law" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Governing Law
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                  </p>
                </div>
              </div>

              {/* Section: Changes to Terms */}
              <div id="changes-to-terms" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Changes to Terms
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We may update these Terms from time to time. We will notify users of significant changes via email or through our website. Your continued use after changes constitutes acceptance.
                  </p>
                </div>
              </div>

              {/* Section: Contact Information */}
              <div id="contact-information" className="scroll-mt-24">
                <div className="bg-[#07294e] rounded-2xl shadow-lg p-8 md:p-10 text-white">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Contact Information
                  </h2>
                  <p className="text-lg text-gray-200 leading-relaxed mb-4">If you have any questions about these Terms, please contact us at:</p>
                  <ul className="space-y-3 text-gray-200 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Email: official@literarypalace.com</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Address: [Your Address]</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <span className="inline-block bg-[#c3e26e] text-[#07294e] px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider">
                      Legal Agreement
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

export default TermsAndConditionsMain;