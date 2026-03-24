import { Users, Globe, BarChart2, MapPin } from "lucide-react";

const principles = [
  "Disciplined risk management and thorough due diligence on every opportunity.",
  "Active value creation through operational improvement and strategic support.",
  "Strong partnerships with experienced management teams and co-investors.",
  "ESG integration across investment analysis and portfolio management.",
  "Focus on sectors with structural tailwinds and long-term demand drivers.",
];

const focusAreas = [
  { label: "Minority & Majority Stakes", icon: <Users size={16} /> },
  { label: "3 Operating Regions", icon: <Globe size={16} /> },
  { label: "6 Core Sectors", icon: <BarChart2 size={16} /> },
  { label: "Local Expertise", icon: <MapPin size={16} /> },
];

export default function CapitalDeployment() {
  return (
    <section className="bg-white py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Side: Investment Thesis List */}
        <div className="pt-4">
          <span className="text-[#c5a35d] uppercase tracking-[0.3em] text-[11px] font-bold mb-6 block">
            Investment Thesis
          </span>
          <h2 className="text-4xl md:text-[52px] font-serif text-[#0a1622] font-bold mb-12 leading-[1.1]">
            How we think about <br /> deploying capital
          </h2>

          <div className="space-y-8">
            {principles.map((text, i) => (
              <div key={i} className="flex gap-6 items-start group">
                {/* Number with soft gold background circle */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#fdf8ed] flex items-center justify-center">
                  <span className="text-[#c5a35d] font-bold text-[13px]">
                    {i + 1}
                  </span>
                </div>
                <p className="text-[#4b5563] text-[17px] leading-relaxed font-medium">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Dark Callout Card with Rounded Corners */}
        <div className="bg-[#0a1622] p-10 md:p-14 rounded-2xl relative shadow-2xl overflow-hidden">
          <span className="text-[#c5a35d] uppercase tracking-[0.3em] text-[11px] font-bold mb-8 block">
            Our Focus
          </span>
          <h3 className="text-white font-serif text-xl md:text-[42px] mb-8 leading-[1.2] font-bold">
            We invest where conviction meets opportunity
          </h3>
          <p className="text-gray-400 text-md mb-12 leading-relaxed">
            Our portfolio spans six core sectors across three operating regions.
            We look for businesses with strong fundamentals, capable management,
            and the potential for long-term value creation.
          </p>

          {/* Focus Grid with specific Icons from Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-14">
            {focusAreas.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 text-white/90">
                <span className="text-[#c5a35d]">{item.icon}</span>
                <span className="text-[15px] font-semibold tracking-wide">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <button className="group/btn bg-[#c5a35d] hover:bg-[#b08f4a] text-[#0a1622] px-10 py-4 rounded-lg text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-[#c5a35d]/20">
            <span>Partnership Opportunities</span>
            <span className="text-lg transition-transform duration-300 group-hover/btn:translate-x-1.5">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
