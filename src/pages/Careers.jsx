import CareersHero from "../components/Careers/CareersHero";
import CareersCulture from "../components/Careers/CareersCulture";
import OpenPositions from "../components/Careers/OpenPositions";
import SubmitApplication from "../components/Careers/SubmitApplication";
import PageTransition from "../components/PageTransition";
export default function Careers() {
  return (
    <div className="bg-kaffa-dark text-white">
      <PageTransition>
        <CareersHero />
        <CareersCulture />
        <OpenPositions />
        <SubmitApplication />
      </PageTransition>
    </div>
  );
}
