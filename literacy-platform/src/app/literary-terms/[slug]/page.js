import LiteraryTermDetail from '@/components/Pages/LiteraryPalaceInsights/LiteraryTerms/LiteraryTermDetail';

export async function generateMetadata({ params }) {
  // params may be a promise in Next.js app routes — await it
  const p = await params;
  const slug = decodeURIComponent(p.slug);
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `${title} - Literary Terms - Literary Palace`,
    description: `Learn about ${title} with clear definitions, examples, and analysis. Literary Palace provides comprehensive literary term explanations.`,
  };
}

export default async function LiteraryTermPage({ params }) {
  const p = await params;
  const slug = decodeURIComponent(p.slug);
  return <LiteraryTermDetail slug={slug} />;
}
