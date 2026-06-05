
// Shared components (used across all pages)
import Navbar from '@/components/sharedComponents/Navbar';
import Footer from '@/components/sharedComponents/Footer';

// World Literature page specific components
import RecentlyAddedWorldLiterature from '@/components/Pages/LiteraryPalaceInsights/World Literature/RecentlyAddedWorldLiterature';
import WorldLiteratureInsights from '@/components/Pages/LiteraryPalaceInsights/World Literature/WorldLiteratureInsights';
import WorldLiteratureHero from '@/components/Pages/LiteraryPalaceInsights/World Literature/WorldLiteratureHero';

// Import Premium and Newsletter from home page (reusable)
import PremiumUpgrade from '@/components/Pages/HomePage/PremiumUpgrade';


export default function WorldLiteraturePage() {
  return (
    <main className="min-h-screen">
      {/* Global Navigation */}
      <Navbar />

      {/* Hero Section */}
      <WorldLiteratureHero />

      {/* Recently Added World Literature */}
      <RecentlyAddedWorldLiterature />

      {/* Main World Literature Insights Section */}
      <WorldLiteratureInsights />

      {/* Premium Upgrade CTA */}
      <PremiumUpgrade />

      {/* Global Footer with Newsletter */}
      <Footer />
    </main>
  );
}