'use client';
import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import ScrollReveal from '@/components/ScrollReveal';

/**
 * GalleryClient — Animated Cursor Trail
 * Images unfold and chop up mid-air as the mouse cursor passes over them.
 * Each image is split into fragments that scatter on cursor proximity.
 */

const FRAGMENT_ROWS = 3;
const FRAGMENT_COLS = 3;
const PROXIMITY_RADIUS = 180; // px — how close cursor needs to be to trigger
const TRAIL_LIFETIME = 2200; // ms — how long trail ghosts live

export default function GalleryClient({ images = [], sectionTag, title, subtitle, imageAlt }) {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const trailPoolRef = useRef([]);
  const lastTrailTime = useRef(0);
  const activeImagesRef = useRef(new Set());
  // Removed isMobile state since we want the effect everywhere

  // Create trail ghost element
  const spawnTrail = useCallback((imgSrc, x, y, w, h) => {
    const container = containerRef.current;
    if (!container) return;

    const ghost = document.createElement('div');
    ghost.className = 'gallery-trail-ghost';
    ghost.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${w}px;
      height: ${h}px;
      pointer-events: none;
      z-index: 1;
    `;

    // Create fragmented ghost
    const fragW = w / FRAGMENT_COLS;
    const fragH = h / FRAGMENT_ROWS;

    for (let r = 0; r < FRAGMENT_ROWS; r++) {
      for (let c = 0; c < FRAGMENT_COLS; c++) {
        const frag = document.createElement('div');
        frag.style.cssText = `
          position: absolute;
          left: ${c * fragW}px;
          top: ${r * fragH}px;
          width: ${fragW}px;
          height: ${fragH}px;
          background-image: url(${imgSrc});
          background-size: ${w}px ${h}px;
          background-position: -${c * fragW}px -${r * fragH}px;
          opacity: 0.35;
          filter: hue-rotate(${Math.random() * 30 - 15}deg) saturate(1.6) contrast(1.2);
        `;
        ghost.appendChild(frag);
      }
    }

    container.appendChild(ghost);

    // Animate ghost fragments dispersing
    const frags = ghost.children;
    gsap.to(frags, {
      x: () => (Math.random() - 0.5) * 60,
      y: () => (Math.random() - 0.5) * 50,
      rotation: () => (Math.random() - 0.5) * 25,
      opacity: 0,
      duration: TRAIL_LIFETIME / 1000,
      ease: 'power2.out',
      stagger: 0.02,
      onComplete: () => ghost.remove(),
    });
  }, []);

  // Handle mouse/touch movement
  const handleMouseMove = useCallback((e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    mouseRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  // Animation loop — check proximity and trigger effects
  useEffect(() => {

    const container = containerRef.current;
    if (!container) return;

    const imageEls = container.querySelectorAll('.gallery-image-card');

    const tick = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      imageEls.forEach((el) => {
        const elRect = el.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        const elX = elRect.left - contRect.left + elRect.width / 2;
        const elY = elRect.top - contRect.top + elRect.height / 2;
        const dist = Math.hypot(mx - elX, my - elY);

        const imgTag = el.querySelector('img');
        const fragments = el.querySelectorAll('.img-fragment');
        const id = el.dataset.id;

        if (dist < PROXIMITY_RADIUS) {
          // Activate — show fragments, hide original
          if (!activeImagesRef.current.has(id)) {
            activeImagesRef.current.add(id);

            if (imgTag) gsap.to(imgTag, { opacity: 0, duration: 0.25 });

            fragments.forEach((frag) => {
              gsap.to(frag, {
                opacity: 1,
                x: (Math.random() - 0.5) * 40,
                y: (Math.random() - 0.5) * 35,
                rotation: (Math.random() - 0.5) * 18,
                scale: 0.95 + Math.random() * 0.12,
                duration: 0.5,
                ease: 'power2.out',
              });
            });

            // Spawn trail
            const now = Date.now();
            if (now - lastTrailTime.current > 120) {
              lastTrailTime.current = now;
              const imgSrc = imgTag?.src || '';
              spawnTrail(
                imgSrc,
                elRect.left - contRect.left,
                elRect.top - contRect.top,
                elRect.width,
                elRect.height
              );
            }
          }
        } else {
          // Deactivate — reassemble
          if (activeImagesRef.current.has(id)) {
            activeImagesRef.current.delete(id);

            if (imgTag) gsap.to(imgTag, { opacity: 1, duration: 0.6 });

            fragments.forEach((frag) => {
              gsap.to(frag, {
                opacity: 0,
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                duration: 0.6,
                ease: 'power2.inOut',
              });
            });
          }
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [spawnTrail]);

  // Build fragment overlays for each image
  const buildFragments = (imgSrc, w, h) => {
    const frags = [];
    const fragW = 100 / FRAGMENT_COLS;
    const fragH = 100 / FRAGMENT_ROWS;
    for (let r = 0; r < FRAGMENT_ROWS; r++) {
      for (let c = 0; c < FRAGMENT_COLS; c++) {
        frags.push(
          <div
            key={`${r}-${c}`}
            className="img-fragment"
            style={{
              position: 'absolute',
              left: `${c * fragW}%`,
              top: `${r * fragH}%`,
              width: `${fragW}%`,
              height: `${fragH}%`,
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: `${FRAGMENT_COLS * 100}% ${FRAGMENT_ROWS * 100}%`,
              backgroundPosition: `${c * (100 / (FRAGMENT_COLS - 1))}% ${r * (100 / (FRAGMENT_ROWS - 1))}%`,
              opacity: 0,
              zIndex: 3,
              filter: `hue-rotate(${(r * FRAGMENT_COLS + c) * 8 - 30}deg) saturate(1.4)`,
              willChange: 'transform, opacity',
            }}
          />
        );
      }
    }
    return frags;
  };

  // Grid positions for scattered layout
  const getCardStyle = (index, total) => {
    // Scattered layout positions — organic feel
    const positions = [
      { top: '2%',  left: '3%',  w: 'clamp(90px, 20vw, 220px)', h: 'clamp(80px, 16vw, 180px)', rot: -6 },
      { top: '5%',  left: '28%', w: 'clamp(80px, 18vw, 200px)', h: 'clamp(100px, 22vw, 240px)', rot: 4 },
      { top: '0%',  left: '54%', w: 'clamp(100px, 21vw, 230px)', h: 'clamp(85px, 18vw, 200px)', rot: -3 },
      { top: '8%',  left: '76%', w: 'clamp(80px, 17vw, 190px)', h: 'clamp(95px, 20vw, 220px)', rot: 7 },
      { top: '38%', left: '1%',  w: 'clamp(100px, 22vw, 240px)', h: 'clamp(85px, 18vw, 200px)', rot: 5 },
      { top: '35%', left: '25%', w: 'clamp(90px, 19vw, 210px)', h: 'clamp(105px, 23vw, 250px)', rot: -5 },
      { top: '40%', left: '50%', w: 'clamp(85px, 18vw, 200px)', h: 'clamp(80px, 17vw, 190px)', rot: 3 },
      { top: '32%', left: '75%', w: 'clamp(95px, 20vw, 220px)', h: 'clamp(100px, 21vw, 230px)', rot: -4 },
      { top: '68%', left: '5%',  w: 'clamp(100px, 21vw, 230px)', h: 'clamp(90px, 19vw, 210px)', rot: -7 },
      { top: '70%', left: '30%', w: 'clamp(85px, 18vw, 200px)', h: 'clamp(85px, 18vw, 200px)', rot: 6 },
      { top: '65%', left: '55%', w: 'clamp(95px, 20vw, 220px)', h: 'clamp(100px, 22vw, 240px)', rot: -2 },
      { top: '72%', left: '78%', w: 'clamp(80px, 17vw, 190px)', h: 'clamp(90px, 19vw, 210px)', rot: 5 },
    ];

    const pos = positions[index % positions.length];
    return {
      position: 'absolute',
      top: pos.top,
      left: pos.left,
      width: pos.w,
      height: pos.h,
      transform: `rotate(${pos.rot}deg)`,
    };
  };

  return (
    <section className="gallery-cursor-section py-12 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-[#ffb900] font-bold tracking-wide uppercase text-sm">
          {sectionTag}
        </h3>
        <h2 className="text-3xl text-black sm:text-4xl font-bold mt-2 font-sans">
          {title}
        </h2>
        <p className="text-gray-700 mt-2 font-sans">{subtitle}</p>
      </div>

      {/* Gallery Canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onTouchStart={handleMouseMove}
        className="gallery-canvas-container"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          minHeight: '100vh',
          maxHeight: '850px',
          overflow: 'hidden',
          cursor: 'crosshair',
        }}
      >
        {/* Grid background moved to globals.css body::after */}

        {/* Scattered cursor-trail layout (desktop & mobile) */}
        {images.map((item, idx) => (
          <ScrollReveal
            key={item.id || idx}
            animation="scaleUp"
            delay={idx * 0.05}
            style={{
              ...getCardStyle(idx, images.length),
              zIndex: 2,
            }}
          >
            <div
              data-id={`img-${item.id || idx}`}
              className="gallery-image-card w-full h-full"
              style={{
                overflow: 'visible',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                transition: 'box-shadow 0.3s',
              }}
            >
              <img
              src={item.img}
              alt={`${imageAlt} ${idx + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '12px',
                display: 'block',
              }}
              draggable={false}
              loading="lazy"
            />
            {/* Fragment overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '12px',
                overflow: 'hidden',
                pointerEvents: 'none',
              }}
            >
              {buildFragments(item.img, 100, 100)}
            </div>
          </div>
          </ScrollReveal>
        ))}

        {/* Cursor glow effect */}
        <div
          className="gallery-cursor-glow hidden md:block"
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,185,0,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
            transform: 'translate(-50%, -50%)',
            left: 0,
            top: 0,
            opacity: 0,
          }}
        />
      </div>
    </section>
  );
}
