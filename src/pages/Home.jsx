import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import SkillBar from "../components/SkillBar";
import ContactForm from "../components/ContactForm";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { fallbackProjects } from "../data/projects";

export default function Home() {
  const [aboutRef, aboutVisible] = useIntersectionObserver();
  const [skillsRef, skillsVisible] = useIntersectionObserver();

  const featured = fallbackProjects.filter((project) => project.featured);

  return (
    <main>
      <Hero />

      <section className="section">
        <div className="container">
          <h2 className="section-title heading-line is-visible">Featured Projects</h2>
          <div className="project-grid">
            {featured.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                techStack={project.tech_stack}
                imageUrl={project.image_url}
                liveUrl={project.live_url}
                detailUrl={`/projects/${project.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section" ref={aboutRef}>
        <div className={`container reveal ${aboutVisible ? "is-visible" : ""}`}>
          <h2 className={`section-title heading-line ${aboutVisible ? "is-visible" : ""}`}>About</h2>
          <p className="muted">
            I am a final-year Computer Science student who enjoys turning messy requirements into clear,
            scalable products with thoughtful UI and robust backend APIs.
          </p>
          <Link className="btn btn-ghost" to="/about" style={{ marginTop: "1rem" }}>
            Read More
          </Link>
        </div>
      </section>

      <section className="section" ref={skillsRef}>
        <div className={`container reveal ${skillsVisible ? "is-visible" : ""}`}>
          <h2 className={`section-title heading-line ${skillsVisible ? "is-visible" : ""}`}>Skills</h2>
          <div className="skills-grid">
            <SkillBar label="Frontend (React)" value={92} />
            <SkillBar label="Backend (Flask/Python)" value={88} delay={120} />
            <SkillBar label="Database (SQLite/SQL)" value={84} delay={240} />
            <SkillBar label="Tools (Git/Postman)" value={86} delay={360} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title heading-line is-visible">My Resume</h2>
          <div className="card" style={{ padding: "1rem" }}>
            <p>resume.pdf</p>
            <a href="http://localhost:5000/api/download-cv" className="btn btn-primary">
              Download PDF
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container">
          <h2 className="section-title heading-line is-visible">Contact</h2>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
