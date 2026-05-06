"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function BrandSystem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);
  const bankCardRef = useRef<HTMLDivElement>(null);
  const penRef = useRef<HTMLDivElement>(null);
  const eraserRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const watchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section top hits viewport bottom, 1 when section leaves viewport top
      const prog = Math.max(
        0,
        Math.min(1, -(rect.top - vh) / (rect.height + vh)),
      );

      const set = (ref: React.RefObject<HTMLDivElement | null>, px: number) => {
        if (ref.current)
          ref.current.style.transform = `translateY(${prog * px}px)`;
      };

      // Derived from measuring original's translateY values at scroll 3 500
      set(cupRef, -30);
      set(bankCardRef, 60); // lags down  (+126 px in original)
      set(penRef, -20);
      set(eraserRef, 40); // lags down  (+47 px in original)
      set(mobileRef, -25);
      set(watchRef, -15);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Floating mockups ─────────────────────────────────────── */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-white"
        style={{ paddingTop: "6vw", paddingBottom: "2vw" }}
      >
        {/*
          5 columns matching original's 1396 px grid:
          22.5% | 9.2% | 36.6% | 19.4% | 12.3%
        */}
        <div
          className="mx-auto flex items-end"
          style={{ width: "97vw", maxWidth: "1440px" }}
        >
          {/* Column 1: cup · visit-card · banking-card */}
          <div
            style={{ width: "22.5%", flexShrink: 0 }}
            className="flex flex-col gap-3"
          >
            <div ref={cupRef} style={{ willChange: "transform" }}>
              <Image
                src="/cup.webp"
                alt="Soun mug"
                width={314}
                height={273}
                className="w-full rounded-2xl object-cover drop-shadow-xl"
              />
            </div>
            <div>
              <Image
                src="/visa.webp"
                alt="Visit card"
                width={314}
                height={200}
                className="w-full rounded-2xl object-cover drop-shadow-xl"
              />
            </div>
            <div ref={bankCardRef} style={{ willChange: "transform" }}>
              <Image
                src="/visa-apply.webp"
                alt="Banking card"
                width={314}
                height={216}
                className="w-full rounded-2xl object-cover drop-shadow-xl"
              />
            </div>
          </div>

          {/* Column 2: pencil · accessory */}
          <div
            style={{ width: "9.2%", flexShrink: 0 }}
            className="flex flex-col items-center gap-3 pb-4"
          >
            <div
              ref={penRef}
              style={{ willChange: "transform" }}
              className="w-full"
            >
              <Image
                src="/soun-pencil.webp"
                alt="Apple Pencil"
                width={128}
                height={512}
                className="w-full object-contain drop-shadow-lg"
              />
            </div>
            <div
              ref={eraserRef}
              style={{ willChange: "transform" }}
              className="w-full"
            >
              <Image
                src="/mouse.webp"
                alt="Mouse"
                width={128}
                height={174}
                className="w-full rounded-xl object-contain drop-shadow-lg"
              />
            </div>
          </div>

          {/* Column 3: central tablet */}
          <div style={{ width: "36.6%", flexShrink: 0 }}>
            <Image
              src="/tablet-soun.webp"
              alt="Soun tablet app"
              width={511}
              height={688}
              className="w-full rounded-3xl object-cover drop-shadow-2xl"
              priority
            />
          </div>

          {/* Column 4: mobile · badge */}
          <div
            style={{ width: "19.4%", flexShrink: 0 }}
            className="flex flex-col gap-3"
          >
            <div ref={mobileRef} style={{ willChange: "transform" }}>
              <Image
                src="/soun-example.webp"
                alt="Mobile app"
                width={271}
                height={437}
                className="w-full rounded-2xl object-cover drop-shadow-xl"
              />
            </div>
            <div>
              <Image
                src="/speaker-ticket.webp"
                alt="Speaker badge"
                width={271}
                height={252}
                className="w-full rounded-2xl object-cover drop-shadow-xl"
              />
            </div>
          </div>

          {/* Column 5: watch */}
          <div
            ref={watchRef}
            style={{ width: "12.3%", flexShrink: 0, willChange: "transform" }}
          >
            <Image
              src="/watchos.webp"
              alt="Watch OS"
              width={172}
              height={690}
              className="w-full rounded-2xl object-cover drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* ── "A brand system equals higher value" ──────────────────── */}
      <section className="bg-white px-6 pb-28 pt-20 text-center">
        <div className="mx-auto max-w-[700px]">
          <h2
            className="hero-heading reveal-item font-medium text-[#1d1d1d]"
            style={{ fontSize: "clamp(2rem, 3.9vw, 56px)", lineHeight: "1.1" }}
          >
            A brand system equals higher value
          </h2>
          <p
            className="reveal-item mx-auto mt-6 text-[#737373]"
            style={{
              fontSize: "clamp(0.9rem, 1.1vw, 16px)",
              maxWidth: "520px",
              lineHeight: "1.7",
              transitionDelay: "120ms",
            }}
          >
            A brand system is something every business needs. Trust us,
            we&apos;ve seen what branding can do. It&apos;s the best way to
            impress your customers and paint the right image.
          </p>
        </div>
      </section>
    </>
  );
}
