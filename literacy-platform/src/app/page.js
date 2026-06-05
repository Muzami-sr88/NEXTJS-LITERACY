
// Shared components (used across all pages)
import Navbar from '@/components/sharedComponents/Navbar';
import Footer from "@/components/sharedComponents/Footer"
import Hero from "@/components/Pages/HomePage/Hero";
import AboutUs from "@/components/Pages/HomePage/AboutUs"
import RecentlyAdded from "@/components/Pages/HomePage/RecentlyAdded";
import LiteraryPalaceServices from "@/components/Pages/HomePage/LiteraryPalaceServices"
import PremiumUpgrade from "@/components/Pages/HomePage/PremiumUpgrade"
import Booksshowcase from "@/components/Pages/HomePage/BooksShowcase"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Global Navigation */}
      <Navbar />

      <Hero />

      <AboutUs />

      <RecentlyAdded />

      <LiteraryPalaceServices />

      <Booksshowcase />

      <PremiumUpgrade />

      <Footer />

    </main>
  );
}
