"use client";

import { useEffect, useRef } from "react";

const ITEMS = ["Brand Identity", "Brand Book", "Logotype", "Promo Materials"];

// Original gradient: 308deg, #5491EA → #7CC6EE (matches inspected rgb values)
const GRADIENT =
  "linear-gradient(308deg,#5491ea,#5491ea 39%,#7cc6ee 100%,#7cc6ee)";

export default function BrandScrollItems() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      itemRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - vh / 2);
        // Matches original: min opacity 0.2 at far edges, peaks at 1 when centred
        const opacity = Math.max(0.2, 1 - dist / (vh * 0.55));
        el.style.opacity = String(opacity);
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section className="bg-white">
      {ITEMS.map((item, i) => (
        <div
          key={item}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className="flex items-center justify-center last:mb-[350px]"
          style={{ opacity: 0.2 }}
        >
          <h3
            className="hero-heading select-none text-center font-medium mt-[160px]"
            style={{
              fontSize: "clamp(2.5rem, 8.3vw, 120px)",
              background: GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {item}
          </h3>
        </div>
      ))}
    </section>
  );
}
