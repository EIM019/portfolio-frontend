import SkillBar from "../components/SkillBar";

export default function About() {
  return (
    <main className="section">
      <div className="container">
        <h1 className="section-title heading-line is-visible">About Me</h1>
        <section className="about-grid">
          <div className="card" style={{ padding: "1rem" }}>
            <div className="project-image-wrap card">
              <img src="https://i.imgur.com/4p6PtyQ.jpg" alt="Mr. Itumeleng Eric Mokgweetsi" className="project-image" />
            </div>
          </div>
          <div className="card" style={{ padding: "1rem" }}>
            <h2>My Story</h2>
            <p className="muted">
              I started out building simple scripts, experimenting and learning how things work behind the scenes. That curiosity became practical when I began solving real problems for classmates, automating tasks, organizing data, and building small systems that made work easier.

              That is what moved me into full-stack development. Instead of only writing isolated code, I focus on complete solutions: the interface people use, the backend logic that supports it, and the data layer that keeps everything reliable. Most of my projects are driven by real needs, like managing workflows, tracking performance, or simplifying everyday processes.

              Along the way, I developed a strong interest in data engineering. Working with systems that handle tasks and records pushed me to think about how data is structured, processed, and scaled. I enjoy designing pipelines, improving storage, and making data useful for decisions rather than leaving it buried in a database.

              This portfolio reflects that journey. It is a progression from simple ideas to more structured, scalable systems. Each project represents a problem solved, a skill improved, and a step toward building efficient, data-driven applications.
            </p>
            <h3>Skills</h3>
            <div className="skills-grid about-skills">
              <SkillBar label="Frontend (React)" value={92} />
              <SkillBar label="Backend (Flask/Python)" value={88} delay={120} />
              <SkillBar label="Database (SQLite/SQL)" value={84} delay={240} />
              <SkillBar label="Tools (Git/Postman)" value={86} delay={360} />
            </div>
            <div className="badge-row">
              {["React", "Flask", "Python", "SQLite", "PostgreSQL", "SQL Server", "Azure", "ETL Pipelines", "Airflow DAG", "Data Warehousing", "PHP", "C#", "ASP.NET Razor"].map((skill) => (
                <span className="chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
            <h3 style={{ marginTop: "1rem" }}>Education & Experience</h3>
            <div className="timeline">
              <div className="timeline-item">
                <h4>BSc (Hons) Applied Business Computing</h4>
                <p className="muted">Final Year — with a focus on software engineering, system design, and distributed systems. My academic work is complemented by hands-on project development, applying theory to real-world applications.</p>
              </div>
              <div className="timeline-item">
                <h4>Freelance Web Developer</h4>
                <p className="muted">Built dashboards and web-based systems for small clients. Translated client requirements into functional applications and delivered solutions focused on usability and efficiency.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
