import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-[#0a1622] flex items-center justify-center px-8">
      <div className="max-w-2xl text-center">
        {/* Large Decorative Number */}
        <h1 className="text-[120px] md:text-[180px] font-serif font-bold text-white/5 leading-none select-none">
          404
        </h1>

        {/* Content Box - Pulled up slightly to overlap the 404 */}
        <div className="-mt-12 md:-mt-20">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[12px] font-bold mb-6 block">
            Error
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white font-bold mb-6">
            Page not found
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-md mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 bg-[#c5a35d] text-[#0a1622] px-8 py-4 rounded-md font-bold text-[13px] uppercase tracking-[0.2em] hover:bg-white transition-all duration-300"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            <Link
              to="/contact"
              className="text-white/60 hover:text-white text-[13px] font-bold uppercase tracking-[0.2em] transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
