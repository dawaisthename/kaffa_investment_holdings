import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactForm() {
  return (
    <section className="bg-white py-28 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left: Message Form */}
        <div className="lg:col-span-2">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-5 block">
            Send a Message
          </span>
          <h2 className="text-4xl font-serif text-[#0a1622] font-bold mb-6">
            Get in touch
          </h2>
          <p className="text-gray-500 mb-12 font-medium">
            Fill out the form below and our team will respond within two
            business days.
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-widest">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="bg-[#fcfcfc] border border-gray-100 p-4 rounded outline-none focus:border-[#c5a35d] transition-all text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-widest">
                Email *
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                className="bg-[#fcfcfc] border border-gray-100 p-4 rounded outline-none focus:border-[#c5a35d] transition-all text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-widest">
                Company
              </label>
              <input
                type="text"
                placeholder="Your company (optional)"
                className="bg-[#fcfcfc] border border-gray-100 p-4 rounded outline-none focus:border-[#c5a35d] transition-all text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-widest">
                Inquiry Type
              </label>
              <select className="bg-[#fcfcfc] border border-gray-100 p-4 rounded outline-none focus:border-[#c5a35d] transition-all text-sm text-gray-500 appearance-none">
                <option>Select type</option>
                <option>Investment</option>
                <option>Partnership</option>
                <option>Media</option>
              </select>
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-widest">
                Message *
              </label>
              <textarea
                rows="5"
                placeholder="How can we help?"
                className="bg-[#fcfcfc] border border-gray-100 p-4 rounded outline-none focus:border-[#c5a35d] transition-all text-sm resize-none"
              ></textarea>
            </div>
            <button className="md:col-span-2 bg-[#0a1622] text-white py-4 rounded font-bold text-[12px] uppercase tracking-[0.3em] hover:bg-[#162a3d] transition-all mt-4 flex items-center justify-center gap-2">
              Send Message <span>→</span>
            </button>
          </form>
        </div>

        {/* Right: Sidebar Info */}
        <div className="flex flex-col gap-10">
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c5a35d] mb-6">
              General Inquiries
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:info@kaffaholding.com"
                className="flex items-center gap-3 text-gray-600 hover:text-[#0a1622] text-[15px] font-medium transition-colors"
              >
                <Mail size={18} className="text-[#c5a35d]" />{" "}
                info@kaffaholding.com
              </a>
              <a
                href="tel:+97140000000"
                className="flex items-center gap-3 text-gray-600 hover:text-[#0a1622] text-[15px] font-medium transition-colors"
              >
                <Phone size={18} className="text-[#c5a35d]" /> +971 4 000 0000
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c5a35d] mb-6">
              Investment Inquiries
            </h4>
            <a
              href="mailto:investments@kaffaholding.com"
              className="flex items-center gap-3 text-gray-600 hover:text-[#0a1622] text-[15px] font-medium transition-colors"
            >
              <Mail size={18} className="text-[#c5a35d]" />{" "}
              investments@kaffaholding.com
            </a>
          </div>

          <div className="bg-[#f8f9fa] rounded-xl h-64 flex flex-col items-center justify-center text-gray-400 border border-gray-100">
            <MapPin size={32} className="mb-2 opacity-20" />
            <span className="text-[12px] uppercase tracking-widest font-bold">
              Map placeholder
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
