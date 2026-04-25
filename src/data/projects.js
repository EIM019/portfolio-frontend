import { useEffect, useState } from "react";
import { fallbackProjects } from "./fallbackProjects";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://portfolio-backend-72pr.onrender.com/api/projects")
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch(() => {
        setProjects(fallbackProjects);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div>
      {projects.map(p => (
        <div key={p.id}>
          <img src={p.image_url} alt={p.title} style={{ width: '100%', maxWidth: '300px' }} />
          <h2>{p.title}</h2>
          <p>{p.description}</p>
          <p><strong>Tech Stack:</strong> {p.tech_stack.join(', ')}</p>
          <a href={p.live_url} target="_blank" rel="noopener noreferrer">View Project</a>
        </div>
      ))}
    </div>
  );
}