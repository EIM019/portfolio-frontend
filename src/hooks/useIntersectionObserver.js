import { useEffect, useRef, useState } from "react";

export default function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.once !== false) observer.unobserve(entry.target);
        } else if (options.once === false) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold ?? 0.2,
        rootMargin: options.rootMargin ?? "0px"
      }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.once, options.rootMargin, options.threshold]);

  return [ref, isVisible];
}
