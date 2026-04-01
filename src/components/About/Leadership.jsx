import React, { useState, useEffect } from "react";
import { User, Loader2 } from "lucide-react";
import client from "../../api/client"; // Adjust this path to your client file

export default function Leadership() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch team data from the backend
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await client.get("/team");
        setTeam(response.data);
      } catch (err) {
        console.error("Error fetching team:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <section className="bg-[#FAFAFA] py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-5 block">
            Leadership
          </span>
          <h2 className="text-4xl md:text-[40px] font-serif text-[#0a1622] leading-tight mb-2 font-bold">
            Experienced team, proven track record
          </h2>
          <p className="text-gray-500 text-lg md:text-[20px] leading-relaxed max-w-3xl mx-auto font-medium">
            Our senior leadership brings decades of combined experience in
            finance, operations, and strategic management.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#c5a35d]" size={40} />
          </div>
        ) : (
          /* Team Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member._id}
                className="bg-white p-10 rounded-xl border border-gray-100/80 shadow-sm flex flex-col items-center text-center transition-all duration-500 hover:shadow-md"
              >
                {/* Profile Image Logic */}
                <div className="mb-8 w-24 h-24 bg-[#f4f4f4] rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-50">
                  {console.log(
                    "Member profile image URL:",
                    member.profileImageUrl,
                  )}
                  {member.profileImageUrl ? (
                    <img
                      src={
                        member.profileImageUrl
                          ? `http://localhost:5000${member.profileImageUrl.replace(/\\/g, "/")}`
                          : "/placeholder-profile.png"
                      }
                      alt={member.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User
                      className="text-gray-400"
                      size={40}
                      strokeWidth={1.5}
                    />
                  )}
                </div>

                <h3 className="text-[18px] font-semibold text-[#0a1622] mb-1">
                  {member.fullName}
                </h3>

                <p className="text-[#c5a35d] uppercase tracking-[0.15em] text-[11px] font-bold mb-4">
                  {member.roleTitle}
                </p>

                <p className="text-gray-500 text-[14px] leading-[1.7] font-medium">
                  {member.biography}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
