export default function Hero() {
  return (
    <section className="relative bg-kaffa-dark text-white pt-52 pb-32 px-8 md:px-16 lg:px-24 overflow-hidden">
      {/* Background Gradient to mimic the subtle lighting in the screenshot */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          {/* Main Heading - using font-serif (Playfair) and tracking-tight */}
          <h1 className="text-white text-5xl md:text-7xl font-serif leading-[1.1] mb-8 tracking-tight font-medium">
            Building enduring <br />
            value across sectors
          </h1>

          {/* Subtext - adjusted gray and spacing */}
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl font-light">
            Kaffa Holding is a diversified investment group deploying long-term
            capital across real estate, technology, logistics, agriculture,
            financial services, and energy.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Primary Button: Rounded-sm with Arrow Icon */}
            <button className="w-full sm:w-auto bg-kaffa-gold text-black font-semibold px-8 py-4 rounded-md hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 text-sm tracking-wide">
              Explore Our Portfolio
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </button>

            {/* Secondary Button: Outlined style from the image */}
            <button className="text-white border border-white/30 rounded-md hover:border-[#c5a35d] px-8 py-5 text-[12px] font-bold uppercase tracking-[0.2em] transition-all">
              Contat us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
