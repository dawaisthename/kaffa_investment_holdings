import React, { useState, useEffect } from "react";
import { Building2, Mail, Phone, Loader2 } from "lucide-react";
import client from "../../api/client"; // Ensure this path is correct

export default function OfficeLocations() {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        // Matches the "contacts_info" tab ID from your dashboard
        const response = await client.get("/contactInfo");
        setOffices(response.data);
      } catch (err) {
        console.error("Failed to fetch office locations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffices();
  }, []);

  if (loading) {
    return (
      <div className="py-28 flex justify-center items-center">
        <Loader2 className="animate-spin text-[#c5a35d]" size={40} />
      </div>
    );
  }

  return (
    <section className="bg-[#f4f7f9] py-28 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-5 block">
            Our Offices
          </span>
          <h2 className="text-[40px] font-serif text-[#0a1622] font-bold leading-tight">
            Where to find us
          </h2>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offices.length > 0 ? (
            offices.map((office) => (
              <div
                key={office._id}
                className="bg-white p-12 rounded-lg border border-gray-100 shadow-sm flex flex-col"
              >
                {/* City Header */}
                <div className="flex items-center gap-4 mb-8">
                  <Building2
                    size={24}
                    className="text-[#c5a35d]"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-[22px] font-bold text-[#0a1622]">
                    {office.city}
                  </h3>
                </div>

                {/* Region and Address */}
                <div className="mb-8">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 block mb-4">
                    {office.country}
                  </span>
                  <p className="text-gray-500 text-[15px] leading-relaxed">
                    {office.addressLine} <br />
                    {office.city}, {office.country} {office.zipCode}
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gray-100 mb-8" />

                {/* Contact Info */}
                <div className="flex flex-col gap-4">
                  <a
                    href={`tel:${office.phone}`}
                    className="flex items-center gap-3 text-[#0a1622] text-[14px] font-bold hover:text-[#c5a35d] transition-colors group"
                  >
                    <Phone
                      size={16}
                      className="text-[#c5a35d]"
                      strokeWidth={2}
                    />
                    {office.phone}
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    className="flex items-center gap-3 text-gray-600 text-[14px] font-medium hover:text-[#c5a35d] transition-colors"
                  >
                    <Mail
                      size={16}
                      className="text-[#c5a35d]"
                      strokeWidth={2}
                    />
                    {office.email}
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 italic">
              No office locations listed at this time.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
