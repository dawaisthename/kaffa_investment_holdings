import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";

const jobs = [
  {
    title: "Investment Analyst",
    dept: "Investments",
    loc: "Dubai, UAE",
    type: "Full-time",
  },
  {
    title: "Senior Software Engineer",
    dept: "Kaffa Tech",
    loc: "Addis Ababa, Ethiopia",
    type: "Full-time",
  },
  {
    title: "Operations Manager",
    dept: "Kaffa Logistics",
    loc: "Jeddah, Saudi Arabia",
    type: "Full-time",
  },
  {
    title: "ESG & Sustainability Lead",
    dept: "Group Functions",
    loc: "Dubai, UAE",
    type: "Full-time",
  },
  {
    title: "Financial Controller",
    dept: "Kaffa Capital",
    loc: "Dubai, UAE",
    type: "Full-time",
  },
  {
    title: "Agricultural Scientist",
    dept: "Kaffa Agri",
    loc: "Jimma, Ethiopia",
    type: "Full-time",
  },
];
export default function OpenPositions() {
  // Helper function for smooth scrolling
  const scrollToForm = () => {
    const formElement = document.getElementById("apply-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#e9ecef] py-28 px-8 md:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-4 block">
            Open Positions
          </span>
          <h2 className="text-[42px] font-serif text-[#0a1622] font-bold mb-4">
            Current opportunities
          </h2>
          <p className="text-gray-500 font-medium">
            We are always looking for talented individuals who share our values
            and ambition.
          </p>
        </div>

        {/* Job List Container */}
        <div className="flex flex-col gap-3">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-[#c5a35d]/40 transition-all group cursor-pointer shadow-sm"
              onClick={scrollToForm} // Optional: makes the whole card clickable
            >
              {/* Job Info */}
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <h3 className="text-[16px] font-semibold text-[#0a1622] group-hover:text-[#c5a35d] transition-colors">
                  {job.title}
                </h3>

                {/* Metadata Row */}
                <div className="flex flex-wrap gap-5 text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                  <span className="flex items-center gap-2">
                    <Briefcase size={14} className="text-[#c5a35d]" />{" "}
                    {job.dept}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#c5a35d]" /> {job.loc}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={14} className="text-[#c5a35d]" /> {job.type}
                  </span>
                </div>
              </div>

              {/* Updated Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents double-triggering if card is clicked
                  scrollToForm();
                }}
                className="bg-[#fcfcfc] border border-gray-100 text-[#0a1622] px-6 py-2.5 rounded font-bold text-[12px] uppercase tracking-widest flex items-center gap-2 group-hover:bg-[#0a1622] group-hover:text-white transition-all whitespace-nowrap"
              >
                Apply <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
