import NewsHero from "../components/News/NewsHero";
import NewsMain from "../components/News/NewsMain";
import PageTransition from "../components/PageTransition";
export default function News() {
  return (
    <div className="bg-kaffa-dark text-white">
      <PageTransition>
        <NewsHero />
        <NewsMain />
      </PageTransition>
    </div>
  );
}
