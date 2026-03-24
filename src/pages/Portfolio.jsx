// Example for Portfolio.jsx (Repeat for About, Portfolio, etc.)
import PortfolioHero from "../components/Portfolio/PortfolioHero";
import CompanyGrid from "../components/Portfolio/PortfolioSection";

export default function Portfolio() {
  return (
    <div className="bg-kaffa-dark text-white">
      <PortfolioHero />
      <CompanyGrid />
   
    </div>
  );
}
