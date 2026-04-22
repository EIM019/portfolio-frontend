export default function About() {
  return (
    <main className="section">
      <div className="container">
        <h1 className="section-title heading-line is-visible">About Me</h1>
        <section className="about-grid">
          <div className="card" style={{ padding: "1rem" }}>
            <div className="project-image-wrap card">
              <img src="https://picsum.photos/seed/profile/800/800" alt="Profile" className="project-image" />
            </div>
          </div>
          <div className="card" style={{ padding: "1rem" }}>
            <h2>My Story</h2>
            <p className="muted">
              I started out building simple scripts, mostly experimenting and trying to understand how things work behind the scenes. What began as curiosity quickly turned into something more practical when I started solving real problems for classmates, automating tasks, organizing data, and building small systems that actually made life easier.

              That’s when I moved into full-stack development. Instead of just writing code, I focused on building complete solutions from the interface users interact with, down to the logic and data handling behind it. Most of my projects are driven by real-world needs, like managing workflows, tracking performance, or simplifying everyday processes.

              Along the way, I’ve also developed a strong interest in data engineering. Working with systems that handle tasks and records naturally pushed me toward thinking about how data is structured, processed, and scaled. I’ve started exploring how to design data pipelines, optimize storage, and make data more useful for decision-making not just for display.

              This portfolio is a reflection of that journey. It’s not just a collection of projects, but a progression—from simple ideas to more structured, scalable systems. Each project represents a problem solved, a skill improved, and a step closer to building efficient, data-driven applications.
            </p>
            <h3>Skills</h3>
            <div className="badge-row">
              {["React", "Flask", "Python", "SQLite", "PostgreSQL","SQL Server", "Azure", "ETL Pipeline", "Airflow DAG", "Data Warehousing", "PHP", "C#, ASP.NET Razor"].map((skill) => (
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
                <p className="muted">•	Built dashboards and web-based systems for small clients
                                      •	Translated client requirements into functional applications
                                      •	Delivered solutions focused on usability and efficiency
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
