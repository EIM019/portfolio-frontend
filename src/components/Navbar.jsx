import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container navbar-inner">
        <Link className="logo" to="/">
          {"<studentdev />"}
        </Link>
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav-link">
              {item.label}
            </NavLink>
          ))}
          <a className="btn btn-ghost" href="http://localhost:5000/api/download-cv">
            Download CV
          </a>
        </nav>
        <button className="mobile-trigger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span />
          <span />
          <span />
        </button>
      </div>
      <aside className={`mobile-drawer ${open ? "is-open" : ""}`}>
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className="nav-link" onClick={() => setOpen(false)}>
            {item.label}
          </NavLink>
        ))}
        <a className="btn btn-ghost" href="http://localhost:5000/api/download-cv">
          Download CV
        </a>
      </aside>
    </header>
  );
}
