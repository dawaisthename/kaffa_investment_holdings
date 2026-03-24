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

  // BG matches Hero exactly when not scrolled
  const headerBg = isScrolled
    ? "bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-200/50 py-3"
    : "bg-[#0a1622] py-6"; // Removed border-b to blend with Hero as seen in image

  return (
    <header
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out ${headerBg} px-6 md:px-16 flex justify-between items-center`}
    >
      {/* Logo Section - Aligned as per image */}
      <Link to="/" className="flex items-center gap-3 z-[101]">
        <img
          src={logo}
          alt="Kaffa Logo"
          className="w-8 md:w-10 h-8 md:h-10 object-contain"
        />
        <div className="flex flex-col leading-tight">
          <span
            className={`font-bold tracking-[0.2em] text-[14px] md:text-[16px] uppercase ${isScrolled ? "text-[#0a1622]" : "text-white"}`}
          >
            Kaffa
          </span>
          <span className="text-[8px] md:text-[9px] tracking-[0.15em] uppercase text-gray-400">
            Investment Holdings
          </span>
        </div>
      </Link>

      {/* Desktop Navigation - Compact & Centered */}
      <div className="hidden lg:flex items-center bg-transparent gap-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 text-[13px] font-medium transition-all duration-300 rounded-md ${
                isActive
                  ? "bg-[#e9ecef] text-[#0a1622] shadow-sm" // Active pill style
                  : isScrolled
                    ? "text-gray-600 hover:text-[#0a1622]"
                    : "text-gray-300 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="hidden lg:block">
        <Link
          to="/contact"
          className={`px-6 py-2.5 text-[13px] font-bold rounded-md transition-all duration-300 ${
            isScrolled
              ? "bg-[#0a1622] text-white hover:bg-[#162a3d]"
              : "bg-[#111d2a] text-white hover:bg-white hover:text-[#0a1622] border border-white/10"
          }`}
        >
          Get in Touch
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button
        className="lg:hidden z-[101] p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu
          size={28}
          className={isScrolled ? "text-[#0a1622]" : "text-white"}
        />
      </button>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 h-screen w-full bg-[#0a1622] transition-transform duration-500 ease-in-out transform 
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"} 
        lg:hidden flex flex-col items-center justify-center gap-8 z-[100]`}
      >
        <button
          className="absolute top-8 right-8 text-white"
          onClick={() => setIsMenuOpen(false)}
        >
          <X size={32} />
        </button>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-[24px] font-serif transition-colors ${
              pathname === link.path ? "text-[#c5a35d]" : "text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
}
