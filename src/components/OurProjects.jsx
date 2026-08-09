'use client'
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// ─── Scroll Reveal Hook ────────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

import { PROJECTS, CATEGORIES, MARQUEE_ITEMS } from "../constants/projects";

// ─── Marquee Strip ─────────────────────────────────────────────────────────────
function Marquee() {
  return (
    <div style={{
      overflow: "hidden",
      padding: "18px 0",
      borderTop:    "3px solid rgba(255,185,0,0.15)",
      borderBottom: "3px solid rgba(255,185,0,0.15)",
      margin: "48px 0 56px",
    }}>
      <div style={{ display: "flex", animation: "op-marquee 28s linear infinite", whiteSpace: "nowrap" }}>
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} style={{
            padding: "0 28px",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: i % 2 === 0 ? "black" : "#ffb900",
          }}>
            {item}
            <span style={{ margin: "0 16px", color: "#ffb900", fontSize: "0.45rem", verticalAlign: "middle" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const t = useTranslations("ourProjects");
  const [ref, visible] = useScrollReveal(0.08);
  const [hovered, setHovered]   = useState(false);
  const [imgError, setImgError] = useState(false);
  const sizeClass = project.size === "tall" ? "op-size-tall" : "op-size-medium";
  const itemOrder = project.id === 9 ? 5 : project.id === 5 ? 9 : undefined;

  return (
    <Link
      href={`/projects/${project.id}`}
      className={sizeClass}
      style={{ textDecoration: 'none', display: 'block', order: itemOrder }}
    >
      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          cursor: "pointer",
          backgroundColor: "#111",
          border: "1px solid rgba(255,255,255,0.06)",
          minHeight: project.size === "tall" ? "540px" : "280px",
          height: "100%",
          // ── scroll-in animation ──
          opacity:   visible ? 1 : 0,
          transform: visible
            ? "translateY(0) scale(1)"
            : "translateY(60px) scale(0.96)",
          transition: `opacity 0.75s ease ${index * 0.08}s,
                       transform 0.75s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s,
                       box-shadow 0.35s ease`,
          boxShadow: hovered
            ? "0 30px 80px rgba(255,185,0,0.18), 0 0 0 1px rgba(255,185,0,0.2)"
            : "0 4px 30px rgba(0,0,0,0.5)",
        }}
      >
        {/* ── Background image or gradient fallback ── */}
      <div style={{
        position: "absolute", inset: 0,
        transition: "transform 0.65s cubic-bezier(0.22,1,0.36,1)",
        transform: hovered ? "scale(1.06)" : "scale(1)",
      }}>
        {imgError ? (
          <div style={{ width: "100%", height: "100%", background: project.gradient }} />
        ) : (
          <Image
            src={project.image}
            alt={t(project.titleKey) || "Project Image"}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            onError={() => setImgError(true)}
            priority={index < 4}
            quality={85}
          />
        )}
      </div>

      {/* ── Overlay gradient ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered
          ? "linear-gradient(0deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.15) 100%)"
          : "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 100%)",
        transition: "background 0.45s ease",
      }} />

      {/* ── Top row: category pill + year ── */}
      <div style={{
        position: "absolute", top: "20px", left: "20px", right: "20px",
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        zIndex: 2,
      }}>
        <span style={{
          padding: "5px 14px",
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,185,0,0.3)",
          borderRadius: "30px",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#ffb900",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {t(project.tagKey)}
        </span>
        <span style={{
          padding: "5px 12px",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(12px)",
          borderRadius: "30px",
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.4)",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {project.year}
        </span>
      </div>

      {/* ── Big index number ── */}
      <div style={{
        position: "absolute",
        bottom: hovered ? "auto" : "20px",
        top: hovered ? "auto" : "auto",
        right: "22px",
        bottom: "20px",
        fontSize: project.size === "tall" ? "7rem" : "5rem",
        fontWeight: 800,
        color: "rgba(255,185,0,0.06)",
        fontFamily: "'Syne', sans-serif",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        opacity: hovered ? 0 : 1,
        transition: "opacity 0.3s ease",
        zIndex: 1,
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* ── Bottom content ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "28px 28px 30px",
        zIndex: 3,
      }}>
        {/* Result badge — slides up on hover */}
        <div style={{
          marginBottom: "14px",
          transform: hovered ? "translateY(0)" : "translateY(10px)",
          opacity: hovered ? 1 : 0,
          transition: "all 0.35s cubic-bezier(0.22,1,0.36,1) 0.05s",
        }}>
          <span style={{
            display: "inline-block",
            padding: "5px 14px",
            background: "#ffb900",
            borderRadius: "30px",
            fontSize: "0.72rem",
            fontWeight: 800,
            color: "#000",
            letterSpacing: "0.06em",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {t(project.resultKey)}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: project.size === "tall" ? "1.65rem" : "1.2rem",
          fontWeight: 800,
          color: "#ffffff",
          margin: "0 0 10px",
          lineHeight: 1.15,
          fontFamily: "'Syne', sans-serif",
          letterSpacing: "-0.01em",
        }}>
          {t(project.titleKey)}
        </h3>

        {/* Description — slides up on hover */}
        <p style={{
          fontSize: "0.84rem",
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.65,
          margin: "0 0 22px",
          maxWidth: "480px",
          transform: hovered ? "translateY(0)" : "translateY(14px)",
          opacity: hovered ? 1 : 0,
          transition: "all 0.4s cubic-bezier(0.22,1,0.36,1) 0.08s",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {t(project.descKey)}
        </p>

        {/* CTA row — slides up on hover */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          transform: hovered ? "translateX(0)" : "translateX(-10px)",
          opacity: hovered ? 1 : 0,
          transition: "all 0.35s cubic-bezier(0.22,1,0.36,1) 0.12s",
        }}>
          <span style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#ffb900",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            View Project
          </span>
          <div style={{
            width: "32px", height: "32px",
            background: "#ffb900",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.85rem",
            color: "#000",
            fontWeight: 700,
            transition: "transform 0.2s ease",
            transform: hovered ? "translateX(4px)" : "translateX(0)",
          }}>
            →
          </div>
        </div>
      </div>

      {/* ── Corner accent line ── */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0,
        width: hovered ? "100%" : "0%",
        height: "2px",
        background: "linear-gradient(90deg, #ffb900, transparent)",
        transition: "width 0.5s cubic-bezier(0.22,1,0.36,1)",
        zIndex: 4,
      }} />
      </div>
    </Link>
  );
}

// ─── Stats Strip ───────────────────────────────────────────────────────────────
function StatsStrip() {
  const [ref, visible] = useScrollReveal(0.2);
  const stats = [
    { value: "100+", label: "Projects Delivered" },
    { value: "98%",  label: "Client Satisfaction" },
    { value: "30+",  label: "Happy Brands"        },
    { value: "4+",   label: "Years of Excellence" },
  ];
  return (
    <div ref={ref} style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "1px",
      background: "rgba(255,185,0,0.12)",
      borderRadius: "16px",
      overflow: "hidden",
      margin: "72px 0 0",
      border: "1px solid rgba(255,185,0,0.15)",
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          flex: "1 1 180px",
          padding: "32px 28px",
          background: "#0a0a0a",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s`,
        }}>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "2.4rem",
            fontWeight: 800,
            color: "#ffb900",
            lineHeight: 1,
            marginBottom: "8px",
          }}>
            {s.value}
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function OurProjects() {
  const t = useTranslations("ourProjects");
  const tCat = useTranslations("ourProjects");
  const [activeCategory, setActiveCategory] = useState("all");
  const [headerRef, headerVisible] = useScrollReveal(0.15);

  const filtered = activeCategory === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* ── Google Fonts + Keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

        @keyframes op-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }

        @keyframes op-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        @keyframes op-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        .op-filter-btn:hover {
          border-color: rgba(255,185,0,0.4) !important;
          color: rgba(255,255,255,0.8) !important;
          background: rgba(255,185,0,0.08) !important;
        }

        .op-cta-btn:hover {
          background: #fff !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 20px 50px rgba(255,185,0,0.3) !important;
        }

        /* Desktop Grid */
        .op-grid {
          grid-template-columns: repeat(3, 1fr) !important;
          grid-auto-flow: dense;
        }
        .op-size-tall {
          grid-column: span 1;
          grid-row: span 2;
        }
        .op-size-medium {
          grid-column: span 1;
          grid-row: span 1;
        }

        /* Tablet Grid */
        @media (min-width: 769px) and (max-width: 1100px) {
          .op-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* Mobile Grid */
        @media (max-width: 768px) {
          .op-grid { grid-template-columns: 1fr !important; }
          .op-size-tall, .op-size-medium {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
            min-height: 300px !important;
          }
        }
      `}</style>

      <section id="projects" style={{
        padding: "110px 28px 80px",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>

          {/* ══ SECTION HEADER ══════════════════════════════════════════ */}
          <div ref={headerRef} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
            <div style={{ maxWidth: "700px" }}>
              {/* Label */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                marginBottom: "24px",
                opacity: headerVisible ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}>
                <span style={{
                  width: "6px", height: "6px",
                  background: "#ffb900", borderRadius: "50%",
                  animation: "op-blink 2s ease-in-out infinite",
                  display: "inline-block",
                }} />
                <span style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#ffb900",
                }}>
                  Our Projects
                </span>
              </div>

              {/* Headline — word-by-word reveal */}
              <h2 style={{ margin: 0, lineHeight: 1.0, fontFamily: "'Syne', sans-serif"  }}>
                {["Work", "That", "Speaks"].map((word, i) => (
                  <span key={i} style={{
                    display: "inline-block",
                    marginRight: "0.28em",
                    fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
                    fontWeight: 800,
                    color: word === "Speaks" ? "#ffb900" : "#000000",
                    opacity:   headerVisible ? 1 : 0,
                    transform: headerVisible ? "translateY(0)" : "translateY(50px)",
                    transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.12}s,
                                 transform 0.65s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.12}s`,
                  }}>
                    {word}
                  </span>
                ))}
                <br />
                {["Louder", "Than", "Words."].map((word, i) => (
                  <span key={i} style={{
                    display: "inline-block",
                    marginRight: "0.28em",
                    fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
                    fontWeight: 800,
                    color:'#000000',
                    opacity:   headerVisible ? 1 : 0,
                    transform: headerVisible ? "translateY(0)" : "translateY(50px)",
                    transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${0.46 + i * 0.12}s,
                                 transform 0.65s cubic-bezier(0.22,1,0.36,1) ${0.46 + i * 0.12}s`,
                  }}>
                    {word}
                  </span>
                ))}
              </h2>

              {/* Sub */}
              <p style={{
                marginTop: "20px",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.38)",
                lineHeight: 1.75,
                maxWidth: "480px",
                opacity: headerVisible ? 1 : 0,
                transition: "opacity 0.7s ease 0.72s",
              }}>
                Real results, real brands. Every project is a story of growth we built together.
              </p>
            </div>

            {/* View all link */}
            <Link
              href="/projects"
              className="op-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 32px",
                background: "#ffb900",
                color: "#000",
                borderRadius: "50px",
                fontWeight: 700,
                fontSize: "0.82rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.3s ease",
                flexShrink: 0,
                opacity: headerVisible ? 1 : 0,
                transform: headerVisible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s,
                             background 0.3s ease, box-shadow 0.3s ease`,
              }}
            >
              View All
              <span style={{
                width: "26px", height: "26px",
                background: "rgba(0,0,0,0.15)",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.85rem",
              }}>→</span>
            </Link>
          </div>

          {/* ══ MARQUEE ══════════════════════════════════════════════════ */}
          <Marquee />

          {/* ══ CATEGORY FILTER ══════════════════════════════════════════ */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "52px",
          }}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  className="op-filter-btn"
                  onClick={() => setActiveCategory(cat.key)}
                  style={{
                    padding: "9px 22px",
                    borderRadius: "30px",
                    border: isActive
                      ? "1px solid #ffb900"
                      : "1px solid rgba(0,0,0,0.15)",
                    background: isActive
                      ? "rgba(255,185,0,0.1)"
                      : "rgba(0,0,0,0.02)",
                    color: isActive ? "#ffb900" : "rgba(0,0,0,0.6)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  {isActive && (
                    <span style={{ marginRight: "6px", fontSize: "0.5rem", verticalAlign: "middle" }}>◆</span>
                  )}
                  {t(cat.labelKey)}
                </button>
              );
            })}
          </div>

          {/* ══ BENTO GRID ═══════════════════════════════════════════════ */}
          <div
            className="op-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridAutoRows: "270px",
              gap: "18px",
            }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}

            {filtered.length === 0 && (
              <div style={{
                gridColumn: "span 3",
                textAlign: "center",
                padding: "80px 0",
                color: "rgba(255,255,255,0.2)",
                fontFamily: "'Syne', sans-serif",
                fontSize: "1.2rem",
              }}>
                No projects in this category yet.
              </div>
            )}
          </div>

          {/* ══ STATS STRIP ═══════════════════════════════════════════════ */}
          <StatsStrip />

        </div>
      </section>
    </>
  );
}