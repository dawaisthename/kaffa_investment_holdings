import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"; // Assume standard footer markup
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Investment from "./pages/Investment";
import News from "./pages/News";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import NewsDetail from "./components/News/NewsDetail";
import LegalPage from "./components/LegalPage";
import { legalContent } from "./constants/legalData";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-kaffa-dark flex flex-col">
        <ScrollToTop />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/privacy"
              element={<LegalPage data={legalContent.privacy} />}
            />
            <Route
              path="/terms"
              element={<LegalPage data={legalContent.terms} />}
            />
            <Route
              path="/cookies"
              element={<LegalPage data={legalContent.cookies} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
