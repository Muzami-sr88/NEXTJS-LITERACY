import Navbar from '@/components/sharedComponents/Navbar';
import Footer from '@/components/sharedComponents/Footer';
import ContactUsHero from '@/components/Pages/ContactUsPage/ContactUsHero';
import ContactUsMain from '@/components/Pages/ContactUsPage/ContactUsMain';
import PremiumUpgrade from '@/components/Pages/HomePage/PremiumUpgrade';

export const metadata = {
  title: 'Contact Us - Literary Palace',
  description: 'Contact Literary Palace for support, inquiries, collaborations, and feedback',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <ContactUsHero />

      <ContactUsMain />

      <PremiumUpgrade />

      <Footer />
    </main>
  );
}
