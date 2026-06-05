import Navbar from '@/components/sharedComponents/Navbar';
import Footer from '@/components/sharedComponents/Footer';
import TermsAndConditionsHero from '@/components/Pages/TermsAndConditionsPage/TermsAndConditionsHero';
import TermsAndConditionsMain from '@/components/Pages/TermsAndConditionsPage/TermsAndConditionsMain';
import PremiumUpgrade from '@/components/Pages/HomePage/PremiumUpgrade';

export const metadata = {
  title: 'Terms and Conditions - Literary Palace',
  description: 'Terms and Conditions for using Literary Palace website and services',
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <TermsAndConditionsHero />

      <TermsAndConditionsMain />

      <PremiumUpgrade />

      <Footer />
    </main>
  );
}
