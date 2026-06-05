

"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/sharedComponents/Navbar';
import Footer from '@/components/sharedComponents/Footer';
import { BookOpen, Share2, Printer, Download, Bookmark, ChevronRight, Search } from 'lucide-react';
import { toggleBookmark } from '@/lib/bookmarkApi';
import { useActionToast } from '@/components/sharedComponents/ActionToast';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Sample data - replace with actual API call or database query
const literaryTermsData = {
  'allusion': {
    title: 'Allusion',
    category: 'Definition',
    definition: 'An allusion is a subtle reference to a person, place, event, story or work of art that writers use to create a richer text by adding layers of meaning. When a poet mentions "opening Pandora\'s box," they are not telling the entire story or using a simile or metaphor, but are letting the reader understand what happened through the well-known myth.',
    simplifiedDefinition: 'An allusion in an artistic work is a reference to a person, place, object, or event for the purpose of making a connection with readers.',
    detailedSections: [
      {
        heading: 'Examples of Allusion in Literature',
        content: [
          {
            type: 'paragraph',
            text: 'Writers across centuries have used allusion to convey layered meaning:'
          },
          {
            type: 'list',
            items: [
              'In Mary Shelley\'s Frankenstein, the monster alludes to Adam in the Garden of Eden. Like the first man, he is passage of knowledge in his mythic figure described.',
              'A Shakespeare play to spice up a character\'s dialogue with the culture of the modern world.',
              'In Harper Lee\'s To Kill a Mockingbird, Scout alludes to the tale of Boo Radley, which in the novel has become a single reference that carries meaning without overt explanation.',
              'These examples demonstrate how a single reference can carry significant weight in the text, relying on the reader\'s knowledge to decode the allusion\'s full meaning.'
            ]
          }
        ]
      },
      {
        heading: 'Purpose and Function of Allusion',
        content: [
          {
            type: 'paragraph',
            text: 'Allusion lets writers employ fewer words while still adding depth to the text. It allows them to communicate with readers in a mutually understood language. Rather than explaining history, mythology, or literature, writers use allusions to convey ideas, creating a shared experience with the reader.'
          },
          {
            type: 'paragraph',
            text: 'Your partner in "jail style" immediately communicates where or intimately he started. In that text—what makes allusion allusive is that it relies on shared background knowledge.'
          },
          {
            type: 'paragraph',
            text: 'Moreover, allusion often has what a text is a specific cultural or historical context. When readers detect an allusion the text—and the author—feel more accessible.'
          }
        ]
      },
      {
        heading: 'Types of Allusion',
        content: [
          {
            type: 'paragraph',
            text: 'There are different types of allusions because there are so different fields to reference:'
          },
          {
            type: 'list',
            items: [
              'Historical Allusion: References to historical events or figures, such as "meeting his Waterloo" or "a real Benedict Arnold."',
              'Biblical Allusion: References to stories from religious texts, like "the prodigal son" or "David vs. Goliath."',
              'Mythological Allusion: References to popular myths, songs, or films, for example, "Don sing like a Siren."',
              'Literary Allusion: References to other texts or authors, such as "it was a Shakespearean tragedy."'
            ]
          }
        ]
      },
      {
        heading: 'Why Writers Use Allusions',
        content: [
          {
            type: 'paragraph',
            text: 'Writers use allusions to create depth, connect their work to shared knowledge, and make the reader feel smart in recognizing references. Allusion is a tool that writers use to condense meaning, create atmosphere, and link their work to larger cultural narratives in philosophy and history—qualities that turn a simple story into a multidimensional experience.'
          },
          {
            type: 'paragraph',
            text: 'Allusion allows authors to create meaning without explicitly explaining everything. Instead of saying "the character felt betrayed," a writer alludes to something familiar: the text gains richness, subtlety, and nuance.'
          }
        ]
      },
      {
        heading: 'Difference Between Allusion and Reference',
        content: [
          {
            type: 'paragraph',
            text: 'While both terms suggest pointing to something outside the text, there\'s a clear difference. A reference directly names something the reader should know, while an allusion hints at it. For instance, T.S. Eliot\'s "The Waste Land" is a reference, saying, "He was a sad Scrooge about money." Is an allusion. The direct mention asks the reader to retrieve knowledge, and the veiled mention asks them to recognize it.'
          }
        ]
      },
      {
        heading: 'How to Identify an Allusion',
        content: [
          {
            type: 'paragraph',
            text: 'To recognize an allusion, look for references that seem familiar but aren\'t fully explained. If a character says, "I felt like Sisyphus," without the author defining it beyond the story or myth, a historical event, a famous figure, a prior text—or a famous event—it\'s likely an allusion. The context will typically give you enough clues to understand the reference.'
          }
        ]
      },
      {
        heading: 'Famous Allusions in Modern Culture',
        content: [
          {
            type: 'paragraph',
            text: 'Ancient and modern literature and pop culture overlap when modern texts allude to classic works. Phrases like "the Midas Touch," "Achilles\' heel," or "Pandora\'s box" for naming stories are all moments. Even pop lyrics, films, and even memes use allusion to create layers of meaning—showing how this technique continues to be relevant today.'
          }
        ]
      },
      {
        heading: 'Conclusion',
        content: [
          {
            type: 'paragraph',
            text: 'Allusion is one of the most powerful tools in literature. It allows writers to connect their work to broader conversations—across history, art, and imagination. Every great writer—from Shakespeare to Toni Morrison—has used allusions to craft work that feels both immediate and eternal. Whether you\'re analyzing a text or creating one, understanding the relationship between the writer, the reader, and the world itself.'
          }
        ]
      },
      {
        heading: 'Other Helpful Allusion Resources',
        content: [
          {
            type: 'list',
            items: [
              'The Wikipedia Page for Allusion: a complete breakdown and also in-depth entry on allusion, but it has more plot examples.',
              'The Dictionary Definition of Allusion: A basic definition, with a bit of history behind the word.',
              'Allusion in Poetry: Poetry Foundation has an excellent article in which bold authors use to "tell" their tales with other words. It also explores some of the theoretical underpinnings of poetic allusion as a stylistic and cultural strategy.',
              'Allusion in Pop Culture: This Buzzfeed article lists "27 Smart Ways" TV Is Using Allusion: along with discussion of its relationship to a whole something some reason.',
              'Allusion in Film: Check out this article "Allusions? What A Not-so-subtlety Easter Egg Reference."',
              'From Magazine: List of Movies that Tip Things to Other Movies: which doesn\'t use the word "allusion" regularly, that\'s what these kinds of "Easter eggs" or references are doing in TV, film, books, videos, or musical allusion to another classic movie, and most major religions (requires it.'
            ]
          }
        ]
      }
    ],
    relatedTerms: [
      { name: 'Metaphor', slug: 'metaphor' },
      { name: 'Simile', slug: 'simile' },
      { name: 'Symbolism', slug: 'symbolism' },
      { name: 'Imagery', slug: 'imagery' },
      { name: 'Motif', slug: 'motif' },
      { name: 'Theme', slug: 'theme' },
      { name: 'Irony', slug: 'irony' },
      { name: 'Tone', slug: 'tone' },
      { name: 'Foreshadowing', slug: 'foreshadowing' },
      { name: 'Allegory', slug: 'allegory' },
      { name: 'Paradox', slug: 'paradox' },
      { name: 'Personification', slug: 'personification' }
    ]
  },
  // Add more terms as needed
};

const LiteraryTermDetail = ({ slug }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('Definition');
  const [searchQuery, setSearchQuery] = useState('');
  const [term, setTerm] = useState(null);
  const [loading, setLoading] = useState(true);
  const { Toast, showToast } = useActionToast();

  const searchParams = useSearchParams();
  const categoryFromQuery = searchParams?.get('category');
  const backHref = categoryFromQuery && categoryFromQuery !== 'All'
    ? `/literary-terms?category=${encodeURIComponent(categoryFromQuery)}`
    : '/literary-terms';

  // Fetch term data from database
  useEffect(() => {
    async function fetchTerm() {
      try {
        setLoading(true);
        const response = await fetch(`${API}/literary-terms/${encodeURIComponent(slug)}`);
        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          throw new Error('Backend returned HTML instead of JSON. Check the API URL and backend server.');
        }

        const result = await response.json();

        if (response.ok && result.data) {
          // Merge API data with local sample fallbacks where useful.
          const apiTerm = result.data;
          const lookupKey = (slug || '').toLowerCase();
          const altKey = lookupKey.replace(/\s+/g, '-');
          const sample = literaryTermsData[lookupKey] || literaryTermsData[altKey] || literaryTermsData[slug];
          const content = apiTerm.content || {};
          const examplesHtml = Array.isArray(content.examples)
            ? content.examples.map((ex) => `<h3>${ex.heading || ''}</h3><p>${ex.body || ''}</p>`).join('')
            : (typeof apiTerm.examples === 'string' ? apiTerm.examples : '');

          const mergedTerm = {
            ...apiTerm,
            definition: apiTerm.definition || content.definition || sample?.definition || apiTerm.excerpt || '',
            simplified_definition: apiTerm.simplified_definition || apiTerm.simplifiedDefinition || content.simplifiedDef || sample?.simplifiedDefinition || '',
            content: typeof apiTerm.content === 'string' ? apiTerm.content : '',
            examples: examplesHtml || sample?.examples || '',
            relatedTerms: Array.isArray(content.relatedTerms) && content.relatedTerms.length > 0
              ? content.relatedTerms.map((t) => typeof t === 'string' ? { name: t, slug: t.toLowerCase().replace(/[^a-z0-9]+/g, '-') } : t)
              : (apiTerm.relatedTerms && apiTerm.relatedTerms.length > 0 ? apiTerm.relatedTerms : (sample && sample.relatedTerms) || []),
          };

          setTerm(mergedTerm);
        } else {
          // Fallback: create a default term object with properly formatted title
          const formattedTitle = slug
            .replace(/,\s*$/, '') // Remove trailing comma
            .split(/[-_]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          setTerm({
            title: formattedTitle,
            category: 'Definition',
            definition: '',
            simplified_definition: 'This literary term will be available soon.',
            content: '',
            relatedTerms: []
          });
        }
      } catch (error) {
        // Use fallback with formatted title
        const formattedTitle = slug
          .replace(/,\s*$/, '') // Remove trailing comma
          .split(/[-_]/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        setTerm({
          title: formattedTitle,
          category: 'Definition',
          definition: '',
          simplified_definition: 'This literary term will be available soon.',
          content: '',
          relatedTerms: []
        });
      } finally {
        setLoading(false);
      }
    }
    fetchTerm();
  }, [slug]);


  async function handleBookmark() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('lp_token') : '';

    if (!token) {
      showToast('error', 'Please login first');
      return;
    }

    if (!term?._id && !term?.id) {
      showToast('error', 'This term is not available to bookmark yet');
      return;
    }

    try {
      const result = await toggleBookmark({
        articleId: term._id || term.id,
        articleType: 'literary-term',
        title: term.title,
        slug: term.slug || slug,
        image_url: term.image_url || '',
        category: term.category || 'Literary Term',
      });

      if (result.success) {
        setIsBookmarked(result.bookmarked);
        showToast('success', result.bookmarked ? 'Article saved' : 'Article removed');
      } else {
        showToast('error', result.message || 'Bookmark failed');
      }
    } catch {
      showToast('error', 'Could not update bookmark. Please try again.');
    }
  }

  const tabs = ['Definition', 'Examples', 'Function', 'Resources'];

  // Popular terms fallback (used when API doesn't provide popularTerms)
  const popularTermsFallback = [
    { name: 'Metaphor', slug: 'metaphor' },
    { name: 'Simile', slug: 'simile' },
    { name: 'Symbolism', slug: 'symbolism' },
    { name: 'Imagery', slug: 'imagery' },
    { name: 'Irony', slug: 'irony' },
    { name: 'Foreshadowing', slug: 'foreshadowing' },
    { name: 'Allegory', slug: 'allegory' }
  ];

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or filter terms
      window.location.href = `/literary-terms?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  if (loading) {
    return (
      <>
        {Toast}
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!term) {
    return (
      <>
        {Toast}
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-[#07294e] mb-4">Term Not Found</h1>
          <Link href="/literary-terms" className="text-[#b5d56a] hover:underline">
            ← Back to Literary Terms
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {Toast}
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <Link href={backHref} className="text-sm text-[#07294e] hover:underline">← Back to list</Link>
      </div>

      {/* Hero Section with Title */}
      <section
   className="
          relative text-white
          flex items-center justify-center
          min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh]
        "
      >


        {/* Bookmark Button - Top Right Corner */}
        <button
          onClick={handleBookmark}
     className={`absolute top-10 right-6 sm:top-16 sm:right-8 md:top-20 md:right-10 p-3 rounded-md transition-colors z-20 ${isBookmarked
            ? 'bg-[#b5d56a] text-[#07294e]'
            : 'bg-[#b5d56a] text-[#07294e] hover:bg-[#a0c555]'
            }`}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this page'}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Content - Title positioned lower, aligned left */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            {term.title}
          </h1>
        </div>
      </section>

      {/* Tabs Navigation Bar */}
      <section className="bg-[#b5d56a] sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8 py-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
           className={`text-base font-medium transition-colors pb-1 ${activeTab === tab
                  ? 'text-[#07294e] border-b-2 border-[#07294e]'
                  : 'text-[#07294e]/70 hover:text-[#07294e]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Main Content Area */}
            <main className="lg:col-span-9">

              {/* Definition Tab Content */}
              {activeTab === 'Definition' && (
                <>
                  {/* What is {Term}? */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-[#07294e] mb-4">
                      What is {term.title}?
                    </h2>
                    {term.definition && (
                      <p className="text-gray-800 leading-relaxed text-[15px] mb-4">
                        {term.definition}
                      </p>
                    )}
                    {term.excerpt && !term.definition && (
                      <p className="text-gray-800 leading-relaxed text-[15px] mb-4">
                        {term.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Simplified Definition Box */}
                  {(term.simplified_definition || term.simplifiedDefinition) && (
                    <div className="bg-[#f4f4f4] border-l-4 border-[#b5d56a] p-6 mb-10">
                      <h3 className="text-xl font-bold text-[#07294e] mb-3">
                        {term.title} Definition (Simplified)
                      </h3>
                      <p className="text-gray-800 leading-relaxed text-[15px]">
                        {term.simplified_definition || term.simplifiedDefinition}
                      </p>
                    </div>
                  )}

                  {/* Main Content from Database */}
                  {term.content && (
                    <div className="mb-10 prose prose-lg max-w-none">
                      <div
                   className="text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: term.content }}
                      />
                    </div>
                  )}
                </>
              )}

              {/* Examples Tab Content */}
              {activeTab === 'Examples' && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-[#07294e] mb-4">
                    Examples of {term.title}
                  </h2>
                  {term.examples ? (
                    <div
                 className="text-gray-800 leading-relaxed prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: term.examples }}
                    />
                  ) : (
                    <p className="text-gray-600 italic">Examples will be available soon.</p>
                  )}
                </div>
              )}

              {/* Function Tab Content */}
              {activeTab === 'Function' && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-[#07294e] mb-4">
                    Function of {term.title}
                  </h2>
                  {term.function ? (
                    <div
                 className="text-gray-800 leading-relaxed prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: term.function }}
                    />
                  ) : (
                    <p className="text-gray-600 italic">Function information will be available soon.</p>
                  )}
                </div>
              )}

              {/* Resources Tab Content */}
              {activeTab === 'Resources' && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-[#07294e] mb-4">
                    Resources for {term.title}
                  </h2>
                  {term.resources ? (
                    <div
                 className="text-gray-800 leading-relaxed prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: term.resources }}
                    />
                  ) : (
                    <p className="text-gray-600 italic">Additional resources will be available soon.</p>
                  )}
                </div>
              )}

              {/* Detailed Sections (fallback for hardcoded data) - only show in Definition tab */}
              {activeTab === 'Definition' && term.detailedSections && term.detailedSections.map((section, index) => (
                <div key={index} className="mb-10">
                  <h2 className="text-2xl font-bold text-[#07294e] mb-4">
                    {section.heading}
                  </h2>
                  {section.content.map((contentBlock, idx) => (
                    <div key={idx} className="mb-4">
                      {contentBlock.type === 'paragraph' && (
                        <p className="text-gray-800 leading-relaxed text-[15px] mb-4">
                          {contentBlock.text}
                        </p>
                      )}
                      {contentBlock.type === 'list' && (
                        <ul className="list-disc list-outside space-y-3 text-gray-800 ml-6 mb-4">
                          {contentBlock.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="leading-relaxed text-[15px] pl-2">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </main>

            {/* Right Sidebar - Related Terms & Upgrade */}
            <aside className="lg:col-span-3">
              <div className="sticky top-32 space-y-6">

                {/* Search Bar */}
                <div className="bg-white border-2 border-[#b5d56a] rounded-lg p-4 shadow-sm">
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search"
                 className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b5d56a] focus:border-transparent text-gray-700 placeholder-gray-400"
                    />
                    <button
                      type="submit"
                 className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                      aria-label="Search"
                    >
                      <Search className="w-5 h-5 text-gray-500" />
                    </button>
                  </form>
                </div>

                {/* Upgrade to Literary Palace Plus */}
                <div
             className="relative bg-[#f4f4f4] border-2 border-[#b5d56a] p-6 flex flex-col justify-between
  opacity-0 translate-y-5 animate-[fadeUp_0.6s_ease-out_forwards]"
                >
                  <div>
                    <h3 className="text-xl md:text-2xl mt-4 -mb-2 font-bold text-[#07294e] text-center">
                      Upgrade to
                    </h3>

                    <div className="flex items-center justify-center mb-3">
                      <div className="relative inline-block">
                        <Image
                          src="/Logo Icons/Literary Palace SVG-01.svg"
                          alt="Literary Palace"
                          width={160}
                          height={50}
                     className="h-10 w-auto object-contain"
                        />

                        <span className="absolute top-2 right-4 text-[11px] md:text-[11px] font-merriweather text-[#07294e] uppercase">
                          PLUS
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-2 text-center">
                      Download clear Literary Terms PDFs, definitions, examples,
                      and analysis for quick study.
                    </p>

                    <Image
                      src="/A+ Icon-01.svg"
                      alt="A+"
                      width={56}
                      height={56}
                 className="absolute top-2 right-1 h-11 w-11 object-contain z-30"
                    />

                    <div className="flex items-center justify-center mb-6">
                      <Image
                        src="/UpgradeToLP-01.svg"
                        alt="Upgrade illustration"
                        width={170}
                        height={170}
                   className="w-55 h-auto object-contain"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button className="bg-[#07294e] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0a3a6b] transition-colors cursor-pointer">
                      Download
                    </button>
                  </div>
                </div>

                {/* Can't find the insight you need? */}
                <div className="bg-[#b5d56a] py-7 px-6 w-full flex flex-col items-center justify-center text-[#07294e] shadow-sm">
                  <p className="text-sm font-medium mb-5">Can&apos;t find the insight you need?</p>
                  <button className="bg-[#07294e] text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-95 transition cursor-pointer -mb-2">
                    Request for Insight
                  </button>
                </div>

                {/* Related Literary Terms (Compact Card — matches design) */}
                {term.relatedTerms && term.relatedTerms.length > 0 && (
                  <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                    <div className="bg-[#07294e] px-4 py-2">
                      <h3 className="text-sm font-semibold text-white">Related Literary Terms</h3>
                    </div>
                    <div className="bg-white">
                      {term.relatedTerms.map((relatedTerm, index) => (
                        <Link
                          key={index}
                          href={`/literary-terms/${relatedTerm.slug}`}
                     className="block text-sm text-[#07294e] px-4 py-2 border-t border-[#eaf3d8] hover:bg-white transition-colors"
                        >
                          {relatedTerm.name}
                        </Link>
                      ))}
                    </div>
                    <div className="p-2 bg-white">
                      <Link
                        href="/literary-terms"
                   className="block text-center bg-[#b5d56a] text-[#07294e] px-3 py-2 rounded-sm font-semibold hover:bg-[#a0c555] transition-colors"
                      >
                        See All Literary Terms
                      </Link>
                    </div>
                  </div>
                )}

                {/* Popular Literary Terms (Compact List) */}
                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm mt-6">
                  <div className="bg-[#07294e] px-4 py-2">
                    <h3 className="text-sm font-semibold text-white">Popular Literary Terms</h3>
                  </div>
                  <div className="bg-white">
                    {(term.popularTerms && term.popularTerms.length > 0 ? term.popularTerms : popularTermsFallback).map((popTerm, idx) => (
                      <Link
                        key={idx}
                        href={`/literary-terms/${popTerm.slug}`}
                   className="block text-sm text-[#07294e] px-4 py-2 border-t border-[#eaf3d8] hover:bg-white transition-colors"
                      >
                        {popTerm.name}
                      </Link>
                    ))}
                  </div>
                  <div className="p-2 bg-white">
                    <Link
                      href="/literary-terms"
                 className="block text-center bg-[#b5d56a] text-[#07294e] px-3 py-2 rounded-sm font-semibold hover:bg-[#a0c555] transition-colors"
                    >
                      See All Literary Terms
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LiteraryTermDetail;