import BookmarkButton from '@/components/sharedComponents/BookmarkButton';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await fetch(`${API}/critical-perspectives/${slug}`, { next: { revalidate: 60 } });
    const json = await res.json();
    return { title: json?.data?.title ? `${json.data.title} — Critical Perspectives` : 'Critical Perspectives' };
  } catch { return { title: 'Critical Perspectives' }; }
}

export default async function CriticalPerspectiveDetailPage({ params }) {
  const { slug } = await params;
  const res = await fetch(`${API}/critical-perspectives/${slug}`, { next: { revalidate: 60 } });
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return <main className="min-h-screen flex items-center justify-center"><p>Backend returned invalid response.</p></main>;
  }
  const json = await res.json();
  if (!json.success) return <main className="min-h-screen flex items-center justify-center"><p>Critical perspective not found.</p></main>;
  const item = json.data;
  const c = item.content || {};
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <section className="bg-[#5bc8d8] py-12 px-4">

        <div className="max-w-5xl mx-auto mb-6">
          <Link
            href="/critical-perspectives"
       className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-[#07294e] px-4 py-2 rounded-full shadow-sm transition"
          >
            <ArrowLeft size={18} />
            Back
          </Link>
        </div>



        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-[#07294e]/70 mb-2">Critical Perspectives / {item.category || 'Criticism'}</p>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-[#07294e]">{item.title}</h1>
              {item.excerpt && <p className="mt-4 max-w-3xl text-[#07294e]/80">{item.excerpt}</p>}
            </div>
            <BookmarkButton item={item} articleType="critical-perspective" className="mt-1 flex-shrink-0" />
          </div>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        <Block title="Introduction" body={c.introduction?.body} />
        <Block title="Overview" body={c.overview?.body} />
        <Cards title="Key Theorists" items={c.keyTheorists} getTitle={x => x.name} getBody={x => x.contribution} />
        <Cards title="Examples" items={c.examples} getTitle={x => x.heading} getBody={x => x.body} />
      </section>
    </main>
  );
}

function Block({ title, body = [] }) {
  if (!body?.length) return null;
  return <section className="bg-white rounded-xl border p-6"><h2 className="text-2xl font-bold text-[#07294e] mb-4">{title}</h2><div className="space-y-3 text-gray-700">{body.map((p, i) => <p key={i}>{p}</p>)}</div></section>;
}
function Cards({ title, items = [], getTitle, getBody }) {
  if (!items?.length) return null;
  return <section><h2 className="text-2xl font-bold text-[#07294e] mb-4">{title}</h2><div className="grid gap-4 md:grid-cols-2">{items.map((item, i) => <div key={i} className="bg-white rounded-xl border-l-4 border-[#b5d56a] p-5 shadow-sm"><h3 className="font-bold text-[#07294e] mb-2">{getTitle(item)}</h3><p className="text-gray-700 text-sm">{getBody(item)}</p></div>)}</div></section>;
}
