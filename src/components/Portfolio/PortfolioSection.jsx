import React, { useState } from "react";
import {
  Building2,
  Cpu,
  Truck,
  Sprout,
  Landmark,
  Zap,
  Sun,
  MapPin,
} from "lucide-react";

// 1. Full Content Data Array
const portfolioCompanies = [
  {
    name: "Kaffa Properties",
    sector: "Real Estate",
    region: "East Africa",
    desc: "Premium commercial and residential real estate development and management across key urban centres.",
    icon: <Building2 size={20} />,
  },
  {
    name: "Kaffa Technologies",
    sector: "Technology",
    region: "East Africa",
    desc: "Enterprise software and digital infrastructure solutions driving business transformation.",
    icon: <Cpu size={20} />,
  },
  {
    name: "Kaffa Logistics",
    sector: "Logistics",
    region: "Middle East",
    desc: "End-to-end supply chain and freight management services across regional trade corridors.",
    icon: <Truck size={20} />,
  },
  {
    name: "Kaffa Agri",
    sector: "Agriculture",
    region: "East Africa",
    desc: "Sustainable agriculture and agri-processing operations focused on food security and export markets.",
    icon: <Sprout size={20} />,
  },
  {
    name: "Kaffa Capital",
    sector: "Financial Services",
    region: "Middle East",
    desc: "Financial services including asset management, advisory, and microfinance solutions.",
    icon: <Landmark size={20} />,
  },
  {
    name: "Kaffa Energy",
    sector: "Energy",
    region: "Southeast Asia",
    desc: "Renewable and conventional energy generation, distribution, and infrastructure projects.",
    icon: <Zap size={20} />,
  },
  {
    name: "Kaffa Solar",
    sector: "Energy",
    region: "East Africa",
    desc: "Utility-scale and distributed solar energy projects serving commercial and institutional clients.",
    icon: <Sun size={20} />,
  },
  {
    name: "Kaffa Digital",
    sector: "Technology",
    region: "Southeast Asia",
    desc: "Fintech and digital payments infrastructure connecting underserved markets to the global economy.",
    icon: <Cpu size={20} />,
  },
];

const sectors = [
  "All",
  "Real Estate",
  "Technology",
  "Logistics",
  "Agriculture",
  "Financial Services",
  "Energy",
];
const regions = ["All", "East Africa", "Middle East", "Southeast Asia"];

export default function PortfolioSection() {
  const [activeSector, setActiveSector] = useState("All");
  const [activeRegion, setActiveRegion] = useState("All");

  // 2. Filtering Logic
  const filteredCompanies = portfolioCompanies.filter((company) => {
    const sectorMatch =
      activeSector === "All" || company.sector === activeSector;
    const regionMatch =
      activeRegion === "All" || company.region === activeRegion;
    return sectorMatch && regionMatch;
  });

  return (
    <section className="bg-[#f8f9fa] py-20 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* --- FILTER CONTROLS --- */}
        <div className="space-y-10 mb-20">
          {/* Sector Row */}
          <div>
            <span className="text-[#c5a35d] uppercase tracking-[0.2em] text-[10px] font-extrabold mb-4 block">
              Sector
            </span>
            <div className="flex flex-wrap gap-2">
              {sectors.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSector(s)}
                  className={`px-5 py-2.5 rounded text-[13px] font-bold transition-all duration-300 ${
                    activeSector === s
                      ? "bg-[#0a1622] text-white"
                      : "bg-white border border-gray-100 text-[#4b5563] hover:bg-gray-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Region Row */}
          <div>
            <span className="text-[#c5a35d] uppercase tracking-[0.2em] text-[10px] font-extrabold mb-4 block">
              Region
            </span>
            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRegion(r)}
                  className={`px-5 py-2.5 rounded text-[13px] font-bold transition-all duration-300 ${
                    activeRegion === r
                      ? "bg-[#0a1622] text-white"
                      : "bg-white border border-gray-100 text-[#4b5563] hover:bg-gray-100"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- COMPANY GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company, i) => (
            <div
              key={i}
              className="bg-white p-10 rounded-xl border border-gray-100 flex flex-col justify-between h-full hover:shadow-lg transition-all duration-500"
            >
              <div>
                {/* Dark Icon Box */}
                <div className="w-12 h-12 bg-[#0a1622] rounded flex items-center justify-center mb-8 text-[#c5a35d]">
                  {company.icon}
                </div>

                <h3 className="text-lg font-semibold text-[#0a1622] mb-4">
                  {company.name}
                </h3>
                <p className="text-gray-500 text-[15px] leading-relaxed ">
                  {company.desc}
                </p>
              </div>
              {/* className="inline-block text-[10px] bg-[#f5f5f5] uppercase tracking-[0.15em] text-[#0a1622] font-semibold mb-6 px-3 py-1 rounded-full"> */}

              {/* Card Footer Tags */}
              <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                <span className="bg-[#f5f5f5] sans-serif text-[#6D6C6E] text-[11px] font-semibold px-3 py-1 rounded">
                  {company.sector}
                </span>
                <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-bold">
                  <MapPin size={12} className="text-gray-300" />
                  <span>{company.region}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Logic */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-serif text-xl">
              No portfolio companies match these filters.
            </p>
            <button
              onClick={() => {
                setActiveSector("All");
                setActiveRegion("All");
              }}
              className="mt-4 text-[#c5a35d] font-bold text-sm underline tracking-widest"
            >
              RESET FILTERS
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
