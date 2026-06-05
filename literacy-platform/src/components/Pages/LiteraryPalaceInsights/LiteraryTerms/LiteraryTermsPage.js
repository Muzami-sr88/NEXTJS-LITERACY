import { Suspense } from 'react';
import Navbar from '@/components/sharedComponents/Navbar';
import Footer from '@/components/sharedComponents/Footer';
import RecentlyAddedLiteraryTerms from '@/components/Pages/LiteraryPalaceInsights/LiteraryTerms/RecentlyAddedLiteraryTerms';
import LiteraryTermsHero from '@/components/Pages/LiteraryPalaceInsights/LiteraryTerms/LiteraryTermsHero';
import PremiumUpgrade from '@/components/Pages/HomePage/PremiumUpgrade';

export const metadata = {
  title: "Literary Terms - Literary Palace",
  description: "Explore our curated collection of literary terms, definitions, examples, and analysis for deeper literary understanding.",
};

export default function LiteraryTermsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <LiteraryTermsHero />
      <Suspense fallback={<div className="py-16 text-center">Loading terms...</div>}>
        <RecentlyAddedLiteraryTerms />
      </Suspense>
      <PremiumUpgrade />
      <Footer />
    </main>
  );
}
