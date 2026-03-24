import { Building2, Cpu, Truck, Sprout, Landmark, Zap } from "lucide-react";

const focusAreas = [
  { name: "Real Estate", icon: <Building2 size={18} /> },
  { name: "Technology", icon: <Cpu size={18} /> },
  { name: "Logistics", icon: <Truck size={18} /> },
  { name: "Agriculture", icon: <Sprout size={18} /> },
  { name: "Financial Services", icon: <Landmark size={18} /> },
  { name: "Energy", icon: <Zap size={18} /> },
];

export default function FocusAreas() {
  return (
    <section className="bg-white py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Content */}
        <div className="mb-16">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-5 block">
            Focus Areas
          </span>
          <h2 className="text-4xl md:text-[42px] font-serif text-[#0a1622] font-bold mb-6">
            What we invest in
          </h2>
          <p className="text-gray-500 text-[16px] md:text-[17px] max-w-2xl leading-relaxed font-medium">
            We deploy capital across six core sectors and three geographic
            regions, targeting businesses with strong fundamentals and clear
            growth potential.
          </p>
        </div>

        {/* 3-Column Grid for Sectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {focusAreas.map((area, i) => (
            <div
              key={i}
              className="bg-white p-6 border border-gray-100 flex items-center gap-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Dark Square Icon Box */}
              <div className="bg-[#0a1622] text-[#c5a35d] p-3 rounded flex items-center justify-center shrink-0">
                {area.icon}
              </div>
              <span className="font-bold text-[#0a1622] text-[15px] tracking-tight">
                {area.name}
              </span>
            </div>
          ))}
        </div>

        {/* Geographic Region Tags */}
        <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200/50">
          {["East Africa", "Middle East", "Southeast Asia"].map((region) => (
            <span
              key={region}
              className="bg-white px-5 py-2.5 border border-gray-200 rounded-md text-[12px] font-bold text-gray-400 uppercase tracking-widest"
            >
              {region}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
