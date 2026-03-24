import ContactHero from "../components/Contact/ContactHero";
import ContactForm from "../components/Contact/ContactForm";
import OfficeLocations from "../components/Contact/OfficeLocations";
export default function Contact() {
  return (
    <div className="bg-kaffa-dark text-white">
      <ContactHero />
      <ContactForm />
      <OfficeLocations />
    </div>
  );
}
