import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Investment from "./pages/Investment";
import News from "./pages/News";
import Careers from "./pages/Careers";
import JobDetail from "./components/Careers/JobDetail";
import Contact from "./pages/Contact";
import NewsDetail from "./components/News/NewsDetail";
import LegalPage from "./components/LegalPage";
import { legalContent } from "./constants/legalData";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./components/NotFound";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-kaffa-dark flex flex-col">
      <ScrollToTop />

      {!isAdmin && <Header />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:id" element={<JobDetail />} />
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
          <Route path="/admin-portal-kaffa" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
