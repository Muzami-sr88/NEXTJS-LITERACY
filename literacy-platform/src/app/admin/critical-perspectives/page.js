"use client";

import ContentManager from '@/components/Admin/ContentManager';

export default function CriticalPerspectivesPage() {
  const fields = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'slug', label: 'Slug', type: 'text', placeholder: 'auto-generated if empty' },
    { 
      name: 'category', 
      label: 'Category', 
      type: 'select', 
      required: true,
      options: ['Criticism', 'Theories', 'Philosophies']
    },
    { name: 'excerpt', label: 'Excerpt', type: 'textarea', fullWidth: true, rows: 3 },
    { name: 'content', label: 'Content', type: 'richtext', fullWidth: true, rows: 10 },
  ];

  return (
    <ContentManager
      title="Critical Perspectives"
      apiEndpoint="critical-perspectives"
      fields={fields}
      showCategory={true}
    />
  );
}
