import AboutHero from "../components/About/AboutHero";
import MissionValues from "../components/About/OurValues";
import Leadership from "../components/About/Leadership";
import OurStory from "../components/About/OurStory";
import Governance from "../components/About/Governance";
import Journey from "../components/About/Journey";
import PageTransition from "../components/PageTransition";
export default function About() {
  return (
    <div className="bg-kaffa-dark text-white">
      <PageTransition>
        <AboutHero />
        <OurStory />
        <MissionValues />
        <Leadership />
        <Governance />
        <Journey />
      </PageTransition>
    </div>
  );
}
