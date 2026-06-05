import Image from 'next/image';
import Link from 'next/link';
import NewsletterSection from './NewsletterSection';

// ============================================
// MAIN FOOTER COMPONENT
// ============================================
const Footer = () => {
  return (
    <>
      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer Section */}
      <footer className="bg-[#07294e] text-white py-16 mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Section - Logo and Social Icons */}
          <div className="flex items-center justify-between mb-12 mt-30 footer-top">
            <div className="mt-2 logo-wrap">
              <Image
                src="/Logo Icons/Literary Palace SVG-01.svg"
                alt="Literary Palace Logo"
                width={160}
                height={50}
           className="h-12 w-auto object-contain filter brightness-0 invert"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <div className="flex space-x-4 items-center social-icons">
              {/* each icon is a white circular button with the icon in navy */}
              <a href="#" aria-label="Facebook" className="bg-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-[#b5d56a] transition-colors duration-200 shadow-sm">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
             className="text-[#07294e]"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="bg-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-[#b5d56a] transition-colors duration-200 shadow-sm">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
             className="text-[#07294e]"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="bg-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-[#b5d56a] transition-colors duration-200 shadow-sm">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
             className="text-[#07294e]"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="bg-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-[#b5d56a] transition-colors duration-200 shadow-sm">
                <Image
                  src="https://cdn.simpleicons.org/x/07294e"
                  alt="X"
                  width={20}
                  height={20}
                  unoptimized
             className="w-5 h-5"
                />
              </a>
              {/* Removed X icon as requested */}
              <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="bg-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-[#b5d56a] transition-colors duration-200 shadow-sm">
                <Image
                  src="https://cdn.simpleicons.org/pinterest/07294e"
                  alt="X"
                  width={20}
                  height={20}
                  unoptimized
             className="w-5 h-5"
                />
              </a>
              <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="bg-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-[#b5d56a] transition-colors duration-200 shadow-sm">

                <Image
                  src="https://cdn.simpleicons.org/tiktok/07294e"
                  alt="X"
                  width={20}
                  height={20}
                  unoptimized
             className="w-5 h-5"
                />

              </a>
            </div>
          </div>

          {/* Main Content - 5 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 footer-grid">

            {/* Column 1 - Description */}
            <div className="lg:col-span-1 footer-description">
              <p className="text-sm leading-relaxed text-gray-300 mb-6">
                Literary Palace is your premier digital library. We provide expert crafted study guides, in-depth literary analysis, and resources for students, teachers, and literature lovers worldwide.
              </p>
              <div className="text-xs text-gray-400 space-y-1">
                <p><strong>Ph:</strong> 032-45859385</p>
                <p><strong>Email:</strong> official@literarypalace.com</p>
                <p><strong>Address:</strong> Thal University Bhakkar</p>
              </div>
            </div>

            {/* Column 2 - Explore */}
            <div>
              <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Explore</h3>
              <ul className="space-y-2">
                <li><Link href="/literature" className="text-sm text-gray-300 hover:text-white transition-colors">Literature</Link></li>
                <li><Link href="/literary-terms" className="text-sm text-gray-300 hover:text-white transition-colors">Literary Terms</Link></li>
                <li><Link href="/critical-perspectives" className="text-sm text-gray-300 hover:text-white transition-colors">Critical Guides</Link></li>
                <li><Link href="/world-literature" className="text-sm text-gray-300 hover:text-white transition-colors">World Literature</Link></li>
                <li><Link href="/services" className="text-sm text-gray-300 hover:text-white transition-colors">Our Services</Link></li>
              </ul>
            </div>

            {/* Column 3 - Premium Tools */}
            <div>
              <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Premium Tools</h3>
              <ul className="space-y-2">
                <li><Link href="/ai-tools" className="text-sm text-gray-400 hover:text-white transition-colors">Literary Palace AI</Link></li>
                <li><Link href="/question-generator" className="text-sm text-gray-400 hover:text-white transition-colors">Question Generator</Link></li>
                <li><Link href="/plagiarism-checker" className="text-sm text-gray-400 hover:text-white transition-colors">Plagiarism Checker</Link></li>
                <li><Link href="/discussions" className="text-sm text-gray-400 hover:text-white transition-colors">Discussions</Link></li>
                <li><Link href="/journals" className="text-sm text-gray-400 hover:text-white transition-colors">Journals</Link></li>
                <li><Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">Login</Link></li>
                <li><Link href="/sign-up" className="text-sm text-gray-400 hover:text-white transition-colors">Sign Up</Link></li>
              </ul>
            </div>

            {/* Column 4 - Literature */}
            <div>
              <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Literature</h3>
              <ul className="space-y-2">
                <li><Link href="/history" className="text-sm text-gray-400 hover:text-white transition-colors">History</Link></li>
                <li><Link href="/poetry" className="text-sm text-gray-400 hover:text-white transition-colors">Poetry</Link></li>
                <li><Link href="/novel" className="text-sm text-gray-400 hover:text-white transition-colors">Novel</Link></li>
                <li><Link href="/drama" className="text-sm text-gray-400 hover:text-white transition-colors">Drama/Plays</Link></li>
                <li><Link href="/short-stories" className="text-sm text-gray-400 hover:text-white transition-colors">Short Stories</Link></li>
                <li><Link href="/authors" className="text-sm text-gray-400 hover:text-white transition-colors">Authors</Link></li>
                <li><Link href="/prose-essays" className="text-sm text-gray-400 hover:text-white transition-colors">Prose/Essays</Link></li>
              </ul>
            </div>

            {/* Column 5 - About Us */}
            <div>
              <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">About Us</h3>
              <ul className="space-y-2">
                <li><Link href="/our-team" className="text-sm text-gray-400 hover:text-white transition-colors">Our Team</Link></li>
                <li><Link href="/about-us" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>

        </div>
        {/* Full-width divider */}
        <div className="footer-full-divider" />

        {/* Bottom Copyright Section (kept inside container for alignment) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>All Rights Reserved. Copyright © 2025 Literary Palace</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span>|</span>
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms and Conditions</Link>
              <span>|</span>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
              <span>|</span>
              <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;