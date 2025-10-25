// client/src/components/CustomCursor.jsx
import React, { useEffect, useRef } from "react";

/**
 * Balanced custom cursor:
 * - inner dot follows pointer immediately (tight)
 * - outer ring follows with moderate lerp for smooth trailing
 * - adjust LERP constant to make it snappier or more relaxed
 */

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  // Balance factor: 0.0 = no follow, 1.0 = instant (no lag).
  // Use ~0.34 for a balanced feel. Increase slightly to reduce lag, lower to increase lag.
  const LERP = 0.34;

  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const mouse = useRef({ x: pos.current.x, y: pos.current.y });
  const rafRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    function onMove(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      // inner dot very tight to pointer for precision
      inner.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }

    function onOver(e) {
      const t = e.target;
      if (!t) return;
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
      // lerp the outer position toward the mouse for smooth trailing
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
  }, []);

  return (
    <>
      <div ref={outerRef} className="custom-cursor-outer" aria-hidden />
      <div ref={innerRef} className="custom-cursor-inner" aria-hidden />
    </>
  );
}
