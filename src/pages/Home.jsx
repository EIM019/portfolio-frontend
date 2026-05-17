import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import AppRequirementsChat from "../components/AppRequirementsChat";
import ContactForm from "../components/ContactForm";
import { fallbackProjects, mergeProjects } from "../data/projects";


const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Home() {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    fetch(`${API_BASE}/api/projects`)
      .then((r) => r.json())
      .then((data) => {
        setProjects(mergeProjects(data.projects || []));
      })
      .catch(() => setProjects(fallbackProjects));
  }, []);

  const featured = projects.filter((p) => p.featured);

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

      <section className="section">
        <div className="container">
          <AppRequirementsChat projects={projects} />
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
