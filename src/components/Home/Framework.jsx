import { TrendingUp, BarChart3, Shield } from "lucide-react";

const pillars = [
  {
    title: "Long-Term Capital",
    desc: "We deploy patient capital with a multi-decade horizon, supporting businesses through cycles and enabling sustainable growth.",
    icon: <TrendingUp size={20} className="text-[#c5a35d]" />,
  },
  {
    title: "Operational Excellence",
    desc: "We partner with management teams to build best-in-class operations, improving efficiency and driving value creation.",
    icon: <BarChart3 size={20} className="text-[#c5a35d]" />,
  },
  {
    title: "Governance & Compliance",
    desc: "We uphold rigorous governance standards and maintain transparency across every entity in our portfolio.",
    icon: <Shield size={20} className="text-[#c5a35d]" />,
  },
];

export default function Framework() {
  return (
    <section className="bg-white py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Matches proportions in Framework.png */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-4 block">
            Our Approach
          </span>
          <h2 className="text-4xl md:text-[54px] font-serif text-[#0a1622] leading-tight mb-6 font-bold">
            A disciplined framework for value creation
          </h2>
          <p className="text-gray-500 text-lg md:text-[20px] leading-relaxed max-w-3xl mx-auto font-medium">
            Every investment decision is guided by three foundational pillars
            that shape how we deploy capital and partner with businesses.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="bg-white p-10 rounded-xl border border-gray-100/80 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col items-start text-left"
            >
              {/* Icon Box - Subtle gray square from image */}
              <div className="mb-8 p-4 bg-[#f4f4f4] rounded-lg flex items-center justify-center">
                {pillar.icon}
              </div>

              <h3 className="text-[22px] font-bold font-serif text-[#0a1622] mb-5">
                {pillar.title}
              </h3>

              <p className="text-gray-500 text-[15px] leading-[1.7] font-medium">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
