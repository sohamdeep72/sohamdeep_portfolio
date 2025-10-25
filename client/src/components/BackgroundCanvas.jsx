// client/src/components/BackgroundCanvas.jsx
import React, { useEffect, useRef } from "react";

/**
 * BackgroundCanvas - full-screen fixed canvas for animated particles / nebula
 * lightweight particle system with parallax-like motion
 */

export default function BackgroundCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(DPR, DPR);

    const particles = [];
    const PARTICLE_COUNT = Math.max(40, Math.floor((w * h) / 60000)); // scale with viewport

    function rand(min, max) {
      return min + Math.random() * (max - min);
    }

    // create particles with subtle color range
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.6, 3.2),
        vx: rand(-0.12, 0.12),
        vy: rand(-0.06, 0.06),
        hue: rand(180, 210),
        alpha: rand(0.05, 0.22),
      });
    }

    let t = 0;
    let raf = null;

    function draw() {
      t += 0.01;
      // subtle background gradient (rotating)
      const grad = ctx.createLinearGradient(0, 0, w, h);
      // two dark tones with slight color
      const g1 = `rgba(4,10,16,1)`;
      const g2 = `rgba(6,20,32,1)`;
      grad.addColorStop(0, g1);
      grad.addColorStop(1, g2);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // soft blobs (nebula) via radial gradients
      const blobCount = 3;
      for (let i = 0; i < blobCount; i++) {
        const bx = (Math.sin(t * (0.2 + i * 0.07) + i) * 0.5 + 0.5) * w;
        const by = (Math.cos(t * (0.15 + i * 0.05) + i) * 0.5 + 0.5) * h;
        const radius = Math.max(w, h) * (0.18 - i * 0.03);
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, radius);
        g.addColorStop(0, `rgba(6,30,40,${0.18 - i * 0.04})`);
        g.addColorStop(0.5, `rgba(6,24,34,${0.06 - i * 0.01})`);
        g.addColorStop(1, "rgba(6,10,16,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(bx, by, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // small particles
      for (let p of particles) {
        // update position slowly
        p.x += p.vx + Math.sin(t * 0.6 + p.x * 0.001) * 0.08;
        p.y += p.vy + Math.cos(t * 0.5 + p.y * 0.001) * 0.04;
        // wrap
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // glow
        ctx.beginPath();
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
        grd.addColorStop(0, `rgba(${p.hue},${p.hue + 20},${p.hue + 40},${p.alpha * 0.9})`);
        grd.addColorStop(0.2, `rgba(46,200,180,${p.alpha * 0.6})`);
        grd.addColorStop(1, "rgba(10,14,18,0)");
        ctx.fillStyle = grd;
        ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
        ctx.fill();

        // sharp center dot
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${Math.min(0.95, p.alpha * 1.6)})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    draw();

    // handle resize
    function onResize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(DPR, DPR);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -40,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
