import { Link } from "react-router-dom";
import CodeSnippetCard from "./CodeSnippetCard";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

export default function Hero() {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <section className="section hero" ref={ref}>
      <div className={`container hero-grid reveal ${isVisible ? "is-visible" : ""}`}>
        <div>
          <div className="availability-badge">
            <span className="status-dot" />
            Available for opportunities
          </div>
          <h1 className="hero-title">Mr. Itumeleng Eric Mokgweetsi</h1>
          <h2 className="hero-subtitle">
            Software & Data Engineer building scalable web applications, clean backend APIs,
            and data pipelines that turn raw information into useful insight.
            <span className="typing-cursor">|</span>
          </h2>
          <p className="muted">
            Final-year Computer Science student focused on practical products that are reliable,
            maintainable, and built around real user needs.
          </p>
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">
              View My Work
            </Link>
            <a href="#contact" className="btn btn-ghost">
              Get In Touch
            </a>
          </div>
          <div className="hero-chips">
            {["React", "Flask", "Python", "SQL", "PostgreSQL", "SQL Server", "Azure", "ETL Pipelines"].map((tech) => (
              <span className="chip" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="floating-card">
          <CodeSnippetCard />
        </div>
      </div>
    </section>
  );
}
