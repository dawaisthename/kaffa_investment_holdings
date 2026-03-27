import React, { useState, useEffect } from "react";

export default function SubmitApplication({ prefilledPosition = "" }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    position: prefilledPosition,
    message: "",
  });
  const [resume, setResume] = useState(null);

  // Update position if the prop changes (e.g., when navigating between different jobs)
  useEffect(() => {
    setFormData((prev) => ({ ...prev, position: prefilledPosition }));
  }, [prefilledPosition]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle text + file upload
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("position", formData.position);
    data.append("message", formData.message);
    if (resume) data.append("resume", resume);

    try {
      // Logic for your API call goes here
      console.log("Submitting:", Object.fromEntries(data));
      alert("Application sent successfully!");
    } catch (err) {
      alert("Failed to send application.");
    }
  };

  return (
    <section id="apply-form" className="bg-[#f8f9fa] py-28 px-8 md:px-16">
      <div className="max-w-3xl mx-auto">
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

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="text-[#0a1622] text-[11px] font-bold uppercase tracking-[0.2em]"
            >
              Full Name *
            </label>
            <input
              required
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              className="bg-[#fcfcfc] border border-gray-300 shadow-sm p-2 text-[14px] text-black rounded outline-none focus:border-[#c5a35d] transition-colors placeholder:text-gray-400"
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
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@email.com"
              className="bg-[#fcfcfc] border border-gray-300 shadow-sm p-2 text-[14px] text-black rounded outline-none focus:border-[#c5a35d] transition-colors placeholder:text-gray-400"
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <label
              htmlFor="position"
              className="text-[#0a1622] text-[11px] font-bold uppercase tracking-[0.2em]"
            >
              Position of Interest *
            </label>
            <input
              required
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g., Investment Analyst"
              className="bg-[#fcfcfc] border border-gray-300 shadow-sm p-2 text-[14px] text-black rounded outline-none focus:border-[#c5a35d] transition-colors placeholder:text-gray-400"
            />
          </div>

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
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Tell us why you'd be a good fit..."
              className="bg-[#fcfcfc] border border-gray-300 shadow-sm p-2 text-[14px] text-black rounded outline-none focus:border-[#c5a35d] transition-colors placeholder:text-gray-400 resize-none"
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <label
              htmlFor="resumeUpload"
              className="text-[#0a1622] text-[11px] font-bold uppercase tracking-[0.2em]"
            >
              Resume{" "}
              {resume && (
                <span className="text-[#c5a35d] italic ml-2">
                  ({resume.name})
                </span>
              )}
            </label>
            <input
              type="file"
              id="resumeUpload"
              name="resume"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="resumeUpload"
              className={`border shadow-sm border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer group ${resume ? "border-[#c5a35d] bg-[#fcf8ef]" : "border-gray-300"}`}
            >
              <span className="text-gray-400 text-[13px] font-medium group-hover:text-[#0a1622]">
                {resume
                  ? "File selected! Click to change"
                  : "Drag & drop your resume or click to browse (PDF, DOCX)"}
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="md:col-span-2 bg-[#0a1622] text-white py-4 rounded font-bold text-[12px] uppercase tracking-[0.3em] hover:bg-[#162a3d] transition-all mt-4 shadow-sm flex items-center justify-center gap-2"
          >
            Submit Application <span>→</span>
          </button>
        </form>
      </div>
    </section>
  );
}
