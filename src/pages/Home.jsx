import Hero from "../components/Home/Hero";
import StatsBar from "../components/home/StatsBar";
import Framework from "../components/home/Framework";
import FeaturedCompanies from "../components/Home/FeaturedCompanies";
import CapitalDeployment from "../components/Home/CapitalDeployment";
import NewsInsights from "../components/Home/NewsInsights";
import PartnerCTA from "../components/Home/PartnerCTA";

export default function Home() {
  return (
    <div className="bg-kaffa-dark text-white">
      <Hero />
      <StatsBar />
      <Framework />
      <FeaturedCompanies />
      <CapitalDeployment />
      <NewsInsights />
      <PartnerCTA />
      {/* We can add the "News & Insights" and "CTA" sections next */}
    </div>
  );
}
