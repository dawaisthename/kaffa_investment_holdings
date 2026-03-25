export default function PortfolioHero() {
  return (
    <section className="bg-[#0a1622] pt-48 pb-32 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Gold Tagline */}
        {/* <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-6 block">
          Our Portfolio
        </span> */}

        {/* Large Serif Title - Matches 'About Kaffa Holding' style */}
        <h1 className="text-white text-5xl md:text-6xl font-serif leading-[1.05] mb-5 tracking-tight font-bold">
          Our Portfolio
        </h1>

        {/* Supporting Detail - Matches the Hero paragraph weight */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
          A diversified collection of high-quality businesses across key sectors
          and geographies.
        </p>
      </div>
    </section>
  );
}
