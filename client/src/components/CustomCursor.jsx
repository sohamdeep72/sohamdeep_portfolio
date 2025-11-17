// client/src/components/CustomCursor.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Balanced custom cursor:
 * - inner dot follows pointer immediately (tight)
 * - outer ring follows with moderate lerp for smooth trailing
 * - auto-disables on touch / coarse-pointer devices
 * - LERP constant is easy to tweak for snappiness
 */

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(true);
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  // Balance factor: 0.0 = no follow, 1.0 = instant (no lag).
  // ~0.34 gives a balanced feel. Tweak to taste.
  const LERP = 0.34;

  // defensive for SSR
  const initialX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
  const initialY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

  const pos = useRef({ x: initialX, y: initialY });
  const mouse = useRef({ x: initialX, y: initialY });
  const rafRef = useRef(null);

  // detect touch / coarse pointer devices and disable the cursor there
  useEffect(() => {
    if (typeof window === "undefined") {
      setEnabled(false);
      return;
    }

    const isCoarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    if ("ontouchstart" in window || isCoarse) {
      setEnabled(false);
      return;
    }

    // on hybrid devices, disable if a touch is detected
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

    // ensure starting transform so cursor doesn't jump
    outer.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    inner.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;

    function onMove(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      // inner dot follows tightly
      inner.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }

    function onOver(e) {
      const t = e.target;
      if (!t) return;
      // add active class for interactive elements
      if (t.closest("a,button,.project-card, .btn, input, textarea")) {
        outer.classList.add("cursor--active");
      }
    }

    function onOut() {
      outer.classList.remove("cursor--active");
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    function loop() {
      pos.current.x += (mouse.current.x - pos.current.x) * LERP;
      pos.current.y += (mouse.current.y - pos.current.y) * LERP;
      outer.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      rafRef.current = requestAnimationFrame(loop);
    }
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
