import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import {
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Loader2,
  Building2,
} from "lucide-react";
import client from "../api/client"; // Ensure this path is correct
import logo from "../assets/Logo/kaffa_logo.png"; // Assuming you have a logo image in this path
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        // Matches the "contacts_info" tab ID from your dashboard
        const response = await client.get("/contactInfo/footer");
        setOffices(response.data);
      } catch (err) {
        console.error("Failed to fetch office locations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffices();
  }, []);

  if (loading) {
    return (
      <div className="py-28 flex justify-center items-center">
        <Loader2 className="animate-spin text-[#c5a35d]" size={40} />
      </div>
    );
  }

  return (
    <footer className="bg-[#07111a] text-white pt-20 pb-10 px-8 md:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Column 1: Brand & Identity */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-1">
              <img
                src={logo}
                alt="Kaffa Logo"
                className="w-14 h-14 object-contain brightness-110"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-bold tracking-[0.3em] text-[14px] uppercase">
                  Kaffa
                </span>
                <span className="text-[14px] tracking-[0.15em] uppercase text-gray-400">
                  Investment Holdings
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-[15px] leading-relaxed max-w-xs">
              Building enduring value through strategic investments across
              diversified sectors and geographies.
            </p>
            <div className="flex gap-4 mt-2">
              <SocialIcon Icon={Linkedin} />
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Mail} />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <FooterColumn
            title="Company"
            links={[
              { name: "About Us", path: "/about" },
              { name: "Our Portfolio", path: "/portfolio" },
              { name: "Investment Strategy", path: "/investment" },
              { name: "Careers", path: "/careers" },
            ]}
          />

          {/* Column 3: Insights */}
          <FooterColumn
            title="Resources"
            links={[
              { name: "News & Insights", path: "/news" },
              { name: "Contact Support", path: "/contact" },
              { name: "Privacy Policy", path: "/privacy" },
            ]}
          />

          {/* Column 4: Contact Info */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[13px] uppercase tracking-[0.3em] text-[#c5a35d] font-bold">
              Global Office
            </h4>
            <div className="flex items-start gap-3 text-gray-400 text-[14px]">
              <MapPin size={18} className="text-[#c5a35d]  shrink-0" />
              <span>
                {offices[0]?.addressLine}, {offices[0]?.city},{" "}
                {offices[0]?.country} {offices[0]?.zipCode}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-400 text-[14px]">
              <Phone size={18} className="text-[#c5a35d] shrink-0" />
              <span>+{offices[0]?.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400 text-[14px]">
              <Mail size={18} className="text-[#c5a35d] shrink-0" />
              {console.log("Offices data in footer:", offices)}
              <span>{offices[0]?.email}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:row-reverse md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 tracking-[0.2em] uppercase font-medium">
          <p>© {currentYear} Kaffa Investment Holding. All rights reserved.</p>
          <div className="flex gap-8 text-[12px] uppercase tracking-widest font-bold text-gray-500">
            <Link
              to="/terms"
              className="hover:text-[#c5a35d] transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="hover:text-[#c5a35d] transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/cookies"
              className="hover:text-[#c5a35d] transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Sub-components
const FooterColumn = ({ title, links }) => (
  <div className="flex flex-col gap-5">
    <h4 className="text-[12px] uppercase tracking-[0.3em] text-[#c5a35d] font-bold">
      {title}
    </h4>
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className="text-gray-400 hover:text-white text-[14px] transition-colors duration-300 w-fit"
        >
          {link.name}
        </Link>
      ))}
    </div>
  </div>
);

const SocialIcon = ({ Icon }) => (
  <a
    href="#"
    className="w-9 h-9 border border-white/10 flex items-center justify-center hover:bg-[#c5a35d] hover:border-[#c5a35d] transition-all group"
  >
    <Icon size={16} className="text-gray-400 group-hover:text-white" />
  </a>
);
