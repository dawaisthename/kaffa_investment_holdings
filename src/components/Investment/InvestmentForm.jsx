export default function InvestmentForm() {
  return (
    <section className="bg-[#0a1622] py-28 px-8 md:px-16">
      <div className="max-w-3xl mx-auto">
        {/* Header Text */}
        <div className="text-center mb-16">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-5 block">
            Submit an Opportunity
          </span>
          <h2 className="text-white font-serif text-4xl md:text-[42px] font-bold mb-6">
            Tell us about your business
          </h2>
          <p className="text-gray-400 text-[16px] max-w-xl mx-auto leading-relaxed">
            If you believe your company aligns with our investment focus, we
            would like to hear from you.
          </p>
        </div>

        {/* The Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          {/* Row 1 */}
          <div className="flex flex-col gap-2.5">
            <label className="text-white text-[11px] font-bold uppercase tracking-[0.2em]">
              Full Name *
            </label>
            <input
              placeholder="Your full name"
              className="bg-white/5 border border-white/10 p-4 text-[14px] text-white rounded focus:border-[#c5a35d] outline-none transition-colors placeholder:text-gray-600"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-white text-[11px] font-bold uppercase tracking-[0.2em]">
              Email *
            </label>
            <input
              placeholder="email@example.com"
              className="bg-white/5 border border-white/10 p-4 text-[14px] text-white rounded focus:border-[#c5a35d] outline-none transition-colors placeholder:text-gray-600"
            />
          </div>

          {/* Row 2 */}
          <div className="flex flex-col gap-2.5">
            <label className="text-white text-[11px] font-bold uppercase tracking-[0.2em]">
              Company Name *
            </label>
            <input
              placeholder="Company name"
              className="bg-white/5 border border-white/10 p-4 text-[14px] text-white rounded focus:border-[#c5a35d] outline-none transition-colors placeholder:text-gray-600"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-white text-[11px] font-bold uppercase tracking-[0.2em]">
              Sector
            </label>
            <select className="bg-white/5 border border-white/10 p-4 text-[14px] text-gray-400 rounded focus:border-[#c5a35d] outline-none transition-colors appearance-none">
              <option>Select sector</option>
              <option>Real Estate</option>
              <option>Technology</option>
              <option>Energy</option>
            </select>
          </div>

          {/* Message Area */}
          <div className="md:col-span-2 flex flex-col gap-2.5">
            <label className="text-white text-[11px] font-bold uppercase tracking-[0.2em]">
              Tell us about your company and the opportunity *
            </label>
            <textarea
              rows="5"
              placeholder="Brief description..."
              className="bg-white/5 border border-white/10 p-4 text-[14px] text-white rounded focus:border-[#c5a35d] outline-none transition-colors placeholder:text-gray-600 resize-none"
            />
          </div>

          {/* Attachment Placeholder - Per image reference */}
          <div className="md:col-span-2 border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-white/20 transition-colors cursor-pointer group">
            <span className="text-gray-500 text-[13px] group-hover:text-gray-400">
              Drag and drop and files here to upload (PDF, PPTX, DOCX)
            </span>
          </div>

          {/* Submit Button */}
          <button className="md:col-span-2 bg-[#c5a35d] text-[#0a1622] py-4 rounded font-bold text-[12px] uppercase tracking-[0.3em] hover:bg-[#d4b573] transition-all mt-4">
            Submit Opportunity
          </button>
        </form>
      </div>
    </section>
  );
}
