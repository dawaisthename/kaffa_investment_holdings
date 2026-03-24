import { Clock, BarChart3, Globe, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Years of Operations", // Updated to match image text
    value: "10+",
    icon: <Clock size={20} strokeWidth={1.5} />,
  },
  {
    label: "Portfolio Companies",
    value: "8",
    icon: <BarChart3 size={20} strokeWidth={1.5} />,
  },
  {
    label: "Operating Regions", // Updated to match image text
    value: "3",
    icon: <Globe size={20} strokeWidth={1.5} />,
  },
  {
    label: "Assets Under Management",
    value: "$500M+",
    icon: <TrendingUp size={20} strokeWidth={1.5} />,
  },
];

export default function StatsBar() {
  return (
    <section className="bg-white py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Added divide-x to create the subtle vertical lines seen in the image */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 divide-gray-100 lg:divide-x">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center px-4"
            >
              {/* Icon - Gold color with margin for vertical spacing */}
              <div className="text-[#c5a35d] mb-6">{stat.icon}</div>

              {/* Value - Serif font, bold, dark navy */}
              <span className="text-4xl md:text-5xl font-serif text-[#0a1622] font-bold mb-3 tracking-tight">
                {stat.value}
              </span>

              {/* Label - Bold, uppercase, wide tracking */}
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-gray-500 font-extrabold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
