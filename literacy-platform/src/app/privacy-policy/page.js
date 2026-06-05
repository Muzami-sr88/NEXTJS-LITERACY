import Navbar from '@/components/sharedComponents/Navbar';
import Footer from '@/components/sharedComponents/Footer';
import PrivacyPolicyHero from '@/components/Pages/PrivacyPolicyPage/PrivacyPolicyHero';
import PrivacyPolicyMain from '@/components/Pages/PrivacyPolicyPage/PrivacyPolicyMain';
import PremiumUpgrade from '@/components/Pages/HomePage/PremiumUpgrade';

export const metadata = {
  title: 'Privacy Policy - Literary Palace',
  description: 'Privacy Policy for Literary Palace — how we protect your data and information',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <PrivacyPolicyHero />

      <PrivacyPolicyMain />

      <PremiumUpgrade />

      <Footer />
    </main>
  );
}
