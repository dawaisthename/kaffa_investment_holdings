import CareersHero from "../components/Careers/CareersHero";
import CareersCulture from "../components/Careers/CareersCulture";
import OpenPositions from "../components/Careers/OpenPositions";
import SubmitApplication from "../components/Careers/SubmitApplication";
export default function Careers() {
  return (
    <div className="bg-kaffa-dark text-white">
      <CareersHero />
      <CareersCulture />
      <OpenPositions />
      <SubmitApplication />
    </div>
  );
}
