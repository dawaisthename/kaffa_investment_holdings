import { Link } from "react-router-dom";
import {
  Building2,
  Cpu,
  Truck,
  Leaf,
  Landmark,
  Zap,
  ArrowRight,
} from "lucide-react";

const companies = [
  {
    name: "Kaffa Properties",
    sector: "Real Estate",
    icon: <Building2 size={20} />,
  },
  { name: "Kaffa Technologies", sector: "Technology", icon: <Cpu size={20} /> },
  { name: "Kaffa Logistics", sector: "Logistics", icon: <Truck size={20} /> },
  { name: "Kaffa Agri", sector: "Agriculture", icon: <Leaf size={20} /> },
  {
    name: "Kaffa Capital",
    sector: "Financial Services",
    icon: <Landmark size={20} />,
  },
  { name: "Kaffa Energy", sector: "Energy", icon: <Zap size={20} /> },
];

export default function FeaturedCompanies() {
  return (
    <section className="bg-[#e9ecef] py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#0a1622] font-bold mb-6">
            Featured companies
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            A selection of our portfolio companies operating across key sectors
            and geographies.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {companies.map((company, i) => (
            <div
              key={i}
              className="bg-white p-8 border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-center gap-6">
                {/* Dark Icon Box */}
                <div className="w-14 h-14 bg-[#0a1622] flex items-center justify-center text-[#c5a35d] shrink-0 transition-transform duration-500 group-hover:scale-110">
                  {company.icon}
                </div>

                <div className="flex flex-col">
                  <h4 className="text-[18px] font-bold font-serif text-[#0a1622] group-hover:text-[#c5a35d] transition-colors duration-300">
                    {company.name}
                  </h4>
                  <span className="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-bold mt-1">
                    {company.sector}
                  </span>
                </div>
              </div>

              {/* Animated Arrow - Only visible on Hover */}
              <div className="text-[#c5a35d] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out pr-2">
                <ArrowRight size={20} strokeWidth={2.5} />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link
            to="/portfolio"
            className="group/btn flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.3em] text-[#0a1622] hover:text-[#c5a35d] transition-colors"
          >
            <span>View all companies</span>
            <div className="w-8 h-[1px] bg-[#0a1622] group-hover/btn:bg-[#c5a35d] group-hover/btn:w-12 transition-all duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
