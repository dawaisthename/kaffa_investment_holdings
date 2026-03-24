import InvestmentHero from "../components/Investment/InvestmentHero";
import FocusAreas from "../components/Investment/FocusArea";
import PartnershipModels from "../components/Investment/PartnershipModels";
import InvestmentCriteria from "../components/Investment/InvestmentCriteria";
import InvestmentForm from "../components/Investment/InvestmentForm";
export default function Investment() {
  return (
    <div className="bg-kaffa-dark text-white">
      <InvestmentHero />
      <FocusAreas />
      <PartnershipModels />
      <InvestmentCriteria />
      <InvestmentForm />
    </div>
  );
}
