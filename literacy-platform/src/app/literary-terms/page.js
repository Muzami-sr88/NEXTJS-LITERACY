import { Suspense } from "react";
import LiteraryTermsPage from "@/components/Pages/LiteraryPalaceInsights/LiteraryTerms/LiteraryTermsPage";

export const metadata = {
  title: "Literary Terms - Literary Palace",
  description: "Explore literary terms with definitions, examples, and simple explanations.",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading literary terms...</p>
        </main>
      }
    >
      <LiteraryTermsPage />
    </Suspense>
  );
}
