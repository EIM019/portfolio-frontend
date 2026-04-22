import useIntersectionObserver from "../hooks/useIntersectionObserver";

export default function SkillBar({ label, value, delay = 0 }) {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div ref={ref} className="skill-row">
      <div className="skill-meta">
        <span>{label}</span>
        <span className="muted">{value}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{
            width: isVisible ? `${value}%` : "0%",
            transitionDelay: `${delay}ms`
          }}
        />
      </div>
    </div>
  );
}
