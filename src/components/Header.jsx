import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/Logo/kaffa_logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Investment", path: "/investment" },
  { name: "News", path: "/news" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FIX: Prevent background scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const headerBg = isScrolled
    ? "bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-200/50 py-3"
    : "bg-[#0a1622] border-b border-white/5 py-5";

  const textColor = isScrolled ? "text-[#1e3a8a]" : "text-white";
  const navInactiveColor = isScrolled ? "text-gray-700" : "text-gray-400";

  return (
    <header
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out ${headerBg} px-6 md:px-16 flex justify-between items-center`}
    >
      <Link to="/" className="flex items-center gap-2 z-[101]">
        <img
          src={logo}
          alt="Kaffa Logo"
          className="w-20 md:w-24 h-10 md:h-12 object-contain"
        />
        <div className="flex flex-col leading-[1.0] -mt-1">
          <span
            className={`font-bold tracking-[0.35em] text-[15px] md:text-[18px] uppercase transition-colors ${textColor}`}
          >
            Kaffa
          </span>
          <span
            className={`text-[10px] md:text-[12px] tracking-[0.22em] uppercase transition-colors ${isScrolled ? "text-gray-500" : "text-gray-400"}`}
          >
            Investment Holdings
          </span>
        </div>
      </Link>

      <div className="hidden lg:flex gap-10 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-[12px] font-bold uppercase tracking-[0.25em] transition-all hover:text-[#c5a35d] ${
              pathname === link.path ? textColor : navInactiveColor
            }`}
          >
            {link.name}
          </Link>
        ))}
        <Link
          to="/contact"
          className={`border-2 px-7 py-2 text-[11px] uppercase tracking-[0.25em] font-bold transition-all ${
            isScrolled
              ? "border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white"
              : "border-[#c5a35d] text-white hover:bg-[#c5a35d] hover:text-[#0a1622]"
          }`}
        >
          Get In Touch
        </Link>
      </div>

      <button
        className="lg:hidden z-[101] p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <X size={28} className="text-white" /> // Force white when menu open for visibility
        ) : (
          <Menu
            size={28}
            className={isScrolled ? "text-[#1e3a8a]" : "text-white"}
          />
        )}
      </button>

      {/* --- REFINED MOBILE DRAWER --- */}
      <div
        className={`fixed inset-0 h-screen w-full bg-[#0a1622] transition-transform duration-500 ease-in-out transform 
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"} 
        lg:hidden flex flex-col items-center justify-center gap-8 z-[100]`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-[20px] font-bold uppercase tracking-[0.3em] transition-colors ${
              pathname === link.path
                ? "text-[#c5a35d]"
                : "text-white hover:text-[#c5a35d]"
            }`}
          >
            {link.name}
          </Link>
        ))}
        <Link
          to="/contact"
          className="mt-6 border-2 border-[#c5a35d] text-[#c5a35d] px-12 py-4 text-[14px] uppercase tracking-[0.3em] font-bold hover:bg-[#c5a35d] hover:text-white transition-all"
        >
          Get In Touch
        </Link>
      </div>
    </header>
  );
}
