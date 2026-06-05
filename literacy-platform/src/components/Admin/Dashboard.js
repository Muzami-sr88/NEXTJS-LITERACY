"use client";

import { useEffect, useState } from 'react';
import AdminForm from '@/components/Admin/AdminForm';
import { useActionToast } from '@/components/sharedComponents/ActionToast';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function authHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

const Dashboard = () => {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingSlug, setEditingSlug] = useState(null);
  const [editValues, setEditValues] = useState({});

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/literary-terms?limit=100`);
      const json = await res.json();
      setTerms(json?.data || []);
    } catch (err) { console.warn(err); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function startEdit(item) {
    setEditingId(item._id);
    setEditingSlug(item.slug);
    setEditValues({ title: item.title, slug: item.slug, excerpt: item.excerpt, content: item.content?.definition || '' });
  }
  function cancelEdit() { setEditingId(null); setEditingSlug(null); setEditValues({}); }

  async function saveEdit() {
    try {
      const res = await fetch(`${API}/literary-terms/${editingSlug}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify({ ...editValues, category: 'General' }) });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Failed to save');
      await load(); cancelEdit(); showToast('success', 'Saved successfully');
    } catch (err) { showToast('error', err.message || String(err)); }
  }

  async function removeItem(item) {
    if (!confirm('Delete this term?')) return;
    try {
      const res = await fetch(`${API}/literary-terms/${item.slug}`, { method: 'DELETE', headers: authHeaders() });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Failed to delete');
      await load();
      showToast('success', 'Deleted successfully');
    } catch (err) { showToast('error', err.message || String(err)); }
  }

  return (
    <>
      {Toast}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Literary Terms</h2>
            {loading && <div>Loading from backend...</div>}
            {!loading && terms.length === 0 && <div className="text-gray-500">No terms found.</div>}
            <ul className="space-y-4">
              {terms.map(term => (
                <li key={term._id} className="border rounded p-4 flex justify-between items-start">
                  <div className="flex-1">
                    {editingId === term._id ? (
                      <div className="space-y-2">
                        <input value={editValues.title} onChange={(e) => setEditValues(v => ({ ...v, title: e.target.value }))} className="w-full border px-2 py-1 rounded" />
                        <input value={editValues.slug} onChange={(e) => setEditValues(v => ({ ...v, slug: e.target.value }))} className="w-full border px-2 py-1 rounded" />
                        <textarea value={editValues.excerpt} onChange={(e) => setEditValues(v => ({ ...v, excerpt: e.target.value }))} className="w-full border px-2 py-1 rounded" rows={3} />
                      </div>
                    ) : (
                      <div><h3 className="text-lg font-semibold">{term.title}</h3><p className="text-sm text-gray-600">{term.excerpt}</p><div className="text-xs text-gray-400 mt-1">Slug: {term.slug}</div></div>
                    )}
                  </div>
                  <div className="ml-4 flex flex-col gap-2">
                    {editingId === term._id ? <><button onClick={saveEdit} className="bg-green-600 text-white px-3 py-1 rounded">Save</button><button onClick={cancelEdit} className="bg-gray-200 px-3 py-1 rounded">Cancel</button></> : <><button onClick={() => startEdit(term)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button><button onClick={() => removeItem(term)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button></>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div><div className="bg-white p-4 rounded shadow"><h2 className="text-lg font-semibold mb-4">Create New Term</h2><AdminForm onCreated={load} /></div></div>
      </div>
      </div>
    </>
  );
};

export default Dashboard;






// "use client";

// import { useEffect, useState } from 'react';
// import AdminForm from '@/components/Admin/AdminForm';
// import { useActionToast } from '@/components/sharedComponents/ActionToast';
// import { Plus, Edit2, Trash2, Save, X, Search, Loader2, BookOpen, Calendar, Hash } from 'lucide-react';

// const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// function authHeaders() {
//   const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';
//   return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
// }

// const Dashboard = () => {
//   const [terms, setTerms] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [editingSlug, setEditingSlug] = useState(null);
//   const [editValues, setEditValues] = useState({});
//   const [search, setSearch] = useState('');
//   const { Toast, showToast } = useActionToast();

//   async function load() {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API}/literary-terms?limit=100`);
//       const json = await res.json();
//       setTerms(json?.data || []);
//     } catch (err) { 
//       console.warn(err);
//       showToast('error', 'Failed to load terms');
//     } finally { 
//       setLoading(false); 
//     }
//   }

//   useEffect(() => { load(); }, []);

//   function startEdit(item) {
//     setEditingId(item._id);
//     setEditingSlug(item.slug);
//     setEditValues({ 
//       title: item.title, 
//       slug: item.slug, 
//       excerpt: item.excerpt, 
//       content: item.content?.definition || '' 
//     });
//   }
  
//   function cancelEdit() { 
//     setEditingId(null); 
//     setEditingSlug(null); 
//     setEditValues({}); 
//   }

//   async function saveEdit() {
//     try {
//       const res = await fetch(`${API}/literary-terms/${editingSlug}`, { 
//         method: 'PUT', 
//         headers: authHeaders(), 
//         body: JSON.stringify({ ...editValues, category: 'General' }) 
//       });
//       const json = await res.json();
//       if (!json.success) throw new Error(json.message || 'Failed to save');
//       await load(); 
//       cancelEdit(); 
//       showToast('success', 'Saved successfully');
//     } catch (err) { 
//       showToast('error', err.message || String(err)); 
//     }
//   }

//   async function removeItem(item) {
//     if (!confirm('Delete this term?')) return;
//     try {
//       const res = await fetch(`${API}/literary-terms/${item.slug}`, { 
//         method: 'DELETE', 
//         headers: authHeaders() 
//       });
//       const json = await res.json();
//       if (!json.success) throw new Error(json.message || 'Failed to delete');
//       await load();
//       showToast('success', 'Deleted successfully');
//     } catch (err) { 
//       showToast('error', err.message || String(err)); 
//     }
//   }

//   const filteredTerms = terms.filter(term => 
//     term.title?.toLowerCase().includes(search.toLowerCase()) ||
//     term.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
//     term.slug?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>
//       {Toast}
//       <div className="min-h-screen bg-[#f8fafc] py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-extrabold text-[#07294e]">Literary Terms Dashboard</h1>
//             <p className="text-gray-500 mt-1">Manage all literary terms and definitions</p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
//             {/* Main Content - Terms List */}
//             <div className="lg:col-span-2">
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                
//                 {/* List Header */}
//                 <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                   <div>
//                     <h2 className="text-lg font-bold text-[#07294e]">All Terms</h2>
//                     <p className="text-xs text-gray-500 mt-0.5">{filteredTerms.length} total terms</p>
//                   </div>
                  
//                   {/* Search */}
//                   <div className="relative w-full sm:w-64">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                     <input
//                       value={search}
//                       onChange={e => setSearch(e.target.value)}
//                       placeholder="Search terms..."
//                       className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#07294e] bg-white"
//                     />
//                   </div>
//                 </div>

//                 {/* Loading State */}
//                 {loading && (
//                   <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
//                     <Loader2 className="w-6 h-6 animate-spin" />
//                     <span className="text-sm font-medium">Loading terms...</span>
//                   </div>
//                 )}

//                 {/* Empty State */}
//                 {!loading && terms.length === 0 && (
//                   <div className="py-20 text-center text-gray-400">
//                     <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
//                     <p className="font-medium">No terms found</p>
//                     <p className="text-sm mt-1">Create your first literary term using the form on the right.</p>
//                   </div>
//                 )}

//                 {/* No Results State */}
//                 {!loading && terms.length > 0 && filteredTerms.length === 0 && (
//                   <div className="py-12 text-center text-gray-400">
//                     <p className="font-medium">No results found for "{search}"</p>
//                     <p className="text-sm mt-1">Try adjusting your search term.</p>
//                   </div>
//                 )}

//                 {/* Terms List */}
//                 {!loading && filteredTerms.length > 0 && (
//                   <ul className="divide-y divide-gray-100">
//                     {filteredTerms.map(term => (
//                       <li key={term._id} className="p-5 hover:bg-gray-50 transition-colors">
//                         {editingId === term._id ? (
//                           /* Edit Mode */
//                           <div className="space-y-3 bg-[#f8fafc] p-4 rounded-xl border border-[#c3e26e]">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                               <div>
//                                 <label className="block text-xs font-semibold text-[#07294e] mb-1">Title</label>
//                                 <input 
//                                   value={editValues.title} 
//                                   onChange={(e) => setEditValues(v => ({ ...v, title: e.target.value }))} 
//                                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#07294e]"
//                                   placeholder="Term title"
//                                 />
//                               </div>
//                               <div>
//                                 <label className="block text-xs font-semibold text-[#07294e] mb-1">Slug</label>
//                                 <input 
//                                   value={editValues.slug} 
//                                   onChange={(e) => setEditValues(v => ({ ...v, slug: e.target.value }))} 
//                                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#07294e]"
//                                   placeholder="URL slug"
//                                 />
//                               </div>
//                             </div>
//                             <div>
//                               <label className="block text-xs font-semibold text-[#07294e] mb-1">Excerpt</label>
//                               <textarea 
//                                 value={editValues.excerpt} 
//                                 onChange={(e) => setEditValues(v => ({ ...v, excerpt: e.target.value }))} 
//                                 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#07294e] resize-y"
//                                 rows={2}
//                                 placeholder="Brief description"
//                               />
//                             </div>
//                             <div className="flex gap-2 pt-2 border-t border-gray-200">
//                               <button 
//                                 onClick={saveEdit} 
//                                 className="inline-flex items-center gap-1 px-4 py-1.5 bg-[#07294e] text-white rounded-lg text-sm font-semibold hover:bg-[#0a3461] transition-colors"
//                               >
//                                 <Save className="w-3.5 h-3.5" /> Save
//                               </button>
//                               <button 
//                                 onClick={cancelEdit} 
//                                 className="inline-flex items-center gap-1 px-4 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
//                               >
//                                 <X className="w-3.5 h-3.5" /> Cancel
//                               </button>
//                             </div>
//                           </div>
//                         ) : (
//                           /* View Mode */
//                           <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
//                             <div className="flex-1">
//                               <div className="flex items-center gap-2 flex-wrap">
//                                 <h3 className="text-lg font-bold text-[#07294e]">{term.title}</h3>
//                                 <span className="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
//                                   <Hash className="w-3 h-3" /> {term.slug}
//                                 </span>
//                               </div>
//                               {term.excerpt && (
//                                 <p className="text-sm text-gray-600 mt-1 line-clamp-2">{term.excerpt}</p>
//                               )}
//                               <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
//                                 <span className="flex items-center gap-1">
//                                   <Calendar className="w-3 h-3" /> 
//                                   {term.createdAt ? new Date(term.createdAt).toLocaleDateString() : '—'}
//                                 </span>
//                               </div>
//                             </div>
//                             <div className="flex gap-1 flex-shrink-0">
//                               <button 
//                                 onClick={() => startEdit(term)} 
//                                 className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer" 
//                                 title="Edit"
//                               >
//                                 <Edit2 className="w-4 h-4" />
//                               </button>
//                               <button 
//                                 onClick={() => removeItem(term)} 
//                                 className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" 
//                                 title="Delete"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </div>

//             {/* Sidebar - Create Form */}
//             <div>
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-6">
//                 <div className="p-5 border-b border-gray-100">
//                   <h2 className="text-lg font-bold text-[#07294e] flex items-center gap-2">
//                     <Plus className="w-5 h-5" /> Create New Term
//                   </h2>
//                 </div>
//                 <div className="p-5">
//                   <AdminForm onCreated={load} />
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;