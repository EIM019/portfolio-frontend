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
          <h1 className="hero-title">Hi, Welcome to My Portfolio</h1>
          <h2 className="hero-subtitle">
            As Sofware Engineer, I build scalable web applications.

            As a Data Engineer, I specialize in designing and optimizing data pipelines 
            that transform raw data into actionable insights. With a strong foundation in Python 
            and SQL, I create efficient ETL processes and maintain robust data infrastructure to support analytics 
            and machine learning initiatives.
            <span className="typing-cursor">|</span>
          </h2>
          <p className="muted">
            Final-year Computer Science student focused on creating performant products that are clean,
            fast, and reliable for real users.
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
            {["React", "Flask", "Python", "SQLite", "PostgreSQL","SQL Server", "Azure", "ETL Pipeline"].map((tech) => (
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
