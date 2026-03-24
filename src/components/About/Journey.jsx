const milestones = [
  {
    year: "2011",
    desc: "Kaffa Holding was founded with a focus on regional real estate development.",
  },
  {
    year: "2013",
    desc: "Expansion into technology and logistics, opening our first international office.",
  },
  {
    year: "2015",
    desc: "Formed strategic partnerships with leading financial institutions in the region.",
  },
  {
    year: "2020",
    desc: "Established Kaffa Capital to manage third-party investment funds.",
  },
  {
    year: "2022",
    desc: "Exceeded $500M in assets under management, across 6 active operating sectors.",
  },
  {
    year: "2025",
    desc: "Launched energy and infrastructure fund to drive sustainable growth initiatives.",
  },
];

export default function Journey() {
  return (
    <section className="bg-white py-24 px-8 md:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-5 block">
            Our History
          </span>
          <h2 className="text-4xl md:text-[52px] font-serif text-[#0a1622] font-bold leading-tight">
            Our journey so far
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[24px] top-0 bottom-0 w-[1px] bg-gray-100 hidden md:block" />

          <div className="flex flex-col">
            {milestones.map((item, i) => (
              <div
                key={i}
                className={`relative flex items-start gap-6 md:gap-10 ${
                  i !== milestones.length - 1 ? "mb-8 md:mb-16" : ""
                }`}
              >
                {/* Year Circle */}
                <div className="z-10 w-12 h-12 rounded-full border border-[#c5a35d] bg-white flex items-center justify-center shrink-0 mt-1">
                  <span className="text-[#c5a35d] text-[11px] font-bold tracking-tighter">
                    {item.year.slice(2)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                  <span className="text-[20px] font-serif font-bold text-[#0a1622] shrink-0 w-14">
                    {item.year}
                  </span>
                  <p className="text-gray-500 text-[15px] leading-relaxed font-medium border-l border-gray-100 pl-6 md:pl-8">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
