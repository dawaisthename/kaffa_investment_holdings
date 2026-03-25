import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    category: "Financial",
    title: "Kaffa Holding Surpasses $500M in Assets Under Management",
    date: "12 May 2025",
    path: "/news/aum-milestone",
  },
  {
    category: "Energy",
    title: "Kaffa Energy Expands Renewable Portfolio in Southeast Asia",
    date: "08 May 2025",
    path: "/news/renewable-expansion",
  },
  {
    category: "Report",
    title: "Annual ESG Report 2024 Now Available for Download",
    date: "24 April 2025",
    path: "/news/esg-report",
  },
];

export default function NewsInsights() {
  return (
    <section className="bg-[#e9ecef] py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-4 block">
            Latest Updates
          </span>
          <h2 className="text-4xl md:text-[40px] font-serif text-[#0a1622] font-bold">
            News & insights
          </h2>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {articles.map((article, i) => (
            <Link
              key={i}
              to={article.path}
              className="group bg-white p-6 md:p-8 lg:p-10 border border-gray-100 flex flex-col justify-between min-h-[180px] md:min-h-[200px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <span className="inline-block text-[10px] bg-[#f5f5f5] uppercase tracking-[0.15em] text-[#0a1622] font-semibold mb-4 md:mb-6 px-3 py-1 rounded-full">
                  {article.category}
                </span>

                <h3 className="text-base md:text-lg font-sans antialiased text-[#0a1622] leading-snug font-semibold group-hover:text-[#c5a35d] transition-colors duration-300">
                  {article.title}
                </h3>
              </div>

              <div className="flex justify-between items-center pt-4 md:pt-6 border-t border-gray-50 mt-6">
                <span className="text-[12px] text-gray-400 font-medium">
                  {article.date}
                </span>

                <div className="text-[#0a1622] transition-transform duration-300 group-hover:translate-x-2">
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link to="/news" className="flex items-center gap-4 group/btn">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0a1622]">
              All News & Insights
            </span>
            <div className="w-10 h-[1px] bg-[#0a1622] transition-all duration-500 group-hover/btn:w-16 group-hover/btn:bg-[#c5a35d]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
