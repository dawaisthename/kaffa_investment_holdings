import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

// This would typically come from a central data file or API
const allArticles = [
  {
    slug: "kaffa-renewable-energy-expansion",
    category: "Investments",
    date: "February 15, 2026",
    title: "Kaffa Holding Expands Into Renewable Energy Sector",
    content: [
      "Kaffa Holding has announced a strategic acquisition in the renewable energy space, reinforcing its commitment to sustainable growth and its target of achieving an 80% renewable portfolio by 2030.",
      "The acquisition, which includes a diversified portfolio of solar and wind assets across Southeast Asia, positions Kaffa Energy as one of the leading independent renewable energy operators in the region with a combined capacity of over 500 MW.",
      "The transaction was financed through a combination of equity from the Kaffa Holding balance sheet and project-level debt financing arranged by leading regional banks. The assets are fully contracted with long-term power purchase agreements, providing strong revenue visibility.",
      "Kaffa Holding plans to invest an additional $100M over the next three years to expand the renewable portfolio into new markets, including Vietnam, the Philippines, and East Africa.",
    ],
    quote:
      "This acquisition represents a transformative step for Kaffa Energy and the broader group. Renewable energy is not just a sustainability imperative — it is one of the most compelling investment opportunities of the decade.",
    author: "Sara M. Tadesse, CEO of Kaffa Holding",
  },
  // ... other articles would be added here
];

export default function NewsDetail() {
  const { slug } = useParams();

  // Find the specific article based on the URL slug
  const article = allArticles.find((a) => a.slug === slug);

  // Fallback if the slug doesn't match any data
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa]">
        <h2 className="text-2xl font-serif text-[#0a1622] mb-4">
          Article not found
        </h2>
        <Link to="/news" className="text-[#c5a35d] font-bold underline">
          Return to News
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white">
      {/* 1. Header Hero - Matches News Detail.jpg dark theme */}
      <header className="bg-[#0a1622] pt-48 pb-28 px-8 md:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-white font-serif text-4xl md:text-6xl lg:text-[64px] font-bold leading-[1.1] tracking-tight">
            {article.title}
          </h1>
        </div>
      </header>

      {/* 2. Main Content Area */}
      <div className="max-w-3xl mx-auto px-8 py-20">
        {/* Navigation & Metadata */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-gray-100 pb-8 gap-6">
          <Link
            to="/news"
            className="flex items-center gap-2 text-gray-400 hover:text-[#0a1622] font-bold text-[13px] transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            All News & Insights
          </Link>

          <div className="flex gap-6 text-[13px] font-bold">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={15} className="text-[#c5a35d]" /> {article.date}
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Tag size={15} className="text-[#c5a35d]" /> {article.category}
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="space-y-8">
          {article.content.slice(0, 2).map((para, i) => (
            <p
              key={i}
              className="text-gray-600 text-[18px] leading-[1.8] font-medium"
            >
              {para}
            </p>
          ))}

          {/* Featured Quote Section */}
          {article.quote && (
            <div className="py-6 border-y border-gray-100 my-12">
              <blockquote className="text-[#0a1622] font-serif text-2xl md:text-3xl italic leading-relaxed mb-4">
                "{article.quote}"
              </blockquote>
              <cite className="text-[#c5a35d] font-bold text-sm not-italic tracking-widest uppercase">
                — {article.author}
              </cite>
            </div>
          )}

          {article.content.slice(2).map((para, i) => (
            <p
              key={i}
              className="text-gray-600 text-[18px] leading-[1.8] font-medium"
            >
              {para}
            </p>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-24 pt-10 border-t border-gray-100">
          <Link
            to="/news"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 px-8 py-4 rounded-md text-[#0a1622] font-bold text-[13px] uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={18} /> Back to News & Insights
          </Link>
        </div>
      </div>
    </article>
  );
}
