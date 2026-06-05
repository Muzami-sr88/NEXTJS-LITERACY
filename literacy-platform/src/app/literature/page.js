import { Suspense } from "react";
import LiteraturePage from "../../components/Pages/LiteraryPalaceInsights/Literature/LiteraturePage";

export const metadata = {
  title: "Literature - Literary Palace",
  description: "Explore literature guides, summaries, themes, characters, and analysis.",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading literature...</p>
        </main>
      }
    >
      <LiteraturePage />
    </Suspense>
  );
}