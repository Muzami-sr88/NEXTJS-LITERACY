import Navbar from '@/components/sharedComponents/Navbar';
import Footer from '@/components/sharedComponents/Footer';
import CookiePolicyHero from '@/components/Pages/CookiePolicyPage/CookiePolicyHero';
import CookiePolicyMain from '@/components/Pages/CookiePolicyPage/CookiePolicyMain';
import PremiumUpgrade from '@/components/Pages/HomePage/PremiumUpgrade';

export const metadata = {
  title: 'Cookie Policy - Literary Palace',
  description: 'Cookie Policy for Literary Palace website and services',
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <CookiePolicyHero />

      <CookiePolicyMain />

      <PremiumUpgrade />

      <Footer />
    </main>
  );
}
