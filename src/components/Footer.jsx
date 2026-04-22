import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="logo">{"<studentdev />"}</p>
          <p className="muted">Building polished products with React and Flask.</p>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} E.I.M</span>
          <span>Built with React &amp; Flask</span>
        </div>
      </div>
    </footer>
  );
}
