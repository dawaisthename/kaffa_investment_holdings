import React, { useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin, ChevronDown, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    inquiryType: "General Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/contacts", formData);
      setStatus({ type: "success", msg: "Message sent successfully!" });
      setFormData({
        fullName: "",
        email: "",
        company: "",
        inquiryType: "General Inquiry",
        message: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        msg: "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#FAFAFA] py-28 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-5 block">
            Send a Message
          </span>
          <h2 className="text-[48px] font-serif text-[#0a1622] font-bold mb-6">
            Get in touch
          </h2>
          <p className="text-gray-500 mb-12 font-medium">
            Fill out the form below and our team will respond within two
            business days.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10"
          >
            {/* Full Name */}
            <div className="flex flex-col gap-3">
              <label className="text-[#0a1622] text-[11px] font-bold uppercase tracking-widest">
                Full Name *
              </label>
              <input
                required
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="bg-[#f9f9f9] text-black border border-gray-200/50 p-3 rounded-md outline-none focus:border-[#c5a35d] transition-all text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-3">
              <label className="text-[#0a1622] text-[11px] font-bold uppercase tracking-widest">
                Email *
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="bg-[#f9f9f9] text-black border border-gray-200/50 p-3 rounded-md outline-none focus:border-[#c5a35d] transition-all text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
              />
            </div>

            {/* Company */}
            <div className="flex flex-col gap-3">
              <label className="text-[#0a1622] text-[11px] font-bold uppercase tracking-widest">
                Company
              </label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company (optional)"
                className="bg-[#f9f9f9] text-black border border-gray-200/50 p-3 rounded-md outline-none focus:border-[#c5a35d] transition-all text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
              />
            </div>

            {/* Inquiry Type */}
            <div className="flex flex-col gap-3">
              <label className="text-[#0a1622] text-[11px] font-bold uppercase tracking-widest">
                Inquiry Type
              </label>
              <div className="relative">
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full bg-[#f9f9f9] border border-gray-200/50 p-3 rounded-md outline-none focus:border-[#c5a35d] transition-all text-sm text-gray-500 appearance-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] cursor-pointer"
                >
                  <option>General Inquiry</option>
                  <option>Investment Inquiry</option>
                  <option>Partnership</option>
                  <option>Media / Press</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Message */}
            <div className="md:col-span-2 flex flex-col gap-3">
              <label className="text-[#0a1622] text-[11px] font-bold uppercase tracking-widest">
                Message *
              </label>
              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="How can we help?"
                className="bg-[#f9f9f9] text-black border border-gray-200/50 p-4 rounded-md outline-none focus:border-[#c5a35d] transition-all text-sm resize-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
              ></textarea>
            </div>

            <button
              disabled={loading}
              className="md:col-span-2 bg-[#0a1622] text-white py-5 rounded-md font-bold text-[13px] uppercase tracking-[0.3em] hover:bg-[#162a3d] transition-all mt-4 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                "Send Message"
              )}{" "}
              <span className="text-lg">→</span>
            </button>

            {status.msg && (
              <p
                className={`md:col-span-2 text-center text-sm font-bold ${status.type === "success" ? "text-green-600" : "text-red-600"}`}
              >
                {status.msg}
              </p>
            )}
          </form>
        </div>

        {/* Right: Sidebar Info */}
        <div className="flex flex-col gap-8 pt-10 lg:pt-32">
          <div className="bg-white py-10 px-8 border border-gray-100 rounded-lg shadow-sm">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c5a35d] mb-8">
              General Inquiries
            </h4>
            <div className="space-y-6">
              <a
                href="mailto:info@kaffaholding.com"
                className="flex items-center gap-4 text-[#0a1622] hover:text-[#c5a35d] text-[15px] font-medium transition-colors"
              >
                <Mail size={18} className="text-[#c5a35d]" strokeWidth={1.5} />
                info@kaffaholding.com
              </a>
              <a
                href="tel:+97140000000"
                className="flex items-center gap-4 text-[#0a1622] hover:text-[#c5a35d] text-[15px] font-medium transition-colors"
              >
                <Phone size={18} className="text-[#c5a35d]" strokeWidth={1.5} />
                +971 4 000 0000
              </a>
            </div>
          </div>

          <div className="bg-white py-10 px-8 border border-gray-100 rounded-lg shadow-sm">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c5a35d] mb-8">
              Investment Inquiries
            </h4>
            <a
              href="mailto:investments@kaffaholding.com"
              className="flex items-center gap-4 text-[#0a1622] hover:text-[#c5a35d] text-[15px] font-medium transition-colors"
            >
              <Mail size={18} className="text-[#c5a35d]" strokeWidth={1.5} />
              investments@kaffaholding.com
            </a>
          </div>

          <div className="bg-[#f4f7f9] rounded-lg h-72 flex flex-col items-center justify-center text-gray-400 border border-gray-100">
            <MapPin size={32} className="mb-4 opacity-30 text-[#0a1622]" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#0a1622]/40">
              Map placeholder
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
