// src/app/literature/[slug]/page.js

import LiteratureDetail from '@/components/Pages/LiteraryPalaceInsights/Literature/LiteratureDetail';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// ✅ await params — required in Next.js 15
export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await fetch(`${API}/literature/${slug}`, { cache: 'no-store' });
    const json = await res.json();
    if (!json.success) return { title: 'Literature — Literary Palace' };
    return {
      title: `${json.data.title} — Literary Palace`,
      description: json.data.excerpt || `Study guide for ${json.data.title}`,
    };
  } catch {
    return { title: 'Literature — Literary Palace' };
  }
}

// ✅ await params — required in Next.js 15
export default async function LiteratureDetailPage({ params }) {
  const { slug } = await params;
  try {
    const res = await fetch(`${API}/literature/${slug}`, { next: { revalidate: 60 } });
    const json = await res.json();

    if (!json.success) {
      return (
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#07294e] mb-2">Not Found</h1>
            <p className="text-gray-500">This literature guide could not be found.</p>
          </div>
        </main>
      );
    }

    return <LiteratureDetail guide={json.data} />;
  } catch (err) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#07294e] mb-2">Error</h1>
          <p className="text-gray-500">Could not connect to the backend. Is the server running on port 5000?</p>
        </div>
      </main>
    );
  }
}