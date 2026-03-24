const stats = [
  { label: "Years of Excellence", value: "10+" },
  { label: "Portfolio Companies", value: "8" },
  { label: "Major Sectors", value: "3" },
  { label: "Assets Under Management", value: "$500M+" },
];

export default function StatsBar() {
  return (
    <section className="bg-white py-14 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-start">
              {/* Serif font for numbers to match Kaffa branding */}
              <span className="text-3xl md:text-4xl font-serif text-[#0a1622] mb-2">
                {stat.value}
              </span>
              {/* Wide tracking for the label */}
              <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-bold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
