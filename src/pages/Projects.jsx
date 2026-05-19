import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { fallbackProjects } from "../data/projects";

const tabs = ["All", "Web Apps", "School Projects", "Client Work"];

export default function Projects() {
  const [active, setActive] = useState("All");
  const projects = fallbackProjects;

  const filtered = projects.filter((project) => active === "All" || project.category === active);

  return (
    <main className="section">
      <div className="container">
        <h1 className="section-title heading-line is-visible">Projects</h1>
        <div className="badge-row" style={{ marginBottom: "1rem" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`btn ${active === tab ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setActive(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div key={active} className="project-grid reveal is-visible">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              techStack={project.tech_stack}
              imageUrl={project.image_url}
              liveUrl={project.live_url}
              githubUrl={project.github_url}
              detailUrl={`/projects/${project.id}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
