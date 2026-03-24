import InvestmentHero from "../components/Investment/InvestmentHero";
import FocusAreas from "../components/Investment/FocusArea";
import PartnershipModels from "../components/Investment/PartnershipModels";
import InvestmentCriteria from "../components/Investment/InvestmentCriteria";
import InvestmentForm from "../components/Investment/InvestmentForm";
import PageTransition from "../components/PageTransition";
export default function Investment() {
  return (
    <div className="bg-kaffa-dark text-white">
      <PageTransition>
        <InvestmentHero />
        <FocusAreas />
        <PartnershipModels />
        <InvestmentCriteria />
        <InvestmentForm />
      </PageTransition>
    </div>
  );
}
