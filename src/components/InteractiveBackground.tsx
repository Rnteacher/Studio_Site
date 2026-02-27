"use client";

import { useRef, useEffect } from "react";

const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;

interface Star {
  x: number;
  y: number;
  z: number;
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

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let scale = 1;
    let width = 0;
    let height = 0;
    const stars: Star[] = [];
    let pointerX: number | null = null;
    let pointerY: number | null = null;
    const velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };
    let touchInput = false;
    let animId = 0;
    let starColor = "rgb(200, 100, 160)";

    // Read primary color from CSS
    const readColor = () => {
      const style = getComputedStyle(document.documentElement);
      const hsl = style.getPropertyValue("--primary").trim();
      if (!hsl) return;
      const [h, s, l] = hsl.split(/\s+/).map(parseFloat);
      if (isNaN(h)) return;
      const rgb = hslToRgb(h, s / 100, l / 100);
      starColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    };

    const starCount = () => {
      const parent = canvas.parentElement;
      if (!parent) return 200;
      const rect = parent.getBoundingClientRect();
      return Math.floor((rect.width + rect.height) / 8);
    };

    const generate = () => {
      const count = starCount();
      stars.length = 0;
      for (let i = 0; i < count; i++) {
        stars.push({
          x: 0,
          y: 0,
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
      }
    };

    const placeStar = (star: Star) => {
      star.x = Math.random() * width;
      star.y = Math.random() * height;
    };

    const recycleStar = (star: Star) => {
      let direction = "z";
      const vx = Math.abs(velocity.x);
      const vy = Math.abs(velocity.y);

      if (vx > 1 || vy > 1) {
        let axis: string;
        if (vx > vy) {
          axis = Math.random() < vx / (vx + vy) ? "h" : "v";
        } else {
          axis = Math.random() < vy / (vx + vy) ? "v" : "h";
        }
        if (axis === "h") {
          direction = velocity.x > 0 ? "l" : "r";
        } else {
          direction = velocity.y > 0 ? "t" : "b";
        }
      }

      star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

      if (direction === "z") {
        star.z = 0.1;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      } else if (direction === "l") {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
      } else if (direction === "r") {
        star.x = width + OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
      } else if (direction === "t") {
        star.x = width * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
      } else if (direction === "b") {
        star.x = width * Math.random();
        star.y = height + OVERFLOW_THRESHOLD;
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      scale = window.devicePixelRatio || 1;
      width = rect.width * scale;
      height = rect.height * scale;
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      stars.forEach(placeStar);
    };

    const update = () => {
      velocity.tx *= 0.96;
      velocity.ty *= 0.96;
      velocity.x += (velocity.tx - velocity.x) * 0.8;
      velocity.y += (velocity.ty - velocity.y) * 0.8;

      for (const star of stars) {
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;
        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        star.z += velocity.z;

        if (
          star.x < -OVERFLOW_THRESHOLD ||
          star.x > width + OVERFLOW_THRESHOLD ||
          star.y < -OVERFLOW_THRESHOLD ||
          star.y > height + OVERFLOW_THRESHOLD
        ) {
          recycleStar(star);
        }
      }
    };

    const render = () => {
      for (const star of stars) {
        context.beginPath();
        context.lineCap = "round";
        context.lineWidth = STAR_SIZE * star.z * scale;
        context.globalAlpha = 0.5 + 0.5 * Math.random();
        context.strokeStyle = starColor;
        context.beginPath();
        context.moveTo(star.x, star.y);

        let tailX = velocity.x * 2;
        let tailY = velocity.y * 2;
        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;

        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
      }
    };

    const step = () => {
      context.clearRect(0, 0, width, height);
      update();
      render();
      animId = requestAnimationFrame(step);
    };

    const movePointer = (x: number, y: number) => {
      if (typeof pointerX === "number" && typeof pointerY === "number") {
        const ox = x - pointerX;
        const oy = y - pointerY;
        velocity.tx += (ox / (8 * scale)) * (touchInput ? 1 : -1);
        velocity.ty += (oy / (8 * scale)) * (touchInput ? 1 : -1);
      }
      pointerX = x;
      pointerY = y;
    };

    const onMouseMove = (e: MouseEvent) => {
      touchInput = false;
      movePointer(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      touchInput = true;
      movePointer(e.touches[0].clientX, e.touches[0].clientY);
      e.preventDefault();
    };

    const onMouseLeave = () => {
      pointerX = null;
      pointerY = null;
    };

    readColor();
    generate();
    resize();
    animId = requestAnimationFrame(step);

    // Watch for theme changes
    const observer = new MutationObserver(readColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onMouseLeave);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onMouseLeave);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      aria-hidden="true"
    />
  );
}
