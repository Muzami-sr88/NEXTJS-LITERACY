"use client";
import { useState, useEffect } from "react";

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Your Information" },
  { id: "data-security", label: "Data Security" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "third-party", label: "Third-Party Services" },
  { id: "your-rights", label: "Your Rights" },
  { id: "contact-us", label: "Contact Us" },
];

const PrivacyPolicyMain = () => {
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
                    At Literary Palace, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our platform. Your continued use of Literary Palace indicates your acceptance of this Privacy Policy.
                  </p>
                </div>
              </div>

              {/* Section: Information We Collect */}
              <div id="information-we-collect" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Information We Collect
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">We may collect information about you in a variety of ways. The information we may collect on the site includes:</p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Personal Data:</strong> When you register, subscribe, or contact us, we may collect your name, email address, phone number, and other contact details.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Account Information:</strong> Login credentials, profile information, preferences, and activity history.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Payment Information:</strong> Credit card details and billing information (processed securely through third-party payment gateways).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Usage Data:</strong> Pages visited, time spent, links clicked, and interactions with our content.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Communication Data:</strong> Messages, feedback, and inquiries you send to us.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section: How We Use */}
              <div id="how-we-use" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    How We Use Your Information
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">We use the information we collect for various purposes:</p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>To provide, maintain, and improve our services.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>To process transactions and send transaction confirmations.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>To send promotional emails, newsletters, and updates (with your consent).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>To respond to your inquiries and provide customer support.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>To personalize your experience and tailor content to your interests.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>To analyze usage patterns and improve our website design and functionality.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>To enforce our terms of service and other agreements.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>To comply with legal obligations and protect our rights.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section: Data Security */}
              <div id="data-security" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Data Security
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Our security measures include:
                  </p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>SSL/TLS encryption for secure data transmission.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Secure password storage using industry-standard hashing.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Regular security audits and vulnerability assessments.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Limited access to personal data by authorized personnel only.</span>
                    </li>
                  </ul>
                  <p className="text-lg text-gray-700 leading-relaxed mt-4">
                    However, no method of transmission over the Internet is 100% secure. While we strive to protect your personal data, we cannot guarantee absolute security.
                  </p>
                </div>
              </div>

              {/* Section: Cookies */}
              <div id="cookies" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Cookies & Tracking Technologies
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Literary Palace uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us:
                  </p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Remember your preferences and login information.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Track website usage and performance.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Deliver personalized content and advertisements.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Improve our services based on your behavior.</span>
                    </li>
                  </ul>
                  <p className="text-lg text-gray-700 leading-relaxed mt-4">
                    You can control cookie settings through your browser preferences. Disabling cookies may limit certain site functionality.
                  </p>
                </div>
              </div>

              {/* Section: Third-Party */}
              <div id="third-party" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Third-Party Services
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    We may use third-party service providers to assist with our operations, including:
                  </p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Payment processors for secure transaction handling.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Analytics platforms to understand user behavior.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Email service providers for communications.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span>Hosting providers for website infrastructure.</span>
                    </li>
                  </ul>
                  <p className="text-lg text-gray-700 leading-relaxed mt-4">
                    These third parties are contractually obligated to use your data only as necessary to provide services and to maintain confidentiality. We recommend reviewing their privacy policies as well.
                  </p>
                </div>
              </div>

              {/* Section: Your Rights */}
              <div id="your-rights" className="scroll-mt-24">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Your Rights
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Depending on your location, you may have the following rights regarding your personal data:
                  </p>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Right to Access:</strong> You can request a copy of the personal data we hold about you.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Right to Rectification:</strong> You can request correction of inaccurate or incomplete data.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Right to Erasure:</strong> You can request deletion of your personal data under certain circumstances.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Right to Restrict Processing:</strong> You can limit how we process your data.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Right to Withdraw Consent:</strong> You can withdraw consent for data processing at any time.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Right to Opt-Out:</strong> You can unsubscribe from promotional communications.</span>
                    </li>
                  </ul>
                  <p className="text-lg text-gray-700 leading-relaxed mt-4">
                    To exercise any of these rights, please contact us using the information provided in the Contact Us section.
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
                  <p className="text-lg text-gray-200 leading-relaxed mb-4">
                    If you have questions about this Privacy Policy, your data, or our privacy practices, please contact us at:
                  </p>
                  <ul className="space-y-3 text-gray-200 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Email:</strong> privacy@literarypalace.com</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Official Email:</strong> official@literarypalace.com</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c3e26e] text-xl">✦</span>
                      <span><strong>Address:</strong> Literary Palace, [Your Address Here]</span>
                    </li>
                  </ul>
                  <p className="text-lg text-gray-200 leading-relaxed mt-4">
                    We will respond to your inquiry within 30 days. Thank you for trusting Literary Palace with your information.
                  </p>
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

export default PrivacyPolicyMain;