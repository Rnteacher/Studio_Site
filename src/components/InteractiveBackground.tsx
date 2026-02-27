"use client";

import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const PARTICLE_COUNT = 140;
const CONNECTION_DIST = 100;
const MOUSE_RADIUS = 200;
const MOUSE_STRENGTH = 0.02;

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const animRef = useRef<number>(0);
  const colorRef = useRef("200, 100, 160");
  const sizeRef = useRef({ w: 0, h: 0 });

  const initParticles = useCallback((w: number, h: number) => {
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 1.8 + 0.8,
    }));
    sizeRef.current = { w, h };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Read --primary CSS variable and convert HSL to RGB
    const readColor = () => {
      const style = getComputedStyle(document.documentElement);
      const hsl = style.getPropertyValue("--primary").trim();
      if (!hsl) return;
      const [h, s, l] = hsl.split(/\s+/).map(parseFloat);
      if (isNaN(h)) return;
      const rgb = hslToRgb(h, s / 100, l / 100);
      colorRef.current = `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;
    };

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const newW = rect.width;
      const newH = rect.height;
      canvas.width = newW * dpr;
      canvas.height = newH * dpr;
      canvas.style.width = `${newW}px`;
      canvas.style.height = `${newH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.current.length === 0) {
        initParticles(newW, newH);
      } else {
        // Scale particle positions proportionally to new size
        const prev = sizeRef.current;
        if (prev.w > 0 && prev.h > 0) {
          const sx = newW / prev.w;
          const sy = newH / prev.h;
          for (const p of particles.current) {
            p.x *= sx;
            p.y *= sy;
          }
        }
        sizeRef.current = { w: newW, h: newH };
      }
    };

    readColor();
    resize();

    // Watch for theme changes
    const observer = new MutationObserver(readColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const onMouseLeave = () => {
      mouse.current.active = false;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const c = colorRef.current;
      ctx.clearRect(0, 0, w, h);

      const pts = particles.current;

      // Update positions
      for (const p of pts) {
        // Mouse attraction
        if (mouse.current.active) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_STRENGTH;
            p.vx += dx / dist * force;
            p.vy += dy / dist * force;
          }
        }

        // Damping
        p.vx *= 0.995;
        p.vy *= 0.995;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }

      // Draw connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.3;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${c}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw mouse connections
      if (mouse.current.active) {
        for (const p of pts) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const opacity = (1 - dist / MOUSE_RADIUS) * 0.35;
            ctx.beginPath();
            ctx.moveTo(mouse.current.x, mouse.current.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(${c}, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c}, 0.5)`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      aria-hidden="true"
    />
  );
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}
