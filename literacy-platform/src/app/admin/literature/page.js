"use client";

import ContentManager from '@/components/Admin/ContentManager';

export default function LiteraturePage() {
  const fields = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'slug', label: 'Slug', type: 'text', placeholder: 'auto-generated if empty' },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: ['All', 'History', 'Poetry', 'Authors', 'Novels', 'Dramas/Plays', 'Short Stories', 'Prose/Essays'],
    },
    { name: 'author', label: 'Author', type: 'text' },
    { name: 'tag', label: 'Card Badge / Tag', type: 'text', placeholder: 'Lit Guide' },
    { name: 'excerpt', label: 'Excerpt', type: 'textarea', fullWidth: true, rows: 3 },

    // Fixed LitCharts-style tabs. The tab titles are fixed on frontend.
    // Admin only adds content/options inside those tabs.
    { name: 'content', label: 'LitCharts Style Detail Content', type: 'literatureContent', fullWidth: true },
  ];

  return (
    <ContentManager
      title="Literature"
      apiEndpoint="literature"
      fields={fields}
      showCategory={true}
    />
  );
}
