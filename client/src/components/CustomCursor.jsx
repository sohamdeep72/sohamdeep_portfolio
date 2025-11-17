import React, { useEffect, useRef, useState } from "react";

/**
 * CustomCursor (desktop only)
 * - inner dot immediately follows mouse (no lag)
 * - outer ring trails using requestAnimationFrame + lerp
 * - auto-disables on touch/coarse pointer devices
 *
 * Adjust LERP to tune the trailing:
 *  - smaller => more lag (e.g. 0.18)
 *  - larger  => snappier (e.g. 0.34)
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(true);
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  // Tweak this for delay effect: 0.24 gives a clear but smooth trail.
  const LERP = 0.24;

  const initialX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
  const initialY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;
  const pos = useRef({ x: initialX, y: initialY }); // outer ring position
  const mouse = useRef({ x: initialX, y: initialY }); // current mouse position (target)
  const rafRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      setEnabled(false);
      return;
    }

    // Disable on touch or coarse pointer devices
    const isCoarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    if ("ontouchstart" in window || isCoarse) {
      setEnabled(false);
      return;
    }

    // If a touch occurs later on hybrid devices, disable cursor
    const onFirstTouch = () => {
      setEnabled(false);
      window.removeEventListener("touchstart", onFirstTouch, { passive: true });
    };
    window.addEventListener("touchstart", onFirstTouch, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onFirstTouch);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // Set initial transforms so the elements don't jump
    outer.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    inner.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;

    // mousemove updates target for both inner (instant) and outer (lerp target)
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      // inner dot follows tightly (no RAF lerp)
      inner.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    // toggle active class when hovering interactive elements
    const onOver = (e) => {
      const t = e.target;
      if (!t) return;
      if (t.closest("a,button,.project-card, .btn, input, textarea")) {
        outer.classList.add("cursor--active");
      }
    };
    const onOut = () => outer.classList.remove("cursor--active");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    // RAF loop: lerp pos toward mouse target — creates the trailing/delay
    const loop = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * LERP;
      pos.current.y += (mouse.current.y - pos.current.y) * LERP;
      // Update outer transform (no CSS transition on transform)
      outer.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={outerRef} className="custom-cursor-outer" aria-hidden />
      <div ref={innerRef} className="custom-cursor-inner" aria-hidden />
    </>
  );
}
