// components/LegalPage.jsx
export default function LegalPage({ data }) {
  if (!data) return null;

  return (
    <section className="bg-white py-32 px-8 md:px-16 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="border-b border-gray-100 pb-10 mb-16">
          <h1 className="text-[48px] font-serif text-[#0a1622] font-bold mb-6 leading-tight">
            {data.title}
          </h1>
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#c5a35d]"></span>
            <p className="text-gray-400 text-[11px] uppercase tracking-[0.2em] font-bold">
              Last Updated: {data.lastUpdated}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-16">
          {data.sections.map((item, idx) => (
            <div key={idx} className="group">
              <h3 className="text-[#0a1622] text-[22px] font-bold mb-5 flex items-baseline gap-4">
                <span className="text-[#c5a35d] text-[14px] font-sans italic opacity-50">
                  0{idx + 1}
                </span>
                {item.heading}
              </h3>
              <p className="text-gray-500 leading-[1.8] text-[17px] font-medium">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Support Footer */}
        <div className="mt-24 pt-10 border-t border-gray-100">
          <p className="text-gray-400 text-sm">
            Questions regarding these documents? Please contact our legal team
            at{" "}
            <a
              href="mailto:legal@kaffaholding.com"
              className="text-[#c5a35d] font-bold hover:underline"
            >
              legal@kaffaholding.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
