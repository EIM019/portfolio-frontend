import { useEffect, useRef, useState } from "react";

const localImageMap = {
  "https://i.imgur.com/4p6PtyQ.jpg": "/images/profile.jpg",
  "https://imgur.com/4p6PtyQ": "/images/profile.jpg",
  "https://i.imgur.com/8jQtaD1.jpg": "/images/xbankz.png",
  "https://i.imgur.com/8jQtaD1.png": "/images/xbankz.png",
  "https://i.imgur.com/BAyoiUj.jpg": "/images/xbankz-shot-1.png",
  "https://i.imgur.com/BAyoiUj.png": "/images/xbankz-shot-1.png",
  "https://i.imgur.com/1vBtW99.jpg": "/images/xbankz-shot-2.png",
  "https://i.imgur.com/1vBtW99.png": "/images/xbankz-shot-2.png"
};

export default function SmartImage({ src, alt, className = "", fallbackTitle, fallbackText, variant = "project" }) {
  const imageSrc = localImageMap[src] || src;
  const [failed, setFailed] = useState(!src);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setFailed(!imageSrc);
    window.clearTimeout(timeoutRef.current);

    if (imageSrc) {
      timeoutRef.current = window.setTimeout(() => setFailed(true), 3000);
    }

    return () => window.clearTimeout(timeoutRef.current);
  }, [imageSrc]);

  return (
    <>
      {!failed && (
        <img
          src={imageSrc}
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
