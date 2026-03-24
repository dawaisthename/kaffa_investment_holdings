export default function SubmitApplication() {
  return (
    <section className="bg-[#f8f9fa] py-28 px-8 md:px-16">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-5 block">
            Apply Now
          </span>
          <h2 className="text-4xl font-serif text-[#0a1622] font-bold mb-6">
            Submit your application
          </h2>
          <p className="text-gray-500 text-[16px] max-w-xl mx-auto leading-relaxed font-medium">
            Tell us about yourself and the role you are interested in. We review
            all applications carefully.
          </p>
        </div>

        {/* The Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          {/* Row 1 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="text-[#0a1622] text-[11px] font-bold uppercase tracking-[0.2em]"
            >
              Full Name *
            </label>
            <input
              id="fullName"
              name="fullName"
              placeholder="Your full name"
              className="bg-[#fcfcfc] border border-gray-300 shadow-sm p-4 text-[14px] text-black rounded outline-none focus:border-[#c5a35d] transition-colors placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[#0a1622] text-[11px] font-bold uppercase tracking-[0.2em]"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@email.com"
              className="bg-[#fcfcfc] border border-gray-300 shadow-sm p-4 text-[14px] text-black rounded outline-none focus:border-[#c5a35d] transition-colors placeholder:text-gray-400"
            />
          </div>

          {/* Row 2 - Position of Interest */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label
              htmlFor="position"
              className="text-[#0a1622] text-[11px] font-bold uppercase tracking-[0.2em]"
            >
              Position of Interest *
            </label>
            <input
              id="position"
              name="position"
              placeholder="e.g., Investment Analyst"
              className="bg-[#fcfcfc] border border-gray-300 shadow-sm p-4 text-[14px] text-black rounded outline-none focus:border-[#c5a35d] transition-colors placeholder:text-gray-400"
            />
          </div>

          {/* Message Area */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-[#0a1622] text-[11px] font-bold uppercase tracking-[0.2em]"
            >
              Cover Letter / Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Tell us why you'd be a good fit..."
              className="bg-[#fcfcfc] border border-gray-300 shadow-sm p-4 text-[14px] text-black rounded outline-none focus:border-[#c5a35d] transition-colors placeholder:text-gray-400 resize-none"
            />
          </div>

          {/* Resume Upload - Slim Style */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label
              htmlFor="resumeUpload"
              className="text-[#0a1622] text-[11px] font-bold uppercase tracking-[0.2em]"
            >
              Resume (Optional)
            </label>
            <input
              type="file"
              id="resumeUpload"
              name="resume"
              accept=".pdf,.doc,.docx"
              className="hidden"
            />
            <label
              htmlFor="resumeUpload"
              className="border border-gray-300 shadow-sm border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <span className="text-gray-400 text-[13px] font-medium">
                Drag & drop your resume or click to browse (PDF, DOCX)
              </span>
            </label>
          </div>

          {/* Submit Button - Dark Style */}
          <button className="md:col-span-2 bg-[#0a1622] text-white py-4 rounded font-bold text-[12px] uppercase tracking-[0.3em] hover:bg-[#162a3d] transition-all mt-4 shadow-sm flex items-center justify-center gap-2">
            Submit Application <span>→</span>
          </button>
        </form>
      </div>
    </section>
  );
}
