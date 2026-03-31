import React, { useState, useEffect } from "react";
import client from "../../api/client"; // Adjust path to your client.js
import {
  Building2,
  Cpu,
  Truck,
  Sprout,
  Landmark,
  Zap,
  MapPin,
  Loader2,
} from "lucide-react";

// Map the SECTOR strings from your DB directly to Lucide Components
const SectorIconMap = {
  "Real Estate": <Building2 size={20} />,
  Technology: <Cpu size={20} />,
  Logistics: <Truck size={20} />,
  Agriculture: <Sprout size={20} />,
  "Financial Services": <Landmark size={20} />,
  Energy: <Zap size={20} />,
};

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
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSector, setActiveSector] = useState("All");
  const [activeRegion, setActiveRegion] = useState("All");

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeSector !== "All") params.append("sector", activeSector);
        if (activeRegion !== "All") params.append("region", activeRegion);

        const response = await client.get(`/portfolio?${params.toString()}`);
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [activeSector, activeRegion]);

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

        {/* --- LOADING & COMPANY GRID --- */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#c5a35d]" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div
                key={company._id}
                className="bg-white p-10 rounded-xl border border-gray-100 flex flex-col justify-between h-full hover:shadow-lg transition-all duration-500"
              >
                <div>
                  <div className="w-12 h-12 bg-[#0a1622] rounded flex items-center justify-center mb-8 text-[#c5a35d]">
                    {/* LOGICAL ICON DISPLAY:
                      Looks up the icon based on the 'sector' value from the DB.
                      Falls back to Building2 if no match is found. 
                    */}
                    {SectorIconMap[company.sector] || <Building2 size={20} />}
                  </div>

                  <h3 className="text-lg font-semibold text-[#0a1622] mb-4">
                    {company.title}
                  </h3>
                  <p className="text-gray-500 text-[15px] leading-relaxed ">
                    {company.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-gray-50 pt-6 mt-8">
                  <span className="bg-[#f5f5f5] text-[#6D6C6E] text-[11px] font-semibold px-3 py-1 rounded">
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
        )}

        {/* --- EMPTY STATE --- */}
        {!loading && companies.length === 0 && (
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
