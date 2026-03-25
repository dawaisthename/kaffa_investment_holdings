import React, { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link for navigation

// 1. Updated Data with Slugs
const allArticles = [
  {
    slug: "kaffa-renewable-energy-expansion",
    category: "Investments",
    date: "February 15, 2026",
    title: "Kaffa Holding Expands Into Renewable Energy Sector",
    excerpt:
      "Announcing a strategic acquisition in the renewable energy space, reinforcing our commitment to sustainable growth.",
  },
  {
    slug: "q4-2025-performance-review",
    category: "Company News",
    date: "January 28, 2026",
    title: "Q4 2025 Performance Review Published",
    excerpt:
      "Our portfolio companies delivered strong operational results across all sectors in the fourth quarter.",
  },
  {
    slug: "new-regional-office-east-africa",
    category: "Company News",
    date: "December 10, 2025",
    title: "New Regional Office Opened in East Africa",
    excerpt:
      "Expanding our on-the-ground presence to better serve portfolio companies and source new opportunities.",
  },
  {
    slug: "esg-reporting-impact-measurement",
    category: "Insights",
    date: "November 22, 2025",
    title: "Our Approach to ESG Reporting and Impact Measurement",
    excerpt:
      "A deep dive into the frameworks and metrics we use to track environmental, social, and governance performance.",
  },
  {
    slug: "kaffa-technologies-series-b",
    category: "Investments",
    date: "October 5, 2025",
    title: "Kaffa Technologies Closes Series B Funding Round",
    excerpt:
      "Kaffa Technologies raised $15M in a Series B round led by international investors to fuel regional growth.",
  },
  {
    slug: "chairman-interview-africa-future",
    category: "Press",
    date: "September 18, 2025",
    title: "Chairman Interview: Investing in Africa's Future",
    excerpt:
      "Our Chairman shares his perspective on the evolving investment landscape in Africa and the Middle East.",
  },
];

const categories = ["All", "Company News", "Investments", "Insights", "Press"];

export default function NewsMain() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = allArticles.filter((article) => {
    const categoryMatch =
      activeCategory === "All" || article.category === activeCategory;
    const searchMatch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <section className="bg-[#f8f9fa] min-h-screen">
      {/* --- FILTER & SEARCH BAR --- */}
      <div className=" py-10 px-8 md:px-16 border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded text-[13px] font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#0a1622] text-white"
                    : "bg-[#f4f4f4] text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#fcfcfc] border text-black border-gray-200 py-3 pl-12 pr-4 rounded-md outline-none focus:border-[#c5a35d] text-[14px] transition-all"
            />
          </div>
        </div>
      </div>

      {/* --- ARTICLES GRID --- */}
      <div className="py-20 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, i) => (
                // CHANGED: Wrap card or button in a Link using the slug
                <Link
                  to={`/news/${article.slug}`}
                  key={i}
                  className="group bg-white p-10 rounded-xl border border-gray-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[#c5a35d] text-[10px] font-extrabold uppercase tracking-[0.2em]">
                        {article.category}
                      </span>
                      <span className="text-gray-200 text-[12px]">|</span>
                      <span className="text-gray-400 text-[12px] font-medium">
                        {article.date}
                      </span>
                    </div>

                    <h3 className="text-lg  font-semibold text-[#0a1622] mb-4 leading-tight group-hover:text-[#c5a35d] transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-500 text-[15px] leading-relaxed mb-10">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Visual "Read more" - handled by the parent Link */}
                  <div className="flex items-center gap-2 text-[#0a1622] font-bold text-[13px] uppercase tracking-wider">
                    Read more
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-serif text-gray-400 mb-4">
                No articles found.
              </h3>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="text-[#c5a35d] font-bold uppercase tracking-widest text-sm underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
