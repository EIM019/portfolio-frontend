import { Link } from "react-router-dom";
import SmartImage from "./SmartImage";

export default function ProjectCard({ title, description, techStack, imageUrl, liveUrl, githubUrl, detailUrl }) {
  return (
    <article className="project-card card">
      <div className="project-image-wrap">
        <SmartImage
          src={imageUrl}
          alt={title}
          className="project-image"
          fallbackTitle={title}
          fallbackText={(techStack || []).slice(0, 3).join(" / ")}
        />
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
          {liveUrl && (
            <a className="btn btn-primary live-btn" href={liveUrl} target="_blank" rel="noreferrer">
              <span className="arrow">-&gt;</span> Live Demo
            </a>
          )}
          {!liveUrl && githubUrl && (
            <a className="btn btn-primary live-btn" href={githubUrl} target="_blank" rel="noreferrer">
              <span className="arrow">-&gt;</span> Source Code
            </a>
          )}
          <Link className="btn btn-ghost" to={detailUrl}>
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
