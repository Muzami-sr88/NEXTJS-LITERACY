"use client";
import { useState, useEffect } from "react";

const sections = [
  { id: "general-disclaimer", label: "General Disclaimer" },
  { id: "content-accuracy", label: "Content Accuracy" },
  { id: "educational-purpose", label: "Educational Purpose" },
  { id: "external-links", label: "External Links" },
  { id: "user-responsibility", label: "User Responsibility" },
  { id: "limitation-of-liability", label: "Limitation of Liability" },
  { id: "changes-to-disclaimer", label: "Changes to Disclaimer" },
  { id: "contact-information", label: "Contact Information" },
];

const DisclaimerMain = () => {
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
              
              {/* Section: General Disclaimer */}
              <div id="general-disclaimer" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h1 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    General Disclaimer
                  </h1>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    The information provided on Literary Palace is for general informational and educational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
                  </p>
                </div>
              </div>

              {/* Section: Content Accuracy */}
              <div id="content-accuracy" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Content Accuracy
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Literary Palace provides literary analysis, study guides, and educational content based on established literary works and scholarly interpretations. However, interpretations of literature can vary, and our content represents our analysis and understanding at the time of publication.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We do not guarantee that our content is error-free, complete, or up-to-date. Literature is subject to ongoing scholarly debate, and new interpretations may emerge over time.
                  </p>
                </div>
              </div>

              {/* Section: Educational Purpose */}
              <div id="educational-purpose" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Educational Purpose
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">Our content is intended for educational and informational purposes only. It should not be considered as professional advice or a substitute for:</p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Academic research or scholarly work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Professional literary criticism</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Legal or medical advice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Financial or investment guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Any other professional services</span>
                    </li>
                  </ul>
                  <p className="text-lg text-gray-700 leading-relaxed mt-4">Always consult with qualified professionals for advice in these areas.</p>
                </div>
              </div>

              {/* Section: External Links */}
              <div id="external-links" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    External Links
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Literary Palace may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them. We have no control over the content of these sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
                  </p>
                </div>
              </div>

              {/* Section: User Responsibility */}
              <div id="user-responsibility" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    User Responsibility
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    By using Literary Palace, you acknowledge and agree that:
                  </p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>You are responsible for your own use of the website and any content you access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>You will use the information appropriately and in accordance with applicable laws</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>You will not rely solely on our content for academic or professional purposes without verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>You understand that literature study requires critical thinking and personal analysis</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section: Limitation of Liability */}
              <div id="limitation-of-liability" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Limitation of Liability
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    In no event shall Literary Palace, its directors, employees, or agents be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of the website or any content therein.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    This limitation applies whether the alleged liability is based on contract, tort, negligence, strict liability, or any other basis, even if we have been advised of the possibility of such damage.
                  </p>
                </div>
              </div>

              {/* Section: Changes to Disclaimer */}
              <div id="changes-to-disclaimer" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Changes to Disclaimer
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    We reserve the right to modify this disclaimer at any time without prior notice. Your continued use of Literary Palace after any such changes constitutes your acceptance of the new disclaimer.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We encourage you to review this disclaimer periodically to stay informed of any updates.
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
                  <p className="text-lg text-gray-200 leading-relaxed mb-4">If you have any questions about this disclaimer, please contact us at:</p>
                  <ul className="space-y-3 text-gray-200 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Email: official@literarypalace.com</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Address: Literary Palace, Thal University Bhakkar</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <span className="inline-block bg-[#c3e26e] text-[#07294e] px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider">
                      Legal & Compliance
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

export default DisclaimerMain;