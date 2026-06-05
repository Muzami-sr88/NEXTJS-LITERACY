"use client";
import ContentManager from '@/components/Admin/ContentManager';
export default function WorldLiteraturePage() {
  const fields = [
    { name: 'title',   label: 'Title',   type: 'text',     required: true },
    { name: 'slug',    label: 'Slug',    type: 'text',     placeholder: 'auto-filled from title' },
    { name: 'author',  label: 'Author',  type: 'text' },
    { name: 'region',  label: 'Region',  type: 'text',     placeholder: 'e.g. Africa, Latin America' },
    { name: 'tag',     label: 'Tag',     type: 'text',     placeholder: 'e.g. World Lit Guide' },
    { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true, fullWidth: true, rows: 3 },
  ];
  return <ContentManager title="World Literature" apiEndpoint="world-literature" fields={fields} showCategory />;
}
