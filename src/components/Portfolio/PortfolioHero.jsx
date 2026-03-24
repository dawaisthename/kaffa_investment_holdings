export default function PortfolioHero() {
  return (
    <section className="bg-[#0a1622] pt-48 pb-32 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Gold Tagline */}
        <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-6 block">
          Our Portfolio
        </span>

        {/* Large Serif Title - Matches 'About Kaffa Holding' style */}
        <h1 className="text-white font-serif text-5xl md:text-7xl lg:text-[72px] font-bold mb-8 leading-[1.05] tracking-tight">
          Diversified growth <br /> across core sectors
        </h1>

        {/* Supporting Detail - Matches the Hero paragraph weight */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
          We manage a strategic portfolio of high-growth companies, leveraging
          our operational expertise and long-term capital to build market
          leaders across emerging and developed economies.
        </p>
      </div>
    </section>
  );
}
