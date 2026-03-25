export default function InvestmentHero() {
  return (
    <section className="bg-[#0a1622] pt-48 pb-32 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Sub-label for context */}
        <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-6 block">
          Strategic Capital
        </span>

        {/* Main Heading - Matches the 72px scale of the About Page */}
        <h1 className="text-white text-5xl md:text-6xl font-serif leading-[1.05] mb-5 tracking-tight font-bold">
          Investment & Partnerships
        </h1>

        {/* Detail Paragraph - Set to a specific max-width for readability */}
        <p className="text-gray-400 text-lg md:text-[20px] max-w-2xl leading-relaxed font-medium">
          We partner with exceptional entrepreneurs and businesses to create
          lasting value through patient capital and operational support.
        </p>
      </div>
    </section>
  );
}
