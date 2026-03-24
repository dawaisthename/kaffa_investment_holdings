export default function PartnerCTA() {
  return (
    <section className="bg-[#0a1622] py-28 px-8 md:px-16 text-center border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <span className="text-[#c5a35d] uppercase tracking-[0.5em] text-[12px] font-bold mb-8 block">
          Get In Touch
        </span>
        <h2 className="text-4xl md:text-6xl font-serif text-white font-bold mb-10 leading-tight">
          Interested in partnering with us?
        </h2>
        <p className="text-gray-400 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
          Whether you are an investor, entrepreneur, or prospective partner, we
          welcome the opportunity to explore how we can create value together.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {/* Contact Button */}
          <button className="bg-[#c5a35d] hover:bg-[#b08f4a] text-[#0a1622] px-12 py-5 rounded-md text-[12px] font-bold uppercase tracking-[0.2em] transition-all">
            Contact Us
          </button>

          {/* Secondary Button */}
          <button className="text-white border border-white/30 rounded-md hover:border-[#c5a35d] px-8 py-5 text-[12px] font-bold uppercase tracking-[0.2em] transition-all">
            Investment Criteria
          </button>
        </div>
      </div>
    </section>
  );
}
