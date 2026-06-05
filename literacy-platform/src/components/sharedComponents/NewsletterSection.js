"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("Thank you for subscribing!");
    setFirstName("");
    setLastName("");
    setEmail("");
    window.setTimeout(() => setMessage(""), 3000);
  }

  return (
    <section className="py-16 relative z-10 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#c3e26e] p-8 md:p-12 rounded-2xl shadow-xl relative z-10 -mb-45">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Left Column - Text */}
              <div>
                <div className="inline-block bg-[#07294e]/10 px-4 py-1 rounded-full text-[#07294e] text-xs font-semibold tracking-wider uppercase mb-3">
                  Stay Updated
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#07294e] mb-4 leading-tight">
                  Subscribe for our latest news and updates!
                </h2>
                <p className="text-[#07294e] text-lg leading-relaxed">
                  By entering your email address you agree to receive emails from Literary Palace.
                </p>
              </div>

              {/* Right Column - Form */}
              <form onSubmit={handleSubmit} className="space-y-4" aria-label="Newsletter subscription">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#07294e] bg-white focus:outline-none focus:ring-2 focus:ring-[#07294e] focus:border-[#07294e] transition-all duration-200 text-[#07294e] placeholder:text-[#07294e]/60"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#07294e] bg-white focus:outline-none focus:ring-2 focus:ring-[#07294e] focus:border-[#07294e] transition-all duration-200 text-[#07294e] placeholder:text-[#07294e]/60"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 w-full px-4 py-3 rounded-xl border-2 border-[#07294e] bg-white focus:outline-none focus:ring-2 focus:ring-[#07294e] focus:border-[#07294e] transition-all duration-200 text-[#07294e] placeholder:text-[#07294e]/60"
                  />
                  <button
                    type="submit"
                    className="bg-[#07294e] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#0a3a6b] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
                  >
                    Subscribe
                  </button>
                </div>

                {message && (
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#07294e] bg-white/50 px-4 py-2 rounded-lg">
                    <span className="text-lg">✓</span> {message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}