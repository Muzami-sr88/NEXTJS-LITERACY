"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Download,
  Menu,
  X,
} from "lucide-react";
import { toggleBookmark } from "@/lib/bookmarkApi";
import { useActionToast } from "@/components/sharedComponents/ActionToast";

// ✅ Main tab titles are FIXED like LitCharts.
// ✅ Only dropdown OPTIONS are dynamic from admin/backend.
const TABS = [
  { id: "introduction", label: "Introduction", dropdown: false },
  { id: "plotSummary", label: "Plot Summary", dropdown: false },
  { id: "summaryAnalysis", label: "Summary & Analysis", dropdown: true, labelKey: "title" },
  { id: "themes", label: "Themes", dropdown: true, labelKey: "title" },
  { id: "quotes", label: "Quotes", dropdown: false },
  { id: "characters", label: "Characters", dropdown: true, labelKey: "name" },
  { id: "terms", label: "Terms", dropdown: true, labelKey: "term" },
  { id: "symbols", label: "Symbols", dropdown: true, labelKey: "symbol" },
  { id: "themeWheel", label: "Theme Wheel", dropdown: false },
];

function arr(value) {
  return Array.isArray(value) ? value : [];
}

function getDropdownOptions(tabId, content) {
  switch (tabId) {
    case "summaryAnalysis":
      return arr(content?.summaryAnalysis?.chapters);
    case "themes":
      return arr(content?.themes);
    case "characters":
      return arr(content?.characters);
    case "terms":
      return arr(content?.terms);
    case "symbols":
      return arr(content?.symbols);
    default:
      return [];
  }
}

function getOptionLabel(option, tab, index) {
  return (
    option?.[tab.labelKey] ||
    option?.title ||
    option?.name ||
    option?.term ||
    option?.symbol ||
    `Option ${index + 1}`
  );
}

function SectionShell({ title, children }) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#07294e] mb-6 tracking-tight">
        {title}
      </h2>
      {children}
    </article>
  );
}

function EmptyState({ label }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-gray-500 text-sm">
      Admin has not added {label} content for this article yet.
    </div>
  );
}

function Paragraphs({ body, label }) {
  const paragraphs = arr(body).filter((x) => String(x || "").trim());
  if (!paragraphs.length) return <EmptyState label={label} />;
  return (
    <div className="space-y-5 text-gray-700 text-base md:text-lg leading-8">
      {paragraphs.map((p, i) => (
        <p key={i} className="whitespace-pre-line">{p}</p>
      ))}
    </div>
  );
}

function PrevNext({ activeTab, setActiveTab }) {
  const index = TABS.findIndex((t) => t.id === activeTab);
  const prev = TABS[index - 1];
  const next = TABS[index + 1];

  return (
    <div className="flex items-center justify-between mb-6 text-sm">
      {prev ? (
        <button
          type="button"
          onClick={() => setActiveTab(prev.id)}
     className="text-gray-500 hover:text-[#07294e] flex items-center gap-1"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          {prev.label}
        </button>
      ) : (
        <span />
      )}

      {next ? (
        <button
          type="button"
          onClick={() => setActiveTab(next.id)}
     className="text-gray-500 hover:text-[#07294e] flex items-center gap-1"
        >
          {next.label}
          <ChevronRight className="w-4 h-4" />
        </button>
      ) : (
        <span />
      )}
      </div>
  );
}

function TopTabs({ activeTab, setActiveTab, selected, setSelected, content }) {
  const [open, setOpen] = useState(null);

  return (
    <nav className="hidden md:flex items-stretch whitespace-nowrap">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const options = getDropdownOptions(tab.id, content);

        return (
          <div
            key={tab.id}
       className="relative flex-shrink-0"
            onMouseLeave={() => setOpen(null)}
          >
            <button
              type="button"
              onMouseEnter={() => tab.dropdown && setOpen(tab.id)}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.dropdown) setOpen(open === tab.id ? null : tab.id);
              }}
         className={`h-full px-4 py-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${isActive
                ? "border-[#07294e] text-[#07294e] bg-[#f9fce8]"
                : "border-transparent text-gray-600 hover:text-[#07294e] hover:bg-gray-50"
                }`}
            >
              {tab.label}
              {tab.dropdown && (
                <ChevronDown
             className={`w-4 h-4 transition-transform ${open === tab.id ? "rotate-180" : ""}`}
                />
              )}
            </button>

            {tab.dropdown && open === tab.id && (
              <div className="absolute left-0 top-full z-[999] w-80 max-h-96 overflow-y-auto bg-white border border-gray-200 shadow-2xl rounded-b-xl">
                {options.length > 0 ? (
                  <div className="flex flex-col">
                    {options.map((option, index) => (
                      <button
                        key={`${tab.id}-${index}`}
                        type="button"
                        onClick={() => {
                          setActiveTab(tab.id);
                          setSelected((prev) => ({ ...prev, [tab.id]: index }));
                          setOpen(null);
                        }}
                   className={`w-full text-left px-5 py-3 text-sm border-b border-gray-100 hover:bg-[#f9fce8] ${selected[tab.id] === index
                            ? "bg-[#f9fce8] text-[#07294e] font-bold"
                            : "text-gray-700"
                          }`}
                      >
                        {getOptionLabel(option, tab, index)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="px-5 py-4 text-sm text-gray-400">
                    No options added by admin yet.
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

function MobileTabs({ activeTab, setActiveTab, selected, setSelected, content, open, setOpen }) {
  const activeLabel = TABS.find((t) => t.id === activeTab)?.label || "Sections";

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between py-3">
        <span className="text-sm font-bold text-[#07294e]">{activeLabel}</span>
        <button
          type="button"
          onClick={() => setOpen(!open)}
     className="flex items-center gap-2 text-sm text-gray-600 border border-gray-300 rounded-lg px-3 py-1.5"
        >
          <Menu className="w-4 h-4" /> Sections
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-[999] p-3">
          <div className="flex justify-between items-center mb-2">
            <b className="text-[#07294e] text-sm">Sections</b>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close sections">
              <X className="w-4 h-4" />
            </button>
          </div>

          {TABS.map((tab) => {
            const options = getDropdownOptions(tab.id, content);
            return (
              <div key={tab.id} className="mb-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (!tab.dropdown) setOpen(false);
                  }}
             className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${activeTab === tab.id
                    ? "bg-[#b5d56a] text-[#07294e]"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {tab.label}
                  {tab.dropdown && <span className="ml-1 text-xs">▾</span>}
                </button>


                {tab.dropdown && activeTab === tab.id && (
                  <div className="absolute left-0 top-full z-[999] w-80 max-h-96 overflow-y-auto bg-white border border-gray-200 shadow-2xl rounded-b-xl">
                    {options.length > 0 ? (
                      <div className="flex flex-col">
                        {options.map((option, index) => (
                          <button
                            key={`${tab.id}-${index}`}
                            type="button"
                            onClick={() => {
                              setActiveTab(tab.id);
                              setSelected((prev) => ({ ...prev, [tab.id]: index }));
                              setOpen(null);
                            }}
                       className={`w-full text-left px-5 py-3 text-sm border-b border-gray-100 hover:bg-[#f9fce8] ${selected[tab.id] === index
                                ? "bg-[#f9fce8] text-[#07294e] font-bold"
                                : "text-gray-700"
                              }`}
                          >
                            {getOptionLabel(option, tab, index)}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="px-5 py-4 text-sm text-gray-400">
                        No options added by admin yet.
                      </p>
                    )}
                  </div>
                )}


              </div>
            );
          })}
        </div>
      )}
      </div>
  );
}

function SummaryAnalysis({ chapters, selected }) {
  const chapter = chapters[selected] || chapters[0];
  if (!chapter) {
    return (
      <SectionShell title="Summary & Analysis">
        <EmptyState label="summary and analysis chapters" />
      </SectionShell>
    );
  }

  return (
    <SectionShell title={chapter.title || "Summary & Analysis"}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#f9fce8] rounded-xl p-5 border-l-4 border-[#b5d56a]">
          <p className="text-xs font-bold text-[#07294e] uppercase mb-3">Summary</p>
          <p className="text-gray-700 leading-7 whitespace-pre-line">{chapter.summary}</p>
        </div>
        <div className="bg-[#eef4ff] rounded-xl p-5 border-l-4 border-[#07294e]">
          <p className="text-xs font-bold text-[#07294e] uppercase mb-3">Analysis</p>
          <p className="text-gray-700 leading-7 whitespace-pre-line">{chapter.analysis}</p>
        </div>
      </div>
    </SectionShell>
  );
}

function Themes({ items, selected }) {
  const item = items[selected] || items[0];
  if (!item) {
    return (
      <SectionShell title="Themes">
        <EmptyState label="theme options" />
      </SectionShell>
    );
  }

  return (
    <SectionShell title={item.title || "Theme"}>
      <div
   className="rounded-xl p-6 border-l-4"
        style={{
          borderColor: item.color || "#07294e",
          backgroundColor: `${item.color || "#07294e"}12`,
        }}
      >
        <p className="text-gray-700 text-lg leading-8 whitespace-pre-line">{item.desc}</p>
      </div>
    </SectionShell>
  );
}

function Quotes({ quotes }) {
  return (
    <SectionShell title="Quotes">
      {quotes.length ? (
        <div className="space-y-5">
          {quotes.map((quote, index) => (
            <blockquote
              key={index}
         className="border-l-4 rounded-xl bg-gray-50 p-5"
              style={{ borderColor: quote.theme || "#b5d56a" }}
            >
              <p className="text-[#07294e] font-semibold italic text-lg mb-3">
                “{quote.quote}”
              </p>
              <footer className="text-sm text-gray-500">
                {quote.attribution}
                {quote.tag && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-[#b5d56a]/30 text-[#07294e]">
                    {quote.tag}
                  </span>
                )}
              </footer>
            </blockquote>
          ))}
        </div>
      ) : (
        <EmptyState label="quotes" />
      )}
    </SectionShell>
  );
}

function Characters({ items, selected }) {
  const item = items[selected] || items[0];
  if (!item) {
    return (
      <SectionShell title="Characters">
        <EmptyState label="character options" />
      </SectionShell>
    );
  }

  return (
    <SectionShell title={item.name || "Character"}>
      <p className="text-sm text-gray-500 font-semibold mb-4">{item.role}</p>
      <p className="text-gray-700 text-lg leading-8 whitespace-pre-line">{item.desc}</p>
    </SectionShell>
  );
}

function Terms({ items, selected }) {
  const item = items[selected] || items[0];
  if (!item) {
    return (
      <SectionShell title="Terms">
        <EmptyState label="term options" />
      </SectionShell>
    );
  }

  return (
    <SectionShell title={item.term || "Term"}>
      <p className="text-gray-700 text-lg leading-8 whitespace-pre-line">{item.def}</p>
    </SectionShell>
  );
}

function Symbols({ items, selected }) {
  const item = items[selected] || items[0];
  if (!item) {
    return (
      <SectionShell title="Symbols">
        <EmptyState label="symbol options" />
      </SectionShell>
    );
  }

  return (
    <SectionShell title={item.symbol || "Symbol"}>
      <div
   className="rounded-xl p-6 border-l-4"
        style={{
          borderColor: item.color || "#07294e",
          backgroundColor: `${item.color || "#07294e"}12`,
        }}
      >
        <p className="text-gray-700 text-lg leading-8 whitespace-pre-line">{item.desc}</p>
      </div>
    </SectionShell>
  );
}

function ThemeWheel({ data }) {
  const themes = arr(data?.themes);
  return (
    <SectionShell title="Theme Wheel">
      <Paragraphs body={data?.body} label="theme wheel" />
      {themes.length > 0 && (
        <div className="mt-8 space-y-4">
          {themes.map((theme, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <b className="text-sm text-[#07294e]">{theme.label}</b>
                <span className="text-xs font-bold" style={{ color: theme.color || "#07294e" }}>
                  {theme.pct}%
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
             className="h-full rounded-full"
                  style={{
                    width: `${theme.pct || 0}%`,
                    backgroundColor: theme.color || "#07294e",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function ActiveContent({ tabId, content, selected, setActiveTab }) {
  return (
    <>
      <PrevNext activeTab={tabId} setActiveTab={setActiveTab} />

      {tabId === "introduction" && (
        <SectionShell title="Study Guide Introduction">
          <Paragraphs body={content?.introduction?.body} label="introduction" />
        </SectionShell>
      )}

      {tabId === "plotSummary" && (
        <SectionShell title="Plot Summary">
          <Paragraphs body={content?.plotSummary?.body} label="plot summary" />
        </SectionShell>
      )}

      {tabId === "summaryAnalysis" && (
        <SummaryAnalysis
          chapters={arr(content?.summaryAnalysis?.chapters)}
          selected={selected.summaryAnalysis || 0}
        />
      )}

      {tabId === "themes" && (
        <Themes items={arr(content?.themes)} selected={selected.themes || 0} />
      )}

      {tabId === "quotes" && <Quotes quotes={arr(content?.quotes)} />}

      {tabId === "characters" && (
        <Characters items={arr(content?.characters)} selected={selected.characters || 0} />
      )}

      {tabId === "terms" && (
        <Terms items={arr(content?.terms)} selected={selected.terms || 0} />
      )}

      {tabId === "symbols" && (
        <Symbols items={arr(content?.symbols)} selected={selected.symbols || 0} />
      )}

      {tabId === "themeWheel" && <ThemeWheel data={content?.themeWheel} />}
    </>
  );
}

async function handleBookmark(guide, showToast) {
  const token = localStorage.getItem("lp_token");
  if (!token) return showToast("error", "Please login first");

  const result = await toggleBookmark({
    articleId: guide._id || guide.id,
    articleType: "literature",
    title: guide.title,
    slug: guide.slug,
    image_url: guide.image_url,
    category: guide.category,
  });

  showToast(
    result.success ? "success" : "error",
    result.success
      ? result.bookmarked
        ? "Article saved"
        : "Article removed"
      : result.message || "Bookmark failed"
  );
}

export default function LiteratureDetail({ guide = {} }) {
  const [activeTab, setActiveTab] = useState("introduction");
  const [selected, setSelected] = useState({
    summaryAnalysis: 0,
    themes: 0,
    characters: 0,
    terms: 0,
    symbols: 0,
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const contentRef = useRef(null);

  const title = guide?.title || "Literature Study Guide";
  const author = guide?.author || "Literary Palace";
  const tag = guide?.tag || "Lit Guide";
  const content = guide?.content || {};
  const { Toast, showToast } = useActionToast();

  // Fixed tabs: DO NOT filter by available data.
  const tabs = useMemo(() => TABS, []);

  useEffect(() => {
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeTab, selected]);

  return (
    <>
      {Toast}
      <div className="min-h-screen bg-[#fafafa]">
      <div className="relative w-full bg-[#5bc8d8] overflow-hidden">
        <svg
     className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none hidden md:block">
          <Image
            src="/Logo Icons/Literary Palace SVG Icon-01.svg"
            alt="Literacy"
            width={260}
            height={260}
       className="w-52 h-52"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-[#07294e]/70 text-xs mb-3 flex-wrap">
              <Link href="/" className="hover:underline">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/literature" className="hover:underline">Literature</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#07294e] font-medium truncate">{title}</span>
            </div>

            <span className="inline-block bg-white/30 text-[#07294e] text-xs font-semibold rounded-full px-3 py-1 mb-3">
              {tag}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#07294e] mb-2 leading-tight">
              {title}
            </h1>
            <p className="text-sm md:text-base text-[#07294e]/80">
              by <span className="font-semibold">{author}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 mt-1">
            <button
              type="button"
              aria-label="Bookmark article"
              onClick={() => handleBookmark(guide, showToast)}
         className="bg-white p-4 rounded-lg shadow hover:bg-[#f9fce8]"
            >
              <Bookmark size={24} />
            </button>
            <button className="bg-[#07294e] text-white text-sm font-bold px-4 py-3 rounded-lg hover:bg-[#0a3a6b] shadow">
              Upgrade to A<sup>+</sup>
            </button>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-visible">
          <TopTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selected={selected}
            setSelected={setSelected}
            content={content}
          />
          <MobileTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selected={selected}
            setSelected={setSelected}
            content={content}
            open={mobileOpen}
            setOpen={setMobileOpen}
          />
        </div>
      </div>

      <div className="bg-[#eef9fb] border-b border-[#b5e8ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-around gap-3">
          <button className="flex items-center gap-2 text-sm text-[#07294e] font-medium hover:underline">
            <BookOpen className="w-4 h-4 text-[#b5d56a]" /> Download this Guide (PDF)
          </button>
          <div className="hidden sm:block w-px h-5 bg-[#b5d56a]" />
          <button className="flex items-center gap-2 text-sm text-[#07294e] font-medium hover:underline">
            <Download className="w-4 h-4 text-[#b5d56a]" /> Download the Teacher Edition
          </button>
        </div>
      </div>

      <main ref={contentRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ActiveContent
          tabId={activeTab}
          content={content}
          selected={selected}
          setActiveTab={setActiveTab}
        />
      </main>
      </div>
    </>
  );
}
