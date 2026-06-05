import { Suspense } from "react";
import WorldLiteraturePage from "@/components/Pages/LiteraryPalaceInsights/World Literature/WorldLiteraturePage";

export const metadata = {
  title: "World Literature - Literary Palace",
  description:
    "Explore world literature guides, summaries, themes, characters, and analysis.",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading world literature...</p>
        </main>
      }
    >
      <WorldLiteraturePage />
    </Suspense>
  );
}