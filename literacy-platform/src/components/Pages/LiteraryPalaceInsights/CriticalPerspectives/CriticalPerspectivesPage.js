
// Shared components (used across all pages)
import Navbar from '@/components/sharedComponents/Navbar';
import Footer from '@/components/sharedComponents/Footer';

// Critical Perspectives page specific components
import RecentlyAddedCriticalPerspectives from '@/components/Pages/LiteraryPalaceInsights/CriticalPerspectives/RecentlyAddedCriticalPerspectives';
import CriticalPerspectivesInsights from '@/components/Pages/LiteraryPalaceInsights/CriticalPerspectives/CriticalPerspectivesInsights';
import CriticalPerspectivesHero from '@/components/Pages/LiteraryPalaceInsights/CriticalPerspectives/CriticalPerspectivesHero';

// Import Premium and Newsletter from home page (reusable)
import PremiumUpgrade from '@/components/Pages/HomePage/PremiumUpgrade';


export default function CriticalPerspectivesPage() {
  return (
    <main className="min-h-screen">
      {/* Global Navigation */}
      <Navbar />

      {/* Hero Section */}
      <CriticalPerspectivesHero />

      {/* Recently Added Critical Perspectives */}
      <RecentlyAddedCriticalPerspectives />

      {/* Main Critical Perspectives Insights Section */}
      <CriticalPerspectivesInsights />

      {/* Premium Upgrade CTA */}
      <PremiumUpgrade />

      {/* Global Footer with Newsletter */}
      <Footer />
    </main>
  );
}