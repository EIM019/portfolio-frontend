import { Link } from "react-router-dom";

export default function ProjectCard({ title, description, techStack, imageUrl, liveUrl, detailUrl }) {
  return (
    <article className="project-card card">
      <div className="project-image-wrap">
        <img src={imageUrl} alt={title} className="project-image" />
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p className="muted">{description}</p>
        <div className="badge-row">
          {techStack.map((tech, index) => (
            <span className="chip project-badge" style={{ transitionDelay: `${index * 80}ms` }} key={tech}>
              {tech}
            </span>
          ))}
        </div>
        <div className="project-actions">
          <a className="btn btn-primary live-btn" href={liveUrl} target="_blank" rel="noreferrer">
            <span className="arrow">→</span> Live Demo
          </a>
          <Link className="btn btn-ghost" to={detailUrl}>
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
