import { Check } from "lucide-react";

const criteria = [
  { text: "Revenue of $5M+ or clear path to profitability" },
  { text: "Strong management team with domain expertise" },
  { text: "Defensible market position or competitive advantage" },
  { text: "Clear growth trajectory with identifiable levers" },
  { text: "Alignment with our sector and geographic focus" },
  { text: "Sound corporate governance and financial reporting" },
  { text: "ESG considerations integrated into business model" },
  { text: "Exit optionality within 5-7 year horizon" },
];

export default function InvestmentCriteria() {
  return (
    <section className="bg-[#FAFAFA] py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <span className="text-[#c5a35d] uppercase tracking-[0.25em] text-[11px] font-bold mb-3 block">
            Investment Criteria
          </span>
          <h2 className="text-[44px] font-serif text-[#0a1622] font-bold mb-2 tracking-tight">
            What we look for
          </h2>
          <p className="text-gray-500 text-[17px] max-w-3xl leading-relaxed">
            We evaluate opportunities against a comprehensive set of qualitative
            and quantitative criteria.
          </p>
        </div>

        {/* The "Slim" Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          {criteria.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-white px-6 py-[18px] rounded-lg border border-gray-250 hover:border-gray-200 transition-colors shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
            >
              {/* Refined Gold Check Circle */}
              <div className="w-5 h-5 rounded-full border border-[#c5a35d] flex items-center justify-center shrink-0">
                <Check size={11} className="text-[#c5a35d]" strokeWidth={3} />
              </div>

              <span className="text-[#334155] font-medium text-[15px] leading-tight tracking-tight">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
