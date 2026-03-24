export default function OurStory() {
  return (
    <section className="bg-white py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-start">
        {/* Left Side: Narrative Content */}
        <div className="pt-2">
          {/* Gold Subtitle - Matches 'OUR STORY' tag */}
          <span className="text-[#c5a35d] uppercase tracking-[0.25em] text-[11px] font-bold mb-5 block">
            Our Story
          </span>

          {/* Main Heading - Tight leading */}
          <h2 className="text-[42px] md:text-[52px] font-serif text-[#0a1622] font-bold mb-8 leading-[1.1] tracking-tight">
            Built on conviction, driven by purpose
          </h2>

          {/* Body Text - Matches the 2-paragraph layout */}
          <div className="space-y-6 text-[#4b5563] text-[16px] md:text-[17px] leading-[1.6] font-medium max-w-[90%]">
            <p>
              Kaffa Holding was established with a clear mandate: to create a
              diversified investment platform that generates sustainable value
              for stakeholders while contributing to the economic development of
              the communities we operate in.
            </p>
            <p>
              From our origins in regional real estate, we have grown into a
              multi-sector holding company with investments across technology,
              logistics, agriculture, financial services, and energy. Our
              approach combines rigorous analysis with an entrepreneurial
              mindset.
            </p>
          </div>
        </div>

        {/* Right Side: Mission & Vision Cards */}
        <div className="flex flex-col gap-5">
          {/* Mission Card - Matches 'MISSION' block */}
          <div className="bg-[#fcfcfc] p-8 md:p-10 border border-gray-100/60 rounded-xl">
            <span className="text-[#c5a35d] uppercase tracking-[0.2em] text-[10px] font-bold mb-4 block">
              Mission
            </span>
            <p className="text-[#0a1622] text-[18px] md:text-[20px] font-medium leading-[1.5]">
              To build and manage a portfolio of high-quality businesses that
              deliver lasting value for investors, employees, and communities.
            </p>
          </div>

          {/* Vision Card - Matches 'VISION' block */}
          <div className="bg-[#fcfcfc] p-8 md:p-10 border border-gray-100/60 rounded-xl">
            <span className="text-[#c5a35d] uppercase tracking-[0.2em] text-[10px] font-bold mb-4 block">
              Vision
            </span>
            <p className="text-[#0a1622] text-[18px] md:text-[20px] font-medium leading-[1.5]">
              To be recognized as a leading investment group known for
              principled governance, operational rigor, and sustainable impact
              across the markets we serve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
