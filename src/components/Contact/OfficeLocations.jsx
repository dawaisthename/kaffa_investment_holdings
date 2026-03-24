import { Mail, Phone, MapPin } from "lucide-react";
const offices = [
  {
    city: "Dubai",
    region: "United Arab Emirates",
    address: "Level 15, Tower A, Business Bay\nDubai, UAE 00000",
    phone: "+971 4 000 0000",
    email: "dubai@kaffaholding.com",
  },
  {
    city: "Addis Ababa",
    region: "Ethiopia",
    address: "Bole Road, Friendship Tower, 8th Floor\nAddis Ababa, Ethiopia",
    phone: "+251 11 000 0000",
    email: "addis@kaffaholding.com",
  },
  {
    city: "Jakarta",
    region: "Indonesia",
    address: "Sudirman Central Business District\nJakarta, Indonesia 10220",
    phone: "+62 21 000 0000",
    email: "jakarta@kaffaholding.com",
  },
];

export default function OfficeLocations() {
  return (
    <section className="bg-[#f8f9fa] py-28 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-4 block">
            Our Offices
          </span>
          <h2 className="text-[42px] font-serif text-[#0a1622] font-bold">
            Where to find us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offices.map((office, i) => (
            <div
              key={i}
              className="bg-white p-10 rounded-xl border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-[#f8f9fa] flex items-center justify-center text-[#c5a35d]">
                  <MapPin size={20} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#0a1622]">
                  {office.city}
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-300 block mb-2">
                    {office.region}
                  </span>
                  <p className="text-gray-500 text-[14px] leading-relaxed whitespace-pre-line">
                    {office.address}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-50 flex flex-col gap-3">
                  <a
                    href={`tel:${office.phone}`}
                    className="text-[#0a1622] text-[13px] font-bold hover:text-[#c5a35d] transition-colors"
                  >
                    {office.phone}
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    className="text-[#0a1622] text-[13px] font-bold hover:text-[#c5a35d] transition-colors"
                  >
                    {office.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
