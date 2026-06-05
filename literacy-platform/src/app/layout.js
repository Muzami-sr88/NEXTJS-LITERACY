// 
import { Merriweather, Raleway } from "next/font/google";
import "./globals.css";


const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// Site metadata for SEO
export const metadata = {
  title: {
    default: 'Literary Palace',
    template: '%s — Literary Palace',  // other pages use this template
  },
  description: 'Discover the beauty of literature with comprehensive guides, analysis, and insights into the greatest works of human imagination.',
  keywords: ['literature', 'literary terms', 'study guide', 'poetry', 'novels', 'world literature'],
  authors: [{ name: 'Literary Palace' }],
  creator: 'Literary Palace',
  metadataBase: new URL('https://literarypalace.com'),
  openGraph: {
    type: 'website',
    siteName: 'Literary Palace',
    title: 'Literary Palace',
    description: 'Discover the beauty of literature with comprehensive guides and analysis.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Literary Palace',
    description: 'Discover the beauty of literature.',
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning
   className={`${merriweather.variable} ${raleway.variable}  antialiased`}
      >

        {children}

      </body>
    </html>
  );
}
