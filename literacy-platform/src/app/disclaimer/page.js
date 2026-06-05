import Navbar from '@/components/sharedComponents/Navbar';
import Footer from '@/components/sharedComponents/Footer';
import DisclaimerHero from '@/components/Pages/DisclaimerPage/DisclaimerHero';
import DisclaimerMain from '@/components/Pages/DisclaimerPage/DisclaimerMain';
import PremiumUpgrade from '@/components/Pages/HomePage/PremiumUpgrade';

export const metadata = {
  title: 'Disclaimer - Literary Palace',
  description: 'Disclaimer for Literary Palace website and services',
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <DisclaimerHero />

      <DisclaimerMain />

      <PremiumUpgrade />

      <Footer />
    </main>
  );
}
