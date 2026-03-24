export default function Governance() {
  return (
    <section className="bg-[#0a1622] py-24 px-8 md:px-16 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Gold Tagline */}
        <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-6 block">
          Governance & Ethics
        </span>

        {/* Serif Heading */}
        <h2 className="text-white font-serif text-4xl md:text-[52px] font-bold mb-8 leading-tight">
          Committed to the highest standards
        </h2>

        {/* Narrative text with balanced width */}
        <p className="text-gray-400 text-[16px] md:text-[18px] leading-relaxed mb-12 max-w-3xl mx-auto">
          Kaffa Holding maintains rigorous corporate governance standards across
          all operations and portfolio companies. Our Board of Directors
          provides independent oversight, and we adhere to international best
          practices in compliance, risk management, and ESG reporting.
        </p>

        {/* Action/Pillar Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Independent Board Oversight",
            "Regulatory Compliance",
            "ESG Commitment",
          ].map((pillar, i) => (
            <button
              key={i}
              className="px-8 py-4 border border-white/10 rounded-lg text-white text-[13px] font-bold tracking-wide hover:bg-white/5 hover:border-[#c5a35d]/50 transition-all duration-300"
            >
              {pillar}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
