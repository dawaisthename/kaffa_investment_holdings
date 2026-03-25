import { Clock, BarChart3, Globe, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Years of Operations",
    value: "10+",
    icon: <Clock size={20} strokeWidth={1.5} />,
  },
  {
    label: "Portfolio Companies",
    value: "8",
    icon: <BarChart3 size={20} strokeWidth={1.5} />,
  },
  {
    label: "Operating Regions",
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
    <section className="bg-white border-b-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x-2 divide-gray-200">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center px-4 py-8"
            >
              {/* Icon */}
              <div className="text-[#c5a35d] mb-6">{stat.icon}</div>

              {/* Value */}
              <span className="text-4xl font-serif text-[#0a1622] font-bold mb-3 tracking-tight">
                {stat.value}
              </span>

              {/* Label */}
              <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
