import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Briefcase, MapPin, Clock, ChevronLeft, Loader2 } from "lucide-react";
// Import your existing component
import SubmitApplication from "./SubmitApplication";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/careers/${id}`,
        );
        setJob(response.data);
      } catch (err) {
        console.error("Job not found");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="animate-spin text-[#c5a35d]" />
      </div>
    );
  if (!job) return <div className="p-20 text-center">Job not found.</div>;

  return (
    <div className="bg-[#fcfcfc]">
      {/* Hero Section */}
      <section className="bg-[#0a1622] pt-32 pb-20 px-8 text-white">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/careers")}
            className="text-[#c5a35d] flex items-center gap-2 text-xs font-bold uppercase mb-8 hover:opacity-75"
          >
            <ChevronLeft size={16} /> Back to opportunities
          </button>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            {job.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-[11px] font-bold uppercase tracking-widest text-gray-400">
            <span className="flex items-center gap-2 text-white">
              <Briefcase size={16} className="text-[#c5a35d]" />{" "}
              {job.department}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-[#c5a35d]" /> {job.location}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-[#c5a35d]" /> {job.jobType}
            </span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-10 rounded-xl border border-gray-100 shadow-sm leading-relaxed text-gray-600 whitespace-pre-wrap">
            <h3 className="text-xl font-serif font-bold text-[#0a1622] mb-6">
              Job Description
            </h3>
            {job.content}
          </div>
        </div>
      </section>

      {/* REUSED COMPONENT */}
      <SubmitApplication prefilledPosition={job.title} />
    </div>
  );
}
