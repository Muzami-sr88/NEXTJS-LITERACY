"use client";
import { useState, useEffect } from "react";

const sections = [
  { id: "what-are-cookies", label: "What Are Cookies" },
  { id: "how-we-use-cookies", label: "How We Use Cookies" },
  { id: "types-of-cookies", label: "Types of Cookies" },
  { id: "third-party-cookies", label: "Third-Party Cookies" },
  { id: "managing-cookies", label: "Managing Cookies" },
  { id: "cookie-retention", label: "Cookie Retention" },
  { id: "updates-to-policy", label: "Updates to Policy" },
  { id: "contact-us", label: "Contact Us" },
];

const CookiePolicyMain = () => {
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
              
              {/* Section: What Are Cookies */}
              <div id="what-are-cookies" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h1 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    What Are Cookies
                  </h1>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Cookies are small text files that are stored on your computer or mobile device when you visit our website. They allow us to remember your preferences, improve your browsing experience, and provide personalized content.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Cookies do not contain personal information such as your name or email address, but they can help us identify your device and track how you use our website.
                  </p>
                </div>
              </div>

              {/* Section: How We Use Cookies */}
              <div id="how-we-use-cookies" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    How We Use Cookies
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">Literary Palace uses cookies for the following purposes:</p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Essential Cookies:</strong> Required for the website to function properly, such as remembering your login status and preferences.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Analytics Cookies:</strong> Help us understand how visitors use our website, which pages are most popular, and how we can improve our content.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Functional Cookies:</strong> Remember your choices and preferences to provide enhanced features and personalized content.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section: Types of Cookies */}
              <div id="types-of-cookies" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Types of Cookies We Use
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">We use the following types of cookies on Literary Palace:</p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser. They help us maintain your session and remember your actions during your visit.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Persistent Cookies:</strong> Cookies that remain on your device for a set period or until you delete them. They help us remember your preferences and provide personalized experiences.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>First-party Cookies:</strong> Cookies set directly by Literary Palace on your device.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Third-party Cookies:</strong> Cookies set by third-party services we use, such as analytics providers or social media platforms.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section: Third-Party Cookies */}
              <div id="third-party-cookies" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Third-Party Cookies
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    We may use third-party services that set their own cookies on your device. These services include:
                  </p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Google Analytics:</strong> For website analytics and performance monitoring.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Social Media Platforms:</strong> For social sharing buttons and integration with platforms like Facebook, Twitter, and Instagram.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Content Delivery Networks:</strong> To improve website loading speeds and performance.</span>
                    </li>
                  </ul>
                  <p className="text-lg text-gray-700 leading-relaxed mt-4">
                    These third parties have their own privacy policies and cookie practices. We recommend reviewing their policies to understand how they use cookies.
                  </p>
                </div>
              </div>

              {/* Section: Managing Cookies */}
              <div id="managing-cookies" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Managing Cookies
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    You have control over cookies and can manage them through your browser settings. Most browsers allow you to:
                  </p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>View what cookies are stored on your device</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Delete existing cookies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Block cookies from specific websites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Block all cookies from being placed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Clear cookies when you close your browser</span>
                    </li>
                  </ul>
                  <p className="text-lg text-gray-700 leading-relaxed mt-4">
                    Please note that disabling cookies may affect the functionality of our website and limit your user experience. Some features may not work properly without cookies.
                  </p>
                </div>
              </div>

              {/* Section: Cookie Retention */}
              <div id="cookie-retention" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Cookie Retention
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    The length of time a cookie remains on your device depends on its type:
                  </p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Session Cookies:</strong> Deleted when you close your browser</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Persistent Cookies:</strong> Remain until their expiration date or until you delete them</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Essential Cookies:</strong> Typically expire after 1 year</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Analytics Cookies:</strong> Usually expire after 2 years</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section: Updates to Policy */}
              <div id="updates-to-policy" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Updates to This Policy
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify users of any material changes by posting the updated policy on our website.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Your continued use of Literary Palace after any such changes constitutes your acceptance of the updated Cookie Policy.
                  </p>
                </div>
              </div>

              {/* Section: Contact Us */}
              <div id="contact-us" className="scroll-mt-24">
                <div className="bg-[#07294e] rounded-2xl shadow-lg p-8 md:p-10 text-white">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Contact Us
                  </h2>
                  <p className="text-lg text-gray-200 leading-relaxed mb-4">If you have any questions about our use of cookies, please contact us at:</p>
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
                      Privacy First
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

export default CookiePolicyMain;