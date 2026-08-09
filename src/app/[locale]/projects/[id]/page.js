"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PROJECTS } from "@/constants/projects";

// The params are accessible via props in Next.js page components
export default function ProjectDetail({ params }) {
  const t = useTranslations("ourProjects");
  const [projectId, setProjectId] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    // Unwrap params Promise if it's async in Next.js 15+
    // In many Next versions it's sync, but doing it safely
    Promise.resolve(params).then((resolvedParams) => {
      setProjectId(resolvedParams.id);
    });
  }, [params]);

  if (!projectId) return null;

  const project = PROJECTS.find((p) => p.id === parseInt(projectId));

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb", color: "#111" }}>
        <div style={{ textAlign: "center" }}>
          <h2>{t("details.projectNotFound")}</h2>
          <Link href="/#projects" style={{ color: "#ffb900", textDecoration: "none", marginTop: "20px", display: "inline-block", fontWeight: "600" }}>
            ← {t("details.backToProjects")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "transparent",
      color: "#111827",
      fontFamily: "'DM Sans', sans-serif",
      paddingTop: "120px",
      paddingBottom: "100px"
    }}>
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        
        .pd-back-btn:hover {
          color: #ffb900 !important;
          transform: translateX(-5px);
        }
        .pd-image-card {
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          border: 1px solid rgba(0,0,0,0.08);
        }
        .pd-image-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,185,0,0.3);
        }
        .pd-grid {
          display: grid;
          gap: 24px;
        }
        @media (min-width: 768px) {
          .pd-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .pd-grid { grid-template-columns: repeat(3, 1fr); }
        }
        
        /* Lightbox Styles */
        .lightbox-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0, 0, 0, 0.9);
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .lightbox-overlay.active {
          opacity: 1;
          visibility: visible;
        }
        .lightbox-close {
          position: absolute;
          top: 20px; right: 30px;
          color: #fff;
          font-size: 40px;
          cursor: pointer;
          z-index: 10000;
          background: none;
          border: none;
        }
        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: #fff;
          font-size: 40px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          width: 50px; height: 50px;
          display: flex; justify-content: center; align-items: center;
          transition: background 0.3s ease;
          z-index: 10000;
        }
        .lightbox-nav:hover { background: rgba(255, 255, 255, 0.3); }
        .lightbox-prev { left: 20px; }
        .lightbox-next { right: 20px; }
        .lightbox-img-wrapper {
          position: relative;
          width: 90vw; height: 85vh;
          max-width: 1200px;
        }

      `}</style>

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 28px" }}>
        
        {/* Back Button */}
        <Link 
          href="/#projects" 
          className="pd-back-btn"
          style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "10px", 
            color: "rgba(0,0,0,0.6)", 
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.9rem",
            marginBottom: "40px",
            transition: "all 0.3s ease"
          }}
        >
          <span>←</span> {t("details.backToProjects")}
        </Link>

        {/* Header Section */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ display: "inline-block", padding: "6px 16px", background: "rgba(255,185,0,0.12)", border: "1px solid rgba(255,185,0,0.4)", borderRadius: "30px", color: "#b45309", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px" }}>
            {t(project.tagKey)}
          </div>
          <h1 style={{ 
            fontFamily: "'Syne', sans-serif", 
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)", 
            fontWeight: 800, 
            lineHeight: 1.1, 
            margin: "0 0 24px",
            color: "#000000"
          }}>
            {t(project.titleKey)}
          </h1>
          <p style={{ 
            fontSize: "1.1rem", 
            color: "rgba(0,0,0,0.7)", 
            lineHeight: 1.8, 
            maxWidth: "800px",
            margin: 0
          }}>
            {t(project.descKey)}
          </p>
        </div>

        {/* Project Meta Info */}
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "40px", 
          padding: "40px 0", 
          borderTop: "1px solid rgba(0,0,0,0.1)", 
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          marginBottom: "80px"
        }}>
          <div>
            <div style={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", fontWeight: 600 }}>{t("details.client")}</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#000000" }}>{project.client}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", fontWeight: 600 }}>{t("details.year")}</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#000000" }}>{project.year}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", fontWeight: 600 }}>{t("details.services")}</div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {project.services.map((service, idx) => (
                <span key={idx} style={{ 
                  padding: "4px 12px", 
                  background: "rgba(0,0,0,0.04)", 
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "20px", 
                  fontSize: "0.85rem", 
                  color: "rgba(0,0,0,0.75)",
                  fontWeight: 500
                }}>
                  {service}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", fontWeight: 600 }}>{t("details.result")}</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#b45309" }}>{t(project.resultKey)}</div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="pd-grid">
          {project.images && project.images.map((imgSrc, idx) => (
            <div 
              key={idx} 
              className="pd-image-card" 
              onClick={() => setLightboxIndex(idx)}
              style={{
                position: "relative",
                aspectRatio: "4/5",
                background: "#f3f4f6",
                cursor: "pointer",
              }}
            >
              <Image
                src={imgSrc}
                alt={`${project.client} gallery image ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                priority={idx < 2}
                unoptimized={true}
              />
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <div className={`lightbox-overlay ${lightboxIndex !== null ? 'active' : ''}`} onClick={() => setLightboxIndex(null)}>
          <button className="lightbox-close" onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}>&times;</button>
          
          <button 
            className="lightbox-nav lightbox-prev" 
            onClick={(e) => { 
              e.stopPropagation(); 
              setLightboxIndex((prev) => prev > 0 ? prev - 1 : project.images.length - 1); 
            }}
          >
            &#10094;
          </button>

          <button 
            className="lightbox-nav lightbox-next" 
            onClick={(e) => { 
              e.stopPropagation(); 
              setLightboxIndex((prev) => prev < project.images.length - 1 ? prev + 1 : 0); 
            }}
          >
            &#10095;
          </button>

          {lightboxIndex !== null && project.images[lightboxIndex] && (
            <div className="lightbox-img-wrapper" onClick={(e) => e.stopPropagation()}>
              <Image
                src={project.images[lightboxIndex]}
                alt={`Lightbox view ${lightboxIndex + 1}`}
                fill
                style={{ objectFit: "contain" }}
                unoptimized={true}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

