import { Shield, Eye, Target } from "lucide-react";

const values = [
  {
    title: "Integrity",
    desc: "We conduct business with unwavering ethical standards and transparency in all dealings.",
    icon: <Shield size={20} className="text-[#c5a35d]" />,
  },
  {
    title: "Vision",
    desc: "We identify opportunities where others see challenges, building for the long term.",
    icon: <Eye size={20} className="text-[#c5a35d]" />,
  },
  {
    title: "Excellence",
    desc: "We pursue the highest standards of operational performance and governance across our portfolio.",
    icon: <Target size={20} className="text-[#c5a35d]" />,
  },
];

export default function OurValues() {
  return (
    <section className="bg-[#e9ecef] py-28 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header - Centered per principle.png */}
        <div className="text-center mb-20">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-5 block">
            Our Values
          </span>
          <h2 className="text-4xl md:text-[52px] font-serif text-[#0a1622] font-bold leading-tight">
            The principles that guide us
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white p-12 rounded-xl border border-gray-100/50 shadow-sm flex flex-col items-center text-center transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Icon Box - Soft gray background per the reference */}
              <div className="mb-8 p-5 bg-[#f4f4f4] rounded-lg flex items-center justify-center">
                {v.icon}
              </div>

              <h3 className="text-[22px] font-bold font-serif text-[#0a1622] mb-5">
                {v.title}
              </h3>

              <p className="text-gray-500 text-[16px] leading-[1.7] font-medium max-w-[280px]">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
