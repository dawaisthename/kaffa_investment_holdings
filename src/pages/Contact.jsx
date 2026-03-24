import ContactHero from "../components/Contact/ContactHero";
import ContactForm from "../components/Contact/ContactForm";
import OfficeLocations from "../components/Contact/OfficeLocations";
import PageTransition from "../components/PageTransition";
export default function Contact() {
  return (
    <div className="bg-kaffa-dark text-white">
      <PageTransition>
        <ContactHero />
        <ContactForm />
        <OfficeLocations />
      </PageTransition>
    </div>
  );
}
