const models = [
  {
    title: "Majority Acquisitions",
    desc: "We acquire controlling stakes in established businesses where we can drive operational excellence and long-term growth.",
  },
  {
    title: "Minority Investments",
    desc: "Strategic equity positions in high-growth companies where we can add value through governance, networks, and expertise.",
  },
  {
    title: "Joint Ventures",
    desc: "Collaborative ventures with niche international partners to enter specific regional markets, sectors, and asset classes.",
  },
];

export default function PartnershipModels() {
  return (
    <section className="bg-[#e9ecef]  py-28 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Centered Header Section */}
        <div className="text-center mb-16">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-5 block">
            Partnership Models
          </span>
          <h2 className="text-4xl md:text-[42px] font-serif text-[#0a1622] font-bold leading-tight">
            How we partner
          </h2>
          <p className="text-gray-500 text-[16px] md:text-[17px] mt-6 max-w-2xl mx-auto font-medium leading-relaxed">
            We offer flexible investment structures tailored to the needs of
            each opportunity and management team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((m, i) => (
            <div
              key={i}
              className="bg-white p-6 md:p-8 rounded-lg border border-gray-300 flex flex-col transition-all duration-500 hover:shadow-lg"
            >
              <h3 className="text-[20px] font-semibold text-[#0a1622] mb-3 leading-snug">
                {m.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-[16px] font-medium">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
