import { TrendingUp, Globe, Users, Award } from "lucide-react";

const values = [
  {
    title: "Growth & Development",
    desc: "Continuous learning opportunities including executive education programs and mentorship.",
    icon: <TrendingUp size={20} />,
  },
  {
    title: "Global Exposure",
    desc: "Work across multiple geographies and sectors with diverse, international teams.",
    icon: <Globe size={20} />,
  },
  {
    title: "Collaborative Culture",
    desc: "A flat, meritocratic environment that values initiative, integrity, and teamwork.",
    icon: <Users size={20} />,
  },
  {
    title: "Competitive Compensation",
    desc: "Market-leading packages including performance bonuses and long-term incentives.",
    icon: <Award size={20} />,
  },
];

export default function CareersCulture() {
  return (
    <section className="bg-[#f8f9fa] py-28 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Centered Header Section */}
        <div className="text-center mb-20">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-5 block">
            Why Kaffa
          </span>
          <h2 className="text-4xl md:text-[42px] font-serif text-[#0a1622] font-bold mb-6">
            Build your career with purpose
          </h2>
          <p className="text-gray-500 text-[16px] md:text-[17px] max-w-2xl mx-auto font-medium leading-relaxed">
            At Kaffa Holding, we believe that exceptional people are the
            foundation of exceptional businesses.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-[#fcfcfc] p-8 border border-gray-100 rounded-xl text-center flex flex-col items-center transition-all duration-300 hover:shadow-md"
            >
              {/* Circular Icon with subtle shadow */}
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#c5a35d] mb-6 border border-gray-50">
                {v.icon}
              </div>

              <h3 className="text-[#0a1622] font-serif font-bold text-[18px] mb-4">
                {v.title}
              </h3>

              <p className="text-gray-500 text-[14px] leading-relaxed font-medium">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
