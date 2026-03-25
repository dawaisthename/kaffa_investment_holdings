import { Building2, Mail, Phone } from "lucide-react";

const offices = [
  {
    city: "Dubai",
    region: "UNITED ARAB EMIRATES",
    address: "Level 15, Tower A, Business Bay",
    cityZip: "Dubai, UAE 00000",
    phone: "+971 4 000 0000",
    email: "dubai@kaffaholding.com",
  },
  {
    city: "Addis Ababa",
    region: "ETHIOPIA",
    address: "Bole Road, Friendship Tower, 8th Floor",
    cityZip: "Addis Ababa, Ethiopia",
    phone: "+251 11 000 0000",
    email: "addis@kaffaholding.com",
  },
  {
    city: "Jakarta",
    region: "INDONESIA",
    address: "Sudirman Central Business District",
    cityZip: "Jakarta, Indonesia 10220",
    phone: "+62 21 000 0000",
    email: "jakarta@kaffaholding.com",
  },
];

export default function OfficeLocations() {
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
          {offices.map((office, i) => (
            <div
              key={i}
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
                  {office.region}
                </span>
                <p className="text-gray-500 text-[15px] leading-relaxed">
                  {office.address} <br />
                  {office.cityZip}
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
                  <Phone size={16} className="text-[#c5a35d]" strokeWidth={2} />
                  {office.phone}
                </a>
                <a
                  href={`mailto:${office.email}`}
                  className="flex items-center gap-3 text-gray-600 text-[14px] font-medium hover:text-[#c5a35d] transition-colors"
                >
                  <Mail size={16} className="text-[#c5a35d]" strokeWidth={2} />
                  {office.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
