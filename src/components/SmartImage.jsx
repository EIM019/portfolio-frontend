import { useEffect, useRef, useState } from "react";

export default function SmartImage({ src, alt, className = "", fallbackTitle, fallbackText, variant = "project" }) {
  const [failed, setFailed] = useState(!src);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setFailed(!src);
    window.clearTimeout(timeoutRef.current);

    if (src) {
      timeoutRef.current = window.setTimeout(() => setFailed(true), 3000);
    }

    return () => window.clearTimeout(timeoutRef.current);
  }, [src]);

  return (
    <>
      {!failed && (
        <img
          src={src}
          alt={alt}
          className={className}
          loading="lazy"
          onLoad={() => window.clearTimeout(timeoutRef.current)}
          onError={() => {
            window.clearTimeout(timeoutRef.current);
            setFailed(true);
          }}
        />
      )}
      {failed && (
        <div className={`image-fallback ${variant}`} role="img" aria-label={alt}>
          <span>{fallbackTitle || alt}</span>
          {fallbackText && <small>{fallbackText}</small>}
        </div>
      )}
    </>
  );
}
