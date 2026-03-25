const milestones = [
  {
    year: "2014",
    shortYear: "14",
    desc: "Kaffa Holding founded with an initial focus on regional real estate.",
  },
  {
    year: "2016",
    shortYear: "16",
    desc: "Expanded into technology investments; launched Kaffa Technologies.",
  },
  {
    year: "2018",
    shortYear: "18",
    desc: "Entered logistics and agriculture sectors; opened second regional office.",
  },
  {
    year: "2020",
    shortYear: "20",
    desc: "Established Kaffa Capital, our financial services arm.",
  },
  {
    year: "2022",
    shortYear: "22",
    desc: "Reached $250M in assets under management; expanded to three operating regions.",
  },
  {
    year: "2024",
    shortYear: "24",
    desc: "Launched energy portfolio; surpassed $500M in AUM milestone.",
  },
];

export default function Journey() {
  return (
    <section className="bg-[#FAFAFA] py-28 px-8 md:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Header - Matching 'MILESTONES' subhead in image */}
        <div className="text-center mb-20">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-5 block">
            Milestones
          </span>
          <h2 className="text-4xl md:text-[40px] font-serif text-[#0a1622] font-bold leading-tight">
            Our journey so far
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical Line - Centered on the circles */}
          <div className="absolute left-[24px] top-0 bottom-0 w-[1px] bg-gray-200" />

          <div className="flex flex-col gap-16">
            {milestones.map((item, i) => (
              <div key={i} className="relative flex items-start gap-10">
                {/* Year Circle (The '14', '16', etc) */}
                <div className="z-10 w-12 h-12 rounded-full border border-[#c5a35d] bg-white flex items-center justify-center shrink-0">
                  <span className="text-[#c5a35d] text-[13px] font-medium">
                    {item.shortYear}
                  </span>
                </div>

                {/* Content - Stacked Vertically */}
                <div className="flex flex-col pt-0">
                  <span className="text-[18px] font-semibold text-[#0a1622] mb-1">
                    {item.year}
                  </span>
                  <p className="text-gray-500 text-[16px] leading-relaxed max-w-lg">
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
