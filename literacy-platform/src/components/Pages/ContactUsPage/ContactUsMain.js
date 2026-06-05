"use client";
import { useState, useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  Link,
  List,
  ListOrdered,
  Image as ImageIcon,
  Quote,
  RotateCcw,
  RotateCw,
  Type,
} from "lucide-react";
import { useActionToast } from "@/components/sharedComponents/ActionToast";

const sections = [
  { id: "contact-literary-palace", label: "Contact Literary Palace" },
  { id: "before-contact", label: "Before You Contact Us" },
  { id: "troubleshoot", label: "Having Trouble Downloading?" },
  { id: "how-contact", label: "How to Contact Us?" },
  { id: "general-inquiries", label: "General Inquiries" },
  { id: "technical-support", label: "Technical Support" },
  { id: "business-inquiries", label: "Business Inquiries" },
  { id: "research-articles", label: "Research Articles & Academic" },
  { id: "collaborations", label: "Collaborations" },
  { id: "refund-payment", label: "Refund or Payment Issues" },
  { id: "feedback", label: "Your Feedback Matters" },
];

const ContactUsMain = () => {
  const { Toast, showToast } = useActionToast();
  const editorRef = useRef(null);
  const savedSelection = useRef(null);
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    description: '',
    message: '',
    attachments: [],
  });

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sections.map((section) => {
        const el = document.getElementById(section.id);
        if (!el) return { id: section.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: section.id, top: Math.abs(rect.top) };
      });
      const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      setActiveSection(closest.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const updateMessageFromEditor = () => {
    const html = editorRef.current?.innerHTML ?? '';
    const normalized = html === '<br>' ? '' : html;
    setFormData(prev => ({ ...prev, message: normalized }));
  };

  const saveSelection = () => {
    try {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        savedSelection.current = sel.getRangeAt(0).cloneRange();
      }
    } catch (err) {
      // ignore
    }
  };

  const restoreSelection = () => {
    try {
      const sel = window.getSelection();
      if (!sel) return;
      sel.removeAllRanges();
      if (savedSelection.current) {
        sel.addRange(savedSelection.current);
      } else {
        if (editorRef.current) {
          const range = document.createRange();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
          sel.addRange(range);
        }
      }
    } catch (err) {
      // ignore
    }
  };

  const execCommandWithSync = (command, value = null) => {
    restoreSelection();
    try {
      document.execCommand(command, false, value);
    } catch (err) {
      console.warn("execCommand failed:", err);
    }
    updateMessageFromEditor();
    saveSelection();
  };

  const insertList = (ordered) => {
    restoreSelection();
    const sel = window.getSelection();
    if (!sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    const selectedText = range.toString();
    if (!selectedText.trim()) return;
    const lines = selectedText.split('\n').filter(line => line.trim());
    if (!lines.length) return;
    const listTag = ordered ? 'ol' : 'ul';
    const listHTML = `<${listTag}>${lines.map(line => `<li>${line.trim()}</li>`).join('')}</${listTag}>`;
    range.deleteContents();
    const fragment = range.createContextualFragment(listHTML);
    range.insertNode(fragment);
    updateMessageFromEditor();
    saveSelection();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      description: '',
      message: '',
      attachments: [],
    });
    showToast('success', 'Thank you for contacting us! We will get back to you soon.');
  };

  return (
    <>
      {Toast}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* SIDEBAR - Redesigned as a floating card */}
            <aside className="lg:w-1/4 order-first lg:order-none">
              <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-[#07294e] px-5 py-4">
                  <h3 className="text-white font-bold text-lg">On This Page</h3>
                </div>
                <ul className="flex flex-col">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => handleClick(section.id)}
                        className={`
                          block w-full px-5 py-3 text-left transition-all duration-200 border-l-4
                          ${activeSection === section.id
                            ? "border-[#c3e26e] bg-[#c3e26e]/10 font-semibold text-[#07294e]"
                            : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-200"
                          }
                        `}
                      >
                        {section.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* MAIN CONTENT - Redesigned with cards and better spacing */}
            <div className="lg:w-3/4 order-last lg:order-none">
              <article className="space-y-12">
                
                {/* Section: Contact */}
                <div id="contact-literary-palace" className="scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                      <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                      Contact Literary Palace
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      Thank you for visiting Literary Palace, your trusted source for academic resources, study materials, and literary guidance. Whether you're a student, teacher, researcher, or literature enthusiast, we're here to help and listen.
                    </p>
                  </div>
                </div>

                {/* Section: Before Contact */}
                <div id="before-contact" className="scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                      <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                      Before You Contact Us
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      We have compiled a list of frequently asked questions (FAQs) where we've answered some of the most common questions. Check our FAQ page first—you might find your answer there!
                    </p>
                    <ul className="space-y-3 text-gray-700 text-lg">
                      <li className="flex items-start gap-2">
                        <span className="text-[#c3e26e] text-xl">✦</span>
                        <span>Visit our <strong>FAQ section</strong> for quick answers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c3e26e] text-xl">✦</span>
                        <span>Check our <strong>Help Center</strong> for common issues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c3e26e] text-xl">✦</span>
                        <span>Browse our <strong>Knowledge Base</strong> for tutorials</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section: Troubleshoot */}
                <div id="troubleshoot" className="scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                      <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                      Having Trouble Downloading a PDF or File?
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      If you've purchased a PDF or document and cannot download it, here's what you can try:
                    </p>
                    <ul className="space-y-3 text-gray-700 text-lg">
                      <li className="flex items-start gap-2">
                        <span className="text-[#c3e26e] text-xl">✦</span>
                        <span>Clear your browser cache and cookies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c3e26e] text-xl">✦</span>
                        <span>Try a different browser or incognito mode</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c3e26e] text-xl">✦</span>
                        <span>Check your email for a direct download link</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c3e26e] text-xl">✦</span>
                        <span>Verify your internet connection is stable</span>
                      </li>
                    </ul>
                    <p className="text-lg text-gray-700 leading-relaxed mt-4">
                      If the download button doesn't work or the file is missing, contact our support team immediately. We'll investigate your order and resend the file if needed.
                    </p>
                  </div>
                </div>

                {/* Section: How to Contact */}
                <div id="how-contact" className="scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                      <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                      How to Contact Us?
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      We encourage you to use the contact form below. Please include as much detail as possible. Our team responds to most inquiries within 24 hours. For urgent matters, please reach out over the weekend. We currently offer support via:
                    </p>
                    <ul className="space-y-3 text-gray-700 text-lg">
                      <li className="flex items-start gap-2">
                        <span className="text-[#c3e26e] text-xl">✦</span>
                        <span><strong>Contact Form</strong> (below) - Best for general inquiries</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c3e26e] text-xl">✦</span>
                        <span><strong>Email</strong> - For detailed issues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c3e26e] text-xl">✦</span>
                        <span><strong>Phone</strong> - For urgent matters</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section: General Inquiries */}
                <div id="general-inquiries" className="scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                      <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                      General Inquiries
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      Have a question about our services, content, resources, or how Literary Palace works? Use the contact form or email us directly at:
                    </p>
                    <p className="text-lg mb-4 font-semibold text-[#07294e] bg-[#c3e26e]/10 inline-block px-4 py-2 rounded-lg">
                      Email: contact@literarypalace.com
                    </p>
                  </div>
                </div>

                {/* Section: Technical Support */}
                <div id="technical-support" className="scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                      <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                      Technical Support
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      If you're facing an issue with logging in, payments, account access, or site technical issues, we're here to help! Please contact:
                    </p>
                    <ul className="space-y-3 text-gray-700 text-lg">
                      <li className="flex items-start gap-2">
                        <span className="text-[#c3e26e] text-xl">✦</span>
                        <span>A short description of the issue</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c3e26e] text-xl">✦</span>
                        <span>Screenshots (if applicable)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c3e26e] text-xl">✦</span>
                        <span>Your browser and device information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c3e26e] text-xl">✦</span>
                        <span>Your browsing details (if you can)</span>
                      </li>
                    </ul>
                    <p className="text-lg text-gray-700 leading-relaxed mt-4">
                      This helps us diagnose and resolve your issue quickly and accurately.
                    </p>
                  </div>
                </div>

                {/* Section: Business Inquiries */}
                <div id="business-inquiries" className="scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                      <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                      Business Inquiries
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      For partnership inquiries, advertising proposals, or submitting research articles please contact:
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      We review every proposal and reply within 3-5 business days if there's a fit with our platform and audience.
                    </p>
                  </div>
                </div>

                {/* Section: Research Articles */}
                <div id="research-articles" className="scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                      <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                      Research Articles & Academic Collaborations
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      Are you a scholar, researcher interested in contributing expert content, Research Articles for submission guidelines or send your pitch to our email listed below.
                    </p>
                    <p className="text-lg mb-4 font-semibold text-[#07294e] bg-[#c3e26e]/10 inline-block px-4 py-2 rounded-lg">
                      Email: research@literarypalace.com
                    </p>
                  </div>
                </div>

                {/* Section: Collaborations */}
                <div id="collaborations" className="scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                      <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                      Collaborations
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      Are you a scholar, researcher, educator, or author interested in contributing to Literary Palace? We welcome partnerships that align with our mission. Contact our team and let's explore opportunities together!
                    </p>
                  </div>
                </div>

                {/* Section: Refund */}
                <div id="refund-payment" className="scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                      <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                      Refund or Payment Issues
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      We do not issue refunds on most items unless there's a defect, duplicate purchase, or issue with the product. In case of an accidental or duplicate purchase, please contact us with your order details:
                    </p>
                    <ul className="space-y-3 text-gray-700 text-lg">
                      <li className="flex items-start gap-2">
                        <span className="text-[#c3e26e] text-xl">✦</span>
                        <span>Order number</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c3e26e] text-xl">✦</span>
                        <span>Payment receipt</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c3e26e] text-xl">✦</span>
                        <span>Reason for the request</span>
                      </li>
                    </ul>
                    <p className="text-lg text-gray-700 leading-relaxed mt-4">
                      We review and process refund requests within 5 to 7 business days, as outlined in our Terms & Conditions.
                    </p>
                  </div>
                </div>

                {/* Section: Feedback */}
                <div id="feedback" className="scroll-mt-24">
                  <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                      <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                      Your Feedback Matters
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      We're constantly working to improve Literary Palace if you have suggestions, criticism, or gratitude you want to share, tell us! Your feedback matters and will help us serve you better.
                    </p>
                  </div>
                </div>

                {/* CONTACT FORM - Redesigned */}
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <h3 className="text-3xl font-bold mb-6 text-[#07294e] flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c3e26e] rounded-full"></span>
                    Contact Form
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#07294e] font-semibold mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-3 border-2 border-[#c3e26e] rounded-lg focus:outline-none focus:border-[#07294e] text-[#07294e] placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[#07294e] font-semibold mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-3 border-2 border-[#c3e26e] rounded-lg focus:outline-none focus:border-[#07294e] text-[#07294e] placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* Email Row */}
                    <div>
                      <label className="block text-[#07294e] font-semibold mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 border-2 border-[#c3e26e] rounded-lg focus:outline-none focus:border-[#07294e] text-[#07294e] placeholder-gray-400"
                      />
                    </div>

                    {/* Subject Row */}
                    <div>
                      <label className="block text-[#07294e] font-semibold mb-2">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 border-2 border-[#c3e26e] rounded-lg focus:outline-none focus:border-[#07294e] text-[#07294e] placeholder-gray-400"
                      />
                    </div>

                    {/* Description Row */}
                    <div>
                      <label className="block text-[#07294e] font-semibold mb-2">Short Title for Your Inquiry *</label>
                      <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 border-2 border-[#c3e26e] rounded-lg focus:outline-none focus:border-[#07294e] text-[#07294e] placeholder-gray-400"
                      />
                    </div>

                    {/* Message Row */}
                    <div>
                      <label className="block text-[#07294e] font-semibold mb-1">Message *</label>
                      <p className="text-sm text-gray-500 mb-2">Please provide the details of your question or request so we can assist you accurately.</p>

                      <div className="border-2 border-[#c3e26e] rounded-lg overflow-hidden">
                        <div className="rich-toolbar flex items-center flex-wrap gap-1 px-3 py-2 bg-gray-50 border-b border-[#c3e26e]">
                          <div className="flex items-center gap-2 mr-2">
                            <Type className="text-[#07294e]" size={16} />
                            <select
                              className="text-sm px-2 py-1 border rounded text-[#07294e] bg-white"
                              onChange={(e) => execCommandWithSync('formatBlock', e.target.value)}
                              defaultValue="<p>"
                              title="Paragraph style"
                            >
                              <option value="<p>">Paragraph</option>
                              <option value="<h2>">Heading 2</option>
                              <option value="<h3>">Heading 3</option>
                              <option value="<blockquote>">Quote</option>
                            </select>
                          </div>
                          <div className="flex items-center gap-1 text-[#07294e]">
                            <button
                              type="button"
                              aria-label="Bold"
                              title="Bold"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => execCommandWithSync('bold')}
                              className="p-1 hover:bg-[#c3e26e]/20 rounded"
                            >
                              <Bold size={16} />
                            </button>
                            <button
                              type="button"
                              aria-label="Italic"
                              title="Italic"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => execCommandWithSync('italic')}
                              className="p-1 hover:bg-[#c3e26e]/20 rounded"
                            >
                              <Italic size={16} />
                            </button>
                            <button
                              type="button"
                              aria-label="Underline"
                              title="Underline"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => execCommandWithSync('underline')}
                              className="p-1 hover:bg-[#c3e26e]/20 rounded"
                            >
                              <Underline size={16} />
                            </button>
                            <button
                              type="button"
                              aria-label="Insert link"
                              title="Insert link"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => {
                                const url = prompt('Enter URL:');
                                if (url) execCommandWithSync('createLink', url);
                              }}
                              className="p-1 hover:bg-[#c3e26e]/20 rounded"
                            >
                              <Link size={16} />
                            </button>
                            <button
                              type="button"
                              aria-label="Unordered list"
                              title="Unordered list"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => insertList(false)}
                              className="p-1 hover:bg-[#c3e26e]/20 rounded"
                            >
                              <List size={16} />
                            </button>
                            <button
                              type="button"
                              aria-label="Ordered list"
                              title="Ordered list"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => insertList(true)}
                              className="p-1 hover:bg-[#c3e26e]/20 rounded"
                            >
                              <ListOrdered size={16} />
                            </button>
                            <button
                              type="button"
                              aria-label="Insert image"
                              title="Insert image"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => {
                                const imageUrl = prompt('Enter image URL:');
                                if (imageUrl) execCommandWithSync('insertImage', imageUrl);
                              }}
                              className="p-1 hover:bg-[#c3e26e]/20 rounded"
                            >
                              <ImageIcon size={16} />
                            </button>
                            <button
                              type="button"
                              aria-label="Quote"
                              title="Quote"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => execCommandWithSync('formatBlock', '<blockquote>')}
                              className="p-1 hover:bg-[#c3e26e]/20 rounded"
                            >
                              <Quote size={16} />
                            </button>
                            <button
                              type="button"
                              aria-label="Undo"
                              title="Undo"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => execCommandWithSync('undo')}
                              className="p-1 hover:bg-[#c3e26e]/20 rounded"
                            >
                              <RotateCcw size={16} />
                            </button>
                            <button
                              type="button"
                              aria-label="Redo"
                              title="Redo"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => execCommandWithSync('redo')}
                              className="p-1 hover:bg-[#c3e26e]/20 rounded"
                            >
                              <RotateCw size={16} />
                            </button>
                          </div>
                        </div>

                        <div
                          id="rich-editor"
                          ref={editorRef}
                          contentEditable
                          suppressContentEditableWarning
                          onInput={updateMessageFromEditor}
                          onMouseUp={saveSelection}
                          onKeyUp={saveSelection}
                          onBlur={saveSelection}
                          onFocus={restoreSelection}
                          role="textbox"
                          aria-label="Message"
                          className="rich-editor min-h-[160px] px-4 py-4 text-[#07294e] outline-none"
                          data-placeholder="Your Message"
                        />
                      </div>
                    </div>

                    {/* Attachments Row */}
                    <div>
                      <label className="block text-[#07294e] font-semibold mb-2">Attachments</label>
                      <div className="border-2 border-dashed border-[#c3e26e] rounded-lg p-6 text-center cursor-pointer hover:bg-[#f8fafc] transition">
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          id="file-upload"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <p className="text-[#07294e] font-semibold">Choose a file or drag and drop here</p>
                        </label>
                      </div>

                      {formData.attachments.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {formData.attachments.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-[#c3e26e]"
                            >
                              <span className="text-[#07294e] font-medium truncate">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => removeAttachment(index)}
                                className="ml-2 text-red-500 hover:text-red-700 font-bold text-lg"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-start">
                      <button
                        type="submit"
                        className="bg-[#07294e] text-white px-12 py-3 rounded-lg font-semibold hover:bg-[#051f38] transition-all duration-300"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>

              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUsMain;