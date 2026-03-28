import React, { useState, useEffect } from "react";
import client from "../../api/client";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, Clock, ArrowRight, Loader2 } from "lucide-react";

export default function OpenPositions() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await client.get("/careers");
        setJobs(response.data);
      } catch (err) {
        console.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const scrollToForm = (jobTitle) => {
    // Optional: You can pass the jobTitle to the form state here
    const formElement = document.getElementById("apply-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading)
    return (
      <div className="py-20 flex justify-center bg-[#e9ecef]">
        <Loader2 className="animate-spin text-[#c5a35d]" />
      </div>
    );

  return (
    <section className="bg-[#e9ecef] py-28 px-8 md:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-4 block">
            Open Positions
          </span>
          <h2 className="text-[42px] font-serif text-[#0a1622] font-bold mb-4">
            Current opportunities
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-lg border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-[#c5a35d]/40 transition-all group cursor-pointer shadow-sm"
              onClick={() => navigate(`/careers/${job._id}`)}
            >
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <h3 className="text-[16px] font-semibold text-[#0a1622] group-hover:text-[#c5a35d] transition-colors">
                  {job.title}
                </h3>

                <div className="flex flex-wrap gap-5 text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                  <span className="flex items-center gap-2">
                    <Briefcase size={14} className="text-[#c5a35d]" />{" "}
                    {job.department}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#c5a35d]" />{" "}
                    {job.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={14} className="text-[#c5a35d]" /> {job.jobType}
                  </span>
                </div>
              </div>

              <button className="bg-[#fcfcfc] border border-gray-100 text-[#0a1622] px-6 py-2.5 rounded font-bold text-[12px] uppercase tracking-widest flex items-center gap-2 group-hover:bg-[#0a1622] group-hover:text-white transition-all">
                Apply <ArrowRight size={14} />
              </button>
            </div>
          ))}

          {jobs.length === 0 && (
            <p className="text-center text-gray-400 italic">
              No open positions at the moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
