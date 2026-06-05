"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Save, X, Search, Loader2, AlertCircle, CheckCircle, Hash, Upload, Image as ImageIcon } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_ORIGIN = API.replace(/\/api\/?$/, '');

function getToken() {
  if (typeof window !== 'undefined') return localStorage.getItem('admin_token') || '';
  return '';
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
}

// Simple rich-text toolbar
function RichEditor({ value, onChange }) {
  const ref = useRef(null);
  const cmd = (c, v = null) => { document.execCommand(c, false, v); ref.current?.focus(); };
  useEffect(() => {
    if (ref.current && value !== ref.current.innerHTML) ref.current.innerHTML = value || '';
  }, []);
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200">
        {[['B','bold'],['I','italic'],['U','underline']].map(([l,c]) => (
          <button key={c} type="button" onClick={() => cmd(c)} className="w-7 h-7 text-sm font-bold hover:bg-gray-200 rounded">{l}</button>
        ))}
        <div className="w-px h-6 bg-gray-300 mx-1 self-center"/>
        <button type="button" onClick={() => cmd('insertUnorderedList')} className="px-2 h-7 text-xs hover:bg-gray-200 rounded">• List</button>
        <button type="button" onClick={() => cmd('insertOrderedList')} className="px-2 h-7 text-xs hover:bg-gray-200 rounded">1. List</button>
      </div>
      <div
        ref={ref}
        contentEditable
        onInput={() => onChange(ref.current?.innerHTML || '')}
   className="min-h-[200px] p-3 text-sm outline-none prose prose-sm max-w-none"
        suppressContentEditableWarning
      />
    </div>
  );
}



function toLines(value) {
  return Array.isArray(value) ? value.join('\n') : '';
}
function fromLines(value) {
  return String(value || '').split(/\n+/).map(x => x.trim()).filter(Boolean);
}
function emptyLiteratureContent() {
  return {
    introduction: { body: [] },
    plotSummary: { body: [] },
    summaryAnalysis: { chapters: [] },
    themes: [],
    quotes: [],
    characters: [],
    terms: [],
    symbols: [],
    themeWheel: { body: [], themes: [] },
  };
}
function normalizeLiteratureContent(value) {
  const c = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  return {
    introduction: { body: Array.isArray(c.introduction?.body) ? c.introduction.body : [] },
    plotSummary: { body: Array.isArray(c.plotSummary?.body) ? c.plotSummary.body : [] },
    summaryAnalysis: { chapters: Array.isArray(c.summaryAnalysis?.chapters) ? c.summaryAnalysis.chapters : [] },
    themes: Array.isArray(c.themes) ? c.themes : [],
    quotes: Array.isArray(c.quotes) ? c.quotes : [],
    characters: Array.isArray(c.characters) ? c.characters : [],
    terms: Array.isArray(c.terms) ? c.terms : [],
    symbols: Array.isArray(c.symbols) ? c.symbols : [],
    themeWheel: {
      body: Array.isArray(c.themeWheel?.body) ? c.themeWheel.body : [],
      themes: Array.isArray(c.themeWheel?.themes) ? c.themeWheel.themes : [],
    },
  };
}

function SmallButton({ children, onClick, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
 className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${danger ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-[#b5d56a] text-[#07294e] hover:opacity-90'}`}
    >
      {children}
    </button>
  );
}

function TextInput(props) {
  return (
    <input
      {...props}
 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#07294e]"
    />
  );
}

function TextArea(props) {
  return (
    <textarea
      {...props}
 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#07294e] resize-y"
    />
  );
}

function Block({ title, note, children }) {
  return (
    <div className="md:col-span-2 border border-gray-200 rounded-2xl p-4 bg-gray-50/50 space-y-3">
      <div>
        <h3 className="text-sm font-bold text-[#07294e]">{title}</h3>
        {note && <p className="text-xs text-gray-500 mt-0.5">{note}</p>}
      </div>
      {children}
    </div>
  );
}

function LiteratureContentEditor({ value, onChange }) {
  const content = normalizeLiteratureContent(value);

  const update = (next) => onChange(normalizeLiteratureContent(next));
  const setTextArray = (section, key, text) => {
    update({ ...content, [section]: { ...content[section], [key]: fromLines(text) } });
  };
  const addArrayItem = (key, item) => update({ ...content, [key]: [...(content[key] || []), item] });
  const updateArrayItem = (key, index, patch) => {
    const next = [...(content[key] || [])];
    next[index] = { ...next[index], ...patch };
    update({ ...content, [key]: next });
  };
  const removeArrayItem = (key, index) => {
    const next = [...(content[key] || [])];
    next.splice(index, 1);
    update({ ...content, [key]: next });
  };
  const updateChapter = (index, patch) => {
    const chapters = [...content.summaryAnalysis.chapters];
    chapters[index] = { ...chapters[index], ...patch };
    update({ ...content, summaryAnalysis: { chapters } });
  };
  const removeChapter = (index) => {
    const chapters = [...content.summaryAnalysis.chapters];
    chapters.splice(index, 1);
    update({ ...content, summaryAnalysis: { chapters } });
  };
  const addChapter = () => update({
    ...content,
    summaryAnalysis: {
      chapters: [...content.summaryAnalysis.chapters, { title: '', summary: '', analysis: '' }],
    },
  });
  const updateWheelTheme = (index, patch) => {
    const themes = [...content.themeWheel.themes];
    themes[index] = { ...themes[index], ...patch };
    update({ ...content, themeWheel: { ...content.themeWheel, themes } });
  };
  const removeWheelTheme = (index) => {
    const themes = [...content.themeWheel.themes];
    themes.splice(index, 1);
    update({ ...content, themeWheel: { ...content.themeWheel, themes } });
  };
  const addWheelTheme = () => update({
    ...content,
    themeWheel: { ...content.themeWheel, themes: [...content.themeWheel.themes, { label: '', color: '#07294e', pct: 0 }] },
  });

  return (
    <div className="md:col-span-2 space-y-4">
      <Block title="Introduction" note="Fixed top tab. Add paragraphs, one per line.">
        <TextArea rows={4} value={toLines(content.introduction.body)} onChange={e => setTextArray('introduction', 'body', e.target.value)} />
      </Block>

      <Block title="Plot Summary" note="Fixed top tab. Add paragraphs, one per line.">
        <TextArea rows={4} value={toLines(content.plotSummary.body)} onChange={e => setTextArray('plotSummary', 'body', e.target.value)} />
      </Block>

      <Block title="Summary & Analysis Dropdown Options" note="Admin adds dynamic chapter options. Each chapter appears under the fixed Summary & Analysis dropdown.">
        {content.summaryAnalysis.chapters.map((chapter, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-3 space-y-2">
            <div className="flex justify-between gap-2"><b className="text-xs text-gray-500">Chapter {index + 1}</b><SmallButton danger onClick={() => removeChapter(index)}>Remove</SmallButton></div>
            <TextInput placeholder="Dropdown option title e.g. Chapter 1" value={chapter.title || ''} onChange={e => updateChapter(index, { title: e.target.value })} />
            <TextArea rows={3} placeholder="Summary" value={chapter.summary || ''} onChange={e => updateChapter(index, { summary: e.target.value })} />
            <TextArea rows={3} placeholder="Analysis" value={chapter.analysis || ''} onChange={e => updateChapter(index, { analysis: e.target.value })} />
          </div>
        ))}
        <SmallButton onClick={addChapter}>+ Add Chapter Option</SmallButton>
      </Block>

      <Block title="Themes Dropdown Options" note="Dynamic theme options under fixed Themes tab.">
        {content.themes.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-3 space-y-2">
            <div className="flex justify-between"><b className="text-xs text-gray-500">Theme {index + 1}</b><SmallButton danger onClick={() => removeArrayItem('themes', index)}>Remove</SmallButton></div>
            <div className="grid md:grid-cols-[1fr_120px] gap-2">
              <TextInput placeholder="Dropdown option title e.g. The American Dream" value={item.title || ''} onChange={e => updateArrayItem('themes', index, { title: e.target.value })} />
              <TextInput type="color" value={item.color || '#07294e'} onChange={e => updateArrayItem('themes', index, { color: e.target.value })} />
            </div>
            <TextArea rows={3} placeholder="Theme explanation" value={item.desc || ''} onChange={e => updateArrayItem('themes', index, { desc: e.target.value })} />
          </div>
        ))}
        <SmallButton onClick={() => addArrayItem('themes', { title: '', color: '#07294e', desc: '' })}>+ Add Theme Option</SmallButton>
      </Block>

      <Block title="Quotes" note="Fixed Quotes tab. These show as quote cards.">
        {content.quotes.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-3 space-y-2">
            <div className="flex justify-between"><b className="text-xs text-gray-500">Quote {index + 1}</b><SmallButton danger onClick={() => removeArrayItem('quotes', index)}>Remove</SmallButton></div>
            <TextArea rows={2} placeholder="Quote text" value={item.quote || ''} onChange={e => updateArrayItem('quotes', index, { quote: e.target.value })} />
            <div className="grid md:grid-cols-3 gap-2">
              <TextInput placeholder="Attribution" value={item.attribution || ''} onChange={e => updateArrayItem('quotes', index, { attribution: e.target.value })} />
              <TextInput placeholder="Tag e.g. Theme" value={item.tag || ''} onChange={e => updateArrayItem('quotes', index, { tag: e.target.value })} />
              <TextInput type="color" value={item.theme || '#07294e'} onChange={e => updateArrayItem('quotes', index, { theme: e.target.value })} />
            </div>
          </div>
        ))}
        <SmallButton onClick={() => addArrayItem('quotes', { quote: '', attribution: '', tag: 'Theme', theme: '#07294e' })}>+ Add Quote</SmallButton>
      </Block>

      <Block title="Characters Dropdown Options" note="Dynamic character options under fixed Characters dropdown.">
        {content.characters.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-3 space-y-2">
            <div className="flex justify-between"><b className="text-xs text-gray-500">Character {index + 1}</b><SmallButton danger onClick={() => removeArrayItem('characters', index)}>Remove</SmallButton></div>
            <div className="grid md:grid-cols-[1fr_1fr_120px] gap-2">
              <TextInput placeholder="Dropdown option name e.g. Gatsby" value={item.name || ''} onChange={e => updateArrayItem('characters', index, { name: e.target.value })} />
              <TextInput placeholder="Role" value={item.role || ''} onChange={e => updateArrayItem('characters', index, { role: e.target.value })} />
              <TextInput type="color" value={item.color || '#07294e'} onChange={e => updateArrayItem('characters', index, { color: e.target.value })} />
            </div>
            <TextArea rows={3} placeholder="Character description" value={item.desc || ''} onChange={e => updateArrayItem('characters', index, { desc: e.target.value })} />
          </div>
        ))}
        <SmallButton onClick={() => addArrayItem('characters', { name: '', role: '', color: '#07294e', desc: '' })}>+ Add Character Option</SmallButton>
      </Block>

      <Block title="Terms Dropdown Options" note="Dynamic term options under fixed Terms dropdown.">
        {content.terms.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-3 space-y-2">
            <div className="flex justify-between"><b className="text-xs text-gray-500">Term {index + 1}</b><SmallButton danger onClick={() => removeArrayItem('terms', index)}>Remove</SmallButton></div>
            <TextInput placeholder="Dropdown option term" value={item.term || ''} onChange={e => updateArrayItem('terms', index, { term: e.target.value })} />
            <TextArea rows={3} placeholder="Definition / explanation" value={item.def || ''} onChange={e => updateArrayItem('terms', index, { def: e.target.value })} />
          </div>
        ))}
        <SmallButton onClick={() => addArrayItem('terms', { term: '', def: '' })}>+ Add Term Option</SmallButton>
      </Block>

      <Block title="Symbols Dropdown Options" note="Dynamic symbol options under fixed Symbols dropdown.">
        {content.symbols.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-3 space-y-2">
            <div className="flex justify-between"><b className="text-xs text-gray-500">Symbol {index + 1}</b><SmallButton danger onClick={() => removeArrayItem('symbols', index)}>Remove</SmallButton></div>
            <div className="grid md:grid-cols-[1fr_120px] gap-2">
              <TextInput placeholder="Dropdown option symbol e.g. Green Light" value={item.symbol || ''} onChange={e => updateArrayItem('symbols', index, { symbol: e.target.value })} />
              <TextInput type="color" value={item.color || '#07294e'} onChange={e => updateArrayItem('symbols', index, { color: e.target.value })} />
            </div>
            <TextArea rows={3} placeholder="Symbol explanation" value={item.desc || ''} onChange={e => updateArrayItem('symbols', index, { desc: e.target.value })} />
          </div>
        ))}
        <SmallButton onClick={() => addArrayItem('symbols', { symbol: '', color: '#07294e', desc: '' })}>+ Add Symbol Option</SmallButton>
      </Block>

      <Block title="Theme Wheel" note="Fixed tab. Add body paragraphs and progress items.">
        <TextArea rows={3} placeholder="Theme wheel intro, one paragraph per line" value={toLines(content.themeWheel.body)} onChange={e => update({ ...content, themeWheel: { ...content.themeWheel, body: fromLines(e.target.value) } })} />
        {content.themeWheel.themes.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-3 space-y-2">
            <div className="flex justify-between"><b className="text-xs text-gray-500">Wheel Item {index + 1}</b><SmallButton danger onClick={() => removeWheelTheme(index)}>Remove</SmallButton></div>
            <div className="grid md:grid-cols-[1fr_120px_100px] gap-2">
              <TextInput placeholder="Label" value={item.label || ''} onChange={e => updateWheelTheme(index, { label: e.target.value })} />
              <TextInput type="color" value={item.color || '#07294e'} onChange={e => updateWheelTheme(index, { color: e.target.value })} />
              <TextInput type="number" min="0" max="100" placeholder="%" value={item.pct ?? 0} onChange={e => updateWheelTheme(index, { pct: Number(e.target.value) })} />
            </div>
          </div>
        ))}
        <SmallButton onClick={addWheelTheme}>+ Add Theme Wheel Item</SmallButton>
      </Block>
    </div>
  );
}

export default function ContentManager({ title, apiEndpoint, fields, showCategory = false }) {
  const [items,     setItems]     = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [saving,    setSaving]    = useState(false);
  const [search,    setSearch]    = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing,   setEditing]   = useState(null);  // null = create, object = edit
  const [formData,  setFormData]  = useState({});
  const [toast,     setToast]     = useState(null);  // {type, msg}
  const [deleting,  setDeleting]  = useState(null);

  const endpoint = `${API}/${apiEndpoint}`;

  function showToast(type, msg) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }

  async function load() {
    setLoading(true);
    try {
      const res  = await fetch(`${endpoint}?limit=100`);
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error(`Backend returned non-JSON response for ${apiEndpoint}`);
      }
      const json = await res.json();
      setItems(Array.isArray(json.data) ? json.data : []);
    } catch {
      showToast('error', 'Could not connect to backend. Is the server running?');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [apiEndpoint]);

  function openCreate() {
    const blank = {};
    fields.forEach(f => { blank[f.name] = f.type === 'literatureContent' ? emptyLiteratureContent() : (f.default || ''); });
    setEditing(null);
    setFormData(blank);
    setShowModal(true);
  }

  function openEdit(item) {
    const data = {};
    fields.forEach(f => { data[f.name] = f.type === 'literatureContent' ? normalizeLiteratureContent(item[f.name]) : (item[f.name] ?? ''); });
    setEditing(item);
    setFormData(data);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditing(null);
    setFormData({});
  }

  async function handleImageUpload(fieldName, file) {
    if (!file) return;
    const form = new FormData();
    form.append('image', file);
    showToast('success', 'Uploading image...');
    try {
      const res = await fetch(`${API}/upload/image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: form,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Image upload failed');
      setFormData(prev => ({ ...prev, [fieldName]: json.url }));
      showToast('success', 'Image uploaded successfully!');
    } catch (err) {
      showToast('error', err.message);
    }
  }

  // Auto-generate slug from title
  function handleTitleChange(val) {
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: prev.slug || val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit  = !!editing;
      const slug    = editing?.slug;
      const url     = isEdit ? `${endpoint}/${slug}` : endpoint;
      const method  = isEdit ? 'PUT' : 'POST';

      const res  = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(formData) });
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('Backend returned HTML/non-JSON response. Check route URL and backend server.');
      }
      const json = await res.json();

      if (!json.success) throw new Error(json.message || 'Save failed');

      showToast('success', isEdit ? 'Updated successfully!' : 'Created successfully!');
      closeModal();
      load();
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item) {
    if (!confirm(`Delete "${item.title || item.name}"? This cannot be undone.`)) return;
    setDeleting(item._id);
    try {
      const res  = await fetch(`${endpoint}/${item.slug}`, { method: 'DELETE', headers: authHeaders() });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Delete failed');
      showToast('success', 'Deleted successfully!');
      load();
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setDeleting(null);
    }
  }

  const filtered = items.filter(i =>
    (i.title || i.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (i.excerpt || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${
          toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#07294e]">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} total items</p>
        </div>
        <button type="button" onClick={openCreate}
     className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#07294e] text-white rounded-xl font-semibold text-sm hover:bg-[#0a3461] transition-colors cursor-pointer shadow">
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder={`Search ${title.toLowerCase()}...`}
     className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#07294e] bg-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-sm">Loading from database...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <p className="font-medium">{search ? 'No results found' : `No ${title.toLowerCase()} yet`}</p>
            <p className="text-sm mt-1">{!search && 'Click "Add New" to create the first one.'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Title</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Slug</th>
                  {showCategory && <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Category</th>}
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Created</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(item => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-900 text-sm">{item.title || item.name}</p>
                      {item.excerpt && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 max-w-xs">{item.excerpt}</p>}
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="flex items-center gap-1 text-xs text-gray-500 font-mono">
                        <Hash className="w-3 h-3" />{item.slug}
                      </span>
                    </td>
                    {showCategory && (
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="inline-block bg-[#b5d56a] text-[#07294e] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          {item.category || item.region || '—'}
                        </span>
                      </td>
                    )}
                    <td className="px-5 py-4 text-xs text-gray-400 hidden lg:table-cell">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button type="button" onClick={() => openEdit(item)}
                     className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => handleDelete(item)} disabled={deleting === item._id}
                     className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50" title="Delete">
                          {deleting === item._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-bold text-[#07294e]">
                {editing ? `Edit — ${editing.title || editing.name}` : `Add New ${title}`}
              </h2>
              <button type="button" onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-xl cursor-pointer">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map(field => (
                  <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>

                    {field.name === 'title' ? (
                      <input type="text" required value={formData.title || ''} onChange={e => handleTitleChange(e.target.value)}
                        placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                   className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#07294e]" />
                    ) : field.type === 'literatureContent' ? (
                      <LiteratureContentEditor
                        value={formData[field.name]}
                        onChange={v => setFormData(p => ({ ...p, [field.name]: v }))}
                      />
                    ) : field.type === 'richtext' ? (
                      <RichEditor value={formData[field.name] || ''} onChange={v => setFormData(p => ({...p, [field.name]: v}))} />
                    ) : field.type === 'textarea' ? (
                      <textarea rows={field.rows || 4} required={field.required}
                        value={formData[field.name] || ''} onChange={e => setFormData(p => ({...p, [field.name]: e.target.value}))}
                        placeholder={field.placeholder}
                   className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#07294e] resize-none" />
                    ) : field.type === 'select' ? (
                      <select required={field.required} value={formData[field.name] || ''}
                        onChange={e => setFormData(p => ({...p, [field.name]: e.target.value}))}
                   className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#07294e] bg-white">
                        <option value="">Select {field.label}</option>
                        {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : field.type === 'image' ? (
                      <div className="space-y-3">
                        {formData[field.name] ? (
                          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-gray-50">
                            <Image
                              src={formData[field.name].startsWith('/uploads') ? `${API_ORIGIN}${formData[field.name]}` : formData[field.name]}
                              alt="Uploaded preview"
                              width={80}
                              height={80}
                              unoptimized
                         className="w-20 h-20 rounded-lg object-cover border"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-gray-700">Current image</p>
                              <p className="text-xs text-gray-500 break-all">{formData[field.name]}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-gray-400 border border-dashed border-gray-300 rounded-xl p-4">
                            <ImageIcon className="w-4 h-4" /> No image selected
                          </div>
                        )}
                        <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#b5d56a] text-[#07294e] rounded-xl text-sm font-semibold cursor-pointer hover:opacity-90">
                          <Upload className="w-4 h-4" /> Upload Image
                          <input
                            type="file"
                            accept="image/*"
                       className="hidden"
                            onChange={e => handleImageUpload(field.name, e.target.files?.[0])}
                          />
                        </label>
                        <input
                          type="text"
                          value={formData[field.name] || ''}
                          onChange={e => setFormData(p => ({...p, [field.name]: e.target.value}))}
                          placeholder="/uploads/images/example.jpg or external image URL"
                     className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#07294e]"
                        />
                      </div>
                    ) : (
                      <input type={field.type || 'text'} required={field.required}
                        value={formData[field.name] || ''} onChange={e => setFormData(p => ({...p, [field.name]: e.target.value}))}
                        placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                   className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#07294e]" />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
             className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#07294e] text-white rounded-xl font-semibold text-sm hover:bg-[#0a3461] transition-colors disabled:opacity-50 cursor-pointer">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin"/>Saving...</> : <><Save className="w-4 h-4"/>{editing ? 'Update' : 'Create'}</>}
                </button>
                <button type="button" onClick={closeModal}
             className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
