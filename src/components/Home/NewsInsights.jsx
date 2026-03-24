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
    <section className="bg-[#f8f9fa] py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-4 block">
            Latest Updates
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#0a1622] font-bold">
            News & insights
          </h2>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {articles.map((article, i) => (
            <Link
              key={i}
              to={article.path}
              className="group bg-white p-10 border border-gray-100 flex flex-col justify-between h-[320px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a35d] font-bold mb-6 block">
                  {article.category}
                </span>
                <h3 className="text-xl md:text-2xl font-serif text-[#0a1622] leading-tight font-bold group-hover:text-[#c5a35d] transition-colors duration-300">
                  {article.title}
                </h3>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-gray-50">
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
