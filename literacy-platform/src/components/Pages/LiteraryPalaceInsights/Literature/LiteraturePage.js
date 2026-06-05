
// Shared components (used across all pages)
import Navbar from '@/components/sharedComponents/Navbar';
import Footer from '@/components/sharedComponents/Footer';

// Literature page specific components
import LiteratureHero from '@/components/Pages/LiteraryPalaceInsights/Literature/LiteratureHero';
import RecentlyAddedLiterature from '@/components/Pages/LiteraryPalaceInsights/Literature/RecentlyAddedLiterature';
import LiteratureInsights from '@/components/Pages/LiteraryPalaceInsights/Literature/LiteratureInsights';

// Import Premium and Newsletter from home page (reusable)
import PremiumUpgrade from '@/components/Pages/HomePage/PremiumUpgrade';

export const metadata = {
  title: "Literature - Literary Palace",
  description: "Explore our curated collection of literary works, summaries, character analyses, and guides for novels and modern literature.",
};

export default function LiteraturePage() {
  return (
    <main className="min-h-screen">
      {/* Global Navigation */}
      <Navbar />

      {/* Hero Section */}
      <LiteratureHero />

      {/* Recently Added Literature */}
      <RecentlyAddedLiterature />



      {/* Main Literature Insights Section */}
      <LiteratureInsights />

      {/* Premium Upgrade CTA */}
      <PremiumUpgrade />

      {/* Global Footer with Newsletter */}
      <Footer />
    </main>
  );
}
