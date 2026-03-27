import React, { useState, useEffect } from "react";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const categories = ["All", "Company News", "Investments", "Insights", "Press"];

export default function NewsMain() {
  const [articles, setArticles] = useState([]); // Now dynamic
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Fetch real data from your backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/news");
        setArticles(response.data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // 2. Filter logic remains the same
  const filteredArticles = articles.filter((article) => {
    const categoryMatch =
      activeCategory === "All" || article.category === activeCategory;
    const searchMatch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <Loader2 className="animate-spin text-[#c5a35d]" size={40} />
      </div>
    );
  }

  return (
    <section className="bg-[#f8f9fa] min-h-screen">
      {/* --- FILTER & SEARCH BAR --- */}
      <div className="py-10 px-8 md:px-16 border-b border-gray-100">
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
              {filteredArticles.map((article) => (
                <Link
                  to={`/news/${article._id}`} // Using MongoDB _id for routing
                  key={article._id}
                  className="group bg-white p-10 rounded-xl border border-gray-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[#c5a35d] text-[10px] font-extrabold uppercase tracking-[0.2em]">
                        {article.category}
                      </span>
                      <span className="text-gray-200 text-[12px]">|</span>
                      <span className="text-gray-400 text-[12px] font-medium">
                        {new Date(article.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-[#0a1622] mb-4 leading-tight group-hover:text-[#c5a35d] transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-500 text-[15px] leading-relaxed mb-10 line-clamp-3">
                      {article.content}
                    </p>
                  </div>

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
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
