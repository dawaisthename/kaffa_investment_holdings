import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative bg-[#0a1622] text-white pt-52 pb-32 px-8 md:px-16 lg:px-24 overflow-hidden">
      {/* Background Gradient to mimic the subtle lighting in the screenshot */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          {/* Main Heading - using font-serif (Playfair) and tracking-tight */}
          <h1 className="text-white text-5xl md:text-7xl font-serif leading-[1.05] mb-8 tracking-tight font-bold">
            Building enduring value across sectors
          </h1>

          {/* Subtext - adjusted gray and spacing */}
          <p className="text-gray-400 text-lg md:text-lg leading-relaxed mb-12 max-w-2xl font-medium">
            Kaffa Holding is a diversified investment group deploying long-term
            capital across real estate, technology, logistics, agriculture,
            financial services, and energy.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Primary Button */}
            <Link
              to="/portfolio"
              className="w-full sm:w-auto bg-[#c5a35d] text-black px-8 py-2.5 rounded-md 
               text-sm font-medium tracking-wide 
               flex items-center justify-center gap-3 
               hover:bg-white transition-all duration-300"
            >
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
            </Link>

            {/* Secondary Button */}
            <Link
              to="/contact"
              className="w-full sm:w-auto text-white border border-white/30 px-8 py-2.5 rounded-md 
               text-sm font-medium tracking-wide 
               flex items-center justify-center
               hover:border-[#c5a35d] transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
