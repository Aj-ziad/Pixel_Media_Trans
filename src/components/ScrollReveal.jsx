'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal — wraps children and animates them on scroll.
 *
 * Props:
 *   animation  – 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scaleUp' | 'zoomRotate'
 *   stagger    – if true, animate direct children one‑by‑one
 *   delay      – extra delay (s)
 *   duration   – animation duration (s)
 *   threshold  – 0‑1, how far the element must enter the viewport
 *   className  – passed through to wrapper div
 *   once       – if true (default), animate only the first time
 */
const presets = {
  fadeUp:      { y: 100,  opacity: 0 },
  fadeIn:      { opacity: 0 },
  fadeLeft:    { x: -100, opacity: 0 },
  fadeRight:   { x: 100,  opacity: 0 },
  scaleUp:     { scale: 0.85, opacity: 0 },
  zoomRotate:  { scale: 0.7, rotation: 8, opacity: 0 },
};

export default function ScrollReveal({
  children,
  animation = 'fadeUp',
  stagger = false,
  delay = 0,
  duration = 1.2,
  threshold = 0.2,
  once = true,
  className = '',
  style = {},
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from = presets[animation] || presets.fadeUp;
    const targets = stagger ? el.children : el;

    gsap.set(targets, from);
    
    // Eliminate FOUC by making wrapper visible only after GSAP applies initial styles
    el.style.visibility = 'visible';

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `top ${100 - threshold * 100}%`,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    });

    const toProps = Object.fromEntries(
      Object.keys(from).map((k) => {
        if (k === 'opacity' || k === 'scale') return [k, 1];
        return [k, 0];
      })
    );

    tl.to(targets, {
      ...toProps,
      duration,
      delay,
      ease: 'power3.out',
      stagger: stagger ? 0.12 : 0,
      clearProps: Object.keys(from).filter(k => k === 'opacity').join(','),
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [animation, stagger, delay, duration, threshold, once]);

  return (
    <div ref={ref} className={className} style={{ ...style, visibility: 'hidden' }}>
      {children}
    </div>
  );
}
