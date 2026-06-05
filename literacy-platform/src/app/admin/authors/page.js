"use client";
import ContentManager from '@/components/Admin/ContentManager';
export default function CriticalPerspectivesPage() {
  const fields = [
    { name: 'title',    label: 'Title',    type: 'text',     required: true },
    { name: 'slug',     label: 'Slug',     type: 'text',     placeholder: 'auto-filled from title' },
    { name: 'author',   label: 'Author',   type: 'text' },
    { name: 'category', label: 'Category', type: 'select',   required: true, options: ['Criticism','Theories','Philosophies','All'] },
    { name: 'tag',      label: 'Tag',      type: 'text',     placeholder: 'e.g. Critical Guide' },
    { name: 'excerpt',  label: 'Excerpt',  type: 'textarea', required: true, fullWidth: true, rows: 3 },
  ];
  return <ContentManager title="Critical Perspectives" apiEndpoint="critical-perspectives" fields={fields} showCategory />;
}
