import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";

const titleMap = {
  "/": "Home | Developer Portfolio",
  "/projects": "Projects | Developer Portfolio",
  "/about": "About | Developer Portfolio"
};

function ScrollToTopButton() {
  useEffect(() => {
    const button = document.getElementById("scroll-top");
    const onScroll = () => {
      if (!button) return;
      button.style.opacity = window.scrollY > 400 ? "1" : "0";
      button.style.pointerEvents = window.scrollY > 400 ? "auto" : "none";
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      id="scroll-top"
      type="button"
      className="btn btn-primary"
      style={{
        position: "fixed",
        right: "1rem",
        bottom: "1rem",
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        opacity: 0,
        pointerEvents: "none",
        zIndex: 1000
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      ^
    </button>
  );
}

function NotFoundPage() {
  return (
    <main className="section">
      <div className="container" style={{ textAlign: "center", paddingTop: "6rem" }}>
        <h1 className="section-title heading-line is-visible">404</h1>
        <p className="muted">The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Back Home
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const isProjectDetail = location.pathname.startsWith("/projects/");
    document.title = isProjectDetail
      ? "Project Details | Developer Portfolio"
      : titleMap[location.pathname] || "404 | Developer Portfolio";
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
