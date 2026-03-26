"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// ─── Configuration ────────────────────────────────────────────────────────────
const SITE_NAME = "Pixel Media";
const ACCENT    = "#ffb900";   // your yellow brand color
const BG        = "#f5f5f5";   // ← match your site's background color
const TEXT      = "#111111";   // title color
const SUBTEXT   = "#888888";   // "Loading assets..." color
const RING_TRACK = "rgba(0,0,0,0.08)"; // faint track behind the ring

// ─── Styles ───────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap');

  .page-loader {
    position: fixed;
    inset: 0;
    background: ${BG};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    z-index: 9999;
    pointer-events: all;
    transition: opacity 0.35s ease, visibility 0.35s ease;
  }
  .page-loader.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .page-loader__title {
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    color: ${TEXT};
    letter-spacing: 0em;
    margin: 0;
  }

  .page-loader__ring {
    position: relative;
    width: 80px;
    height: 80px;
  }
  .page-loader__ring svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  .page-loader__ring-track {
    fill: none;
    stroke: ${RING_TRACK};
    stroke-width: 4;
  }
  .page-loader__ring-fill {
    fill: none;
    stroke-width: 4;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.12s ease;
  }
  .page-loader__pct {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 0.85rem;
    color: ${TEXT};
  }

  .page-loader__label {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 0.82rem;
    color: ${SUBTEXT};
    letter-spacing: 0.04em;
    margin: 0;
  }

  .page-loader__dots {
    display: flex;
    gap: 5px;
  }
  .page-loader__dots span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    animation: loaderBounce 0.9s ease-in-out infinite;
  }
  .page-loader__dots span:nth-child(2) { animation-delay: 0.15s; }
  .page-loader__dots span:nth-child(3) { animation-delay: 0.30s; }

  @keyframes loaderBounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.35; }
    40%           { transform: scale(1.1); opacity: 1; }
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function PageLoader() {
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [pct, setPct]         = useState(0);
  const rafRef   = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById("page-loader-css")) {
      const tag = document.createElement("style");
      tag.id = "page-loader-css";
      tag.textContent = CSS;
      document.head.appendChild(tag);
    }
  }, []);

  useEffect(() => {
    setVisible(true);
    setPct(0);

    const duration = 700;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setPct(Math.round(progress * 100));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        timerRef.current = setTimeout(() => setVisible(false), 200);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
    };
  }, [pathname, searchParams]);

  const R   = 34;
  const C   = 2 * Math.PI * R;
  const off = C - (pct / 100) * C;

  return (
    <div className={`page-loader${visible ? "" : " hidden"}`}>
      <h1 className="page-loader__title">{SITE_NAME}</h1>

      <div className="page-loader__ring">
        <svg viewBox="0 0 80 80">
          <circle className="page-loader__ring-track" cx="40" cy="40" r={R} />
          <circle
            className="page-loader__ring-fill"
            cx="40"
            cy="40"
            r={R}
            strokeDasharray={C}
            strokeDashoffset={off}
            style={{ stroke: ACCENT }}
          />
        </svg>
        <div className="page-loader__pct">{pct}%</div>
      </div>

      <p className="page-loader__label">Loading assets...</p>

      <div className="page-loader__dots">
        <span style={{ background: ACCENT }} />
        <span style={{ background: ACCENT }} />
        <span style={{ background: ACCENT }} />
      </div>
    </div>
  );
}