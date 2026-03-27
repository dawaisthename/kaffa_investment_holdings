import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";

export default function ContactForm() {
  return (
    <section className="bg-[#FAFAFA] py-28 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left: Message Form */}
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

          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {/* Input Wrapper Style for shadow and background */}
            {[
              {
                label: "Full Name *",
                placeholder: "Your full name",
                type: "text",
              },
              {
                label: "Email *",
                placeholder: "you@company.com",
                type: "email",
              },
              {
                label: "Company",
                placeholder: "Your company (optional)",
                type: "text",
              },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <label className="text-[#0a1622] text-[11px] font-bold uppercase tracking-widest">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="bg-[#f9f9f9] text-black border border-gray-200/50 p-2 rounded-md outline-none focus:border-[#c5a35d] focus:ring-1 focus:ring-[#c5a35d] transition-all text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
                />
              </div>
            ))}

            {/* Inquiry Type Select */}
            <div className="flex flex-col gap-3">
              <label className="text-[#0a1622] text-[11px] font-bold uppercase tracking-widest">
                Inquiry Type
              </label>
              <div className="relative">
                <select className="w-full bg-[#f9f9f9] border border-gray-200/50 p-2 rounded-md outline-none focus:border-[#c5a35d] focus:ring-1 focus:ring-[#c5a35d] transition-all text-sm text-gray-500 appearance-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] cursor-pointer">
                  <option>General Inquiry</option>
                  <option>Investment Inquiry</option>
                  <option>Partnership</option>
                  <option>Media / Press</option>
                  <option>Careers</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Message Area */}
            <div className="md:col-span-2 flex flex-col gap-3">
              <label className="text-[#0a1622] text-[11px] font-bold uppercase tracking-widest">
                Message *
              </label>
              <textarea
                rows="6"
                placeholder="How can we help?"
                className="bg-[#f9f9f9] text-black border border-gray-200/50 p-4 rounded-md outline-none focus:border-[#c5a35d] focus:ring-1 focus:ring-[#c5a35d] transition-all text-sm resize-none shadow-[inset_0_1px_2_rgba(0,0,0,0.05)]"
              ></textarea>
            </div>

            <button className="md:col-span-2 bg-[#0a1622] text-white py-5 rounded-md font-bold text-[13px] uppercase tracking-[0.3em] hover:bg-[#162a3d] transition-all mt-4 flex items-center justify-center gap-2">
              Send Message <span className="text-lg">→</span>
            </button>
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
