import { Suspense } from "react";
import CriticalPerspectivesPage from "@/components/Pages/LiteraryPalaceInsights/CriticalPerspectives/CriticalPerspectivesPage";

export const metadata = {
  title: "Critical Perspectives - Literary Palace",
  description: "Explore critical perspectives, literary criticism, theories, and philosophies.",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading critical perspectives...</p>
        </main>
      }
    >
      <CriticalPerspectivesPage />
    </Suspense>
  );
}