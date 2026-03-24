import { User } from "lucide-react";

const team = [
  {
    name: "Ahmed K. Osman",
    role: "Founder & Chairman",
    bio: "Over 25 years of experience in international finance and strategic investments across emerging and developed markets.",
  },
  {
    name: "Sara M. Tadesse",
    role: "Chief Executive Officer",
    bio: "Former senior partner at a leading global consultancy, specializing in corporate transformation and growth strategy.",
  },
  {
    name: "James R. Chen",
    role: "Chief Investment Officer",
    bio: "Extensive background in private equity and venture capital with a strong track record in value creation.",
  },
  {
    name: "Amina D. Hassan",
    role: "Chief Financial Officer",
    bio: "Expert in corporate finance and risk management, formerly with a Big Four advisory practice.",
  },
];

export default function Leadership() {
  return (
    <section className="bg-white py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Matches leadership.png */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-5 block">
            Leadership
          </span>
          <h2 className="text-4xl md:text-[52px] font-serif text-[#0a1622] leading-tight mb-6 font-bold">
            Experienced team, proven track record
          </h2>
          <p className="text-gray-500 text-lg md:text-[20px] leading-relaxed max-w-3xl mx-auto font-medium">
            Our senior leadership brings decades of combined experience in
            finance, operations, and strategic management.
          </p>
        </div>

        {/* Team Grid - 4 Columns per leadership.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div
              key={i}
              className="bg-white p-10 rounded-xl border border-gray-100/80 shadow-sm flex flex-col items-center text-center transition-all duration-500 hover:shadow-md"
            >
              {/* Profile Placeholder Circle */}
              <div className="mb-8 w-24 h-24 bg-[#f4f4f4] rounded-full flex items-center justify-center text-gray-400">
                <User size={40} strokeWidth={1.5} />
              </div>

              <h3 className="text-[20px] font-bold font-serif text-[#0a1622] mb-1">
                {member.name}
              </h3>

              <p className="text-[#c5a35d] uppercase tracking-[0.15em] text-[11px] font-bold mb-6">
                {member.role}
              </p>

              <p className="text-gray-500 text-[14px] leading-[1.7] font-medium">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
