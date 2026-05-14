"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ElementsOfBranding() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const update = () => {
      const center = window.innerHeight / 2;
      const maxDist = window.innerHeight * 0.7;

      rowRefs.current.forEach((el) => {
        if (!el) return;
        const { top, height } = el.getBoundingClientRect();
        const t = Math.max(
          0,
          1 - Math.abs(top + height / 2 - center) / maxDist,
        );
        el.style.opacity = (0.15 + t * 0.85).toFixed(4);
        el.style.filter = `brightness(${(0.8 + t * 0.4).toFixed(3)})`;
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const ref = (i: number) => (el: HTMLDivElement | null) => {
    rowRefs.current[i] = el;
  };

  return (
    <section
      data-nav-dark
      className="bg-black px-5 py-20 md:px-[50px] md:py-[140px] lg:py-[220px]"
    >
      <div className="mx-auto max-w-[1100px]">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h2
            className="hero-heading reveal-item font-medium text-white"
            style={{ fontSize: "clamp(2rem, 4.4vw, 64px)" }}
          >
            Elements of Branding
          </h2>
          <p
            className="reveal-item mx-auto mt-4"
            style={{
              color: "#86868b",
              textAlign: "center",
              width: "100%",
              maxWidth: "62ch",
              fontFamily:
                "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
              fontSize: "clamp(16px, 1.25vw, 18px)",
              fontWeight: 300,
              lineHeight: '28px',
              transitionDelay: "100ms",
            }}
          >
            The logo encapsulates the idea behind the brand. We know how to make
            it work for you. Colors add a touch of soul that will resonate
            better with your customers.
          </p>
        </div>

        {/* Images container — dotted bg scoped here only */}
        <div
          className="relative mt-16 overflow-hidden rounded-2xl"
          style={{
            backgroundImage: "url('/dotted background.webp')",
            backgroundSize: "auto",
            backgroundPosition: "center center",
            /* Extra vertical room so first and last items can reach viewport center */
            paddingTop: "5vh",
            paddingBottom: "1vh",
          }}
        >
          {/* Radial vignette at z-index 0 — sits behind items, darkens the grid at edges */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              zIndex: 0,
              background:
                "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.78) 65%, rgb(0,0,0) 90%)",
            }}
          />

          <div
            ref={ref(0)}
            className="relative z-[1] px-8 py-5"
            style={{ opacity: 0.15, willChange: "opacity, filter" }}
          >
            <Image
              src="/soun-example.webp"
              alt="Soun brand elements"
              width={1440}
              height={503}
              className="w-full object-cover"
            />
          </div>

          <div
            ref={ref(1)}
            className="relative z-[1] px-8 py-5"
            style={{ opacity: 0.15, willChange: "opacity, filter" }}
          >
            <Image
              src="/soun-logo.webp"
              alt="Soun logo"
              width={1440}
              height={386}
              className="w-full rounded-xl object-cover"
            />
          </div>

          <div
            ref={ref(2)}
            className="relative z-[1] grid grid-cols-2"
            style={{ opacity: 0.15, willChange: "opacity, filter" }}
          >
            <div className="px-8 py-5">
              <Image
                src="/sans-fonts.webp"
                alt="Google Sans font"
                width={540}
                height={280}
                className="w-full rounded-xl object-cover"
              />
            </div>
          </div>

          <div
            ref={ref(3)}
            className="relative z-[1] px-8 py-5"
            style={{ opacity: 0.15, willChange: "opacity, filter" }}
          >
            <Image
              src="/color-codes.webp"
              alt="Brand colors"
              width={540}
              height={280}
              className="w-full rounded-xl object-cover"
            />
          </div>

          <div
            ref={ref(4)}
            className="relative z-[1] grid grid-cols-2"
            style={{ opacity: 0.15, willChange: "opacity, filter" }}
          >
            <div className="px-8 py-5">
              <Image
                src="/elements.webp"
                alt="Brand UI elements"
                width={1440}
                height={406}
                className="w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
