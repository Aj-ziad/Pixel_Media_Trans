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
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", color: "#fff" }}>
        <div style={{ textAlign: "center" }}>
          <h2>Project Not Found</h2>
          <Link href="/projects" style={{ color: "#ffb900", textDecoration: "none", marginTop: "20px", display: "inline-block" }}>
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#050505",
      color: "#ffffff",
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
        }
        .pd-image-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,185,0,0.2);
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
            color: "rgba(255,255,255,0.6)", 
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.9rem",
            marginBottom: "40px",
            transition: "all 0.3s ease"
          }}
        >
          <span>←</span> Back to Projects
        </Link>

        {/* Header Section */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ display: "inline-block", padding: "6px 16px", background: "rgba(255,185,0,0.1)", border: "1px solid rgba(255,185,0,0.3)", borderRadius: "30px", color: "#ffb900", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px" }}>
            {t(project.tagKey)}
          </div>
          <h1 style={{ 
            fontFamily: "'Syne', sans-serif", 
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)", 
            fontWeight: 800, 
            lineHeight: 1.1, 
            margin: "0 0 24px",
            color: "#fff"
          }}>
            {t(project.titleKey)}
          </h1>
          <p style={{ 
            fontSize: "1.1rem", 
            color: "rgba(255,255,255,0.7)", 
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
          borderTop: "1px solid rgba(255,255,255,0.1)", 
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          marginBottom: "80px"
        }}>
          <div>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", fontWeight: 600 }}>Client</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>{project.client}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", fontWeight: 600 }}>Year</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>{project.year}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", fontWeight: 600 }}>Services</div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {project.services.map((service, idx) => (
                <span key={idx} style={{ 
                  padding: "4px 12px", 
                  background: "rgba(255,255,255,0.05)", 
                  borderRadius: "20px", 
                  fontSize: "0.85rem", 
                  color: "rgba(255,255,255,0.8)" 
                }}>
                  {service}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", fontWeight: 600 }}>Result</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffb900" }}>{t(project.resultKey)}</div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="pd-grid">
          {project.images && project.images.map((imgSrc, idx) => (
            <div 
              key={idx} 
              className="pd-image-card" 
              style={{
                position: "relative",
                aspectRatio: "4/3",
                background: "#111",
                gridColumn: idx === 0 ? "1 / -1" : "auto", // The first image spans full width
                aspectRatio: idx === 0 ? "21/9" : "4/3",
              }}
            >
              <Image
                src={imgSrc}
                alt={`${project.client} gallery image ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
