import { Link } from "react-router-dom";

export default function PartnerCTA() {
  return (
    <section className="bg-[#0a1622] py-28 px-8 md:px-16 text-center border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <span className="text-[#c5a35d] uppercase tracking-[0.5em] text-[12px] font-bold mb-8 block">
          Get In Touch
        </span>
        <h2 className="text-4xl md:text-[40px] font-serif text-white font-bold mb-8 leading-tight">
          Interested in partnering with us?
        </h2>
        <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
          Whether you are an investor, entrepreneur, or prospective partner, we
          welcome the opportunity to explore how we can create value together.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {/* Contact Button */}
          <Link
            to="/contact"
            className="w-full md:w-auto bg-[#c5a35d] hover:bg-[#b08f4a] text-[#0a1622] 
               px-5 py-2.5 rounded-md 
               text-[12px] font-semibold uppercase tracking-[0.2em] 
               transition-all duration-300 text-center 
               flex items-center justify-center"
          >
            Contact Us
          </Link>

          {/* Investment Button */}
          <Link
            to="/investment"
            className="w-full md:w-auto text-white border border-white/30 rounded-md 
               px-5 py-2.5
               text-[12px] font-semibold uppercase tracking-[0.2em] 
               transition-all duration-300 text-center 
               flex items-center justify-center
               hover:border-[#c5a35d]"
          >
            Investment Criteria
          </Link>
        </div>
      </div>
    </section>
  );
}
