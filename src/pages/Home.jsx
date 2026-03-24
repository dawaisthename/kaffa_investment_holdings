import Hero from "../components/Home/Hero";
import StatsBar from "../components/Home/StatsBar";
import Framework from "../components/Home/Framework";
import FeaturedCompanies from "../components/Home/FeaturedCompanies";
import CapitalDeployment from "../components/Home/CapitalDeployment";
import NewsInsights from "../components/Home/NewsInsights";
import PartnerCTA from "../components/Home/PartnerCTA";
import PageTransition from "../components/PageTransition";

export default function Home() {
  return (
    <div className="bg-kaffa-dark text-white">
      <PageTransition>
        <Hero />
        <StatsBar />
        <Framework />
        <FeaturedCompanies />
        <CapitalDeployment />
        <NewsInsights />
        <PartnerCTA />
      </PageTransition>
      {/* We can add the "News & Insights" and "CTA" sections next */}
    </div>
  );
}
