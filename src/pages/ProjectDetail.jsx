import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fallbackProjects } from "../data/projects";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/projects/${id}`)
      .then((response) => response.json())
      .then((data) => setProject(data.project))
      .catch(() => setProject(fallbackProjects.find((item) => String(item.id) === String(id))))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="section">
        <div className="container">Loading project...</div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="section">
        <div className="container">Project not found.</div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <div className="project-image-wrap card">
          <img src={project.image_url} alt={project.title} className="project-image" />
        </div>
        <h1 className="section-title heading-line is-visible" style={{ marginTop: "1rem" }}>
          {project.title}
        </h1>
        <div className="badge-row" style={{ marginBottom: "1rem" }}>
          {(project.tech_stack || []).map((tech) => (
            <span className="chip" key={tech}>
              {tech}
            </span>
          ))}
        </div>
        <section className="card" style={{ padding: "1rem", marginBottom: "1rem" }}>
          <h3>Problem Statement</h3>
          <p className="muted">{project.problem}</p>
          <h3>Solution</h3>
          <p className="muted">{project.solution}</p>
          <h3>Key Features</h3>
          <ul>
            {(project.features || []).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <h3>Screenshots</h3>
          <div className="project-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
            <div className="project-image-wrap card">
              <img src={`https://i.imgur.com/BAyoiUj.jpg`} alt="Screenshot one" />
            </div>
            <div className="project-image-wrap card">
              <img src={`https://i.imgur.com/1vBtW99.jpg`} alt="Screenshot two" />
            </div>
          </div>
        </section>
        <div className="project-actions">
          <a href={project.live_url} className="btn btn-primary" target="_blank" rel="noreferrer">
            View Live
          </a>
          <Link to="/projects" className="btn btn-ghost">
            Back to Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
