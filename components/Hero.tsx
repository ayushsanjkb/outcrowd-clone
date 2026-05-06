"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const HEADING = "Branding";
const SUBTITLE = "The essence of your business";

/*
  Brand mockup timing (derived from sampling the original):
  index  item        startProg  endProg
    5    tablet       0.00       0.50   — centre, alone first
    3    pencil       0.38       0.62
    6    mobile       0.38       0.62
    0    cup          0.38       0.68
    8    watch        0.38       0.68
    1    visa card    0.42       0.70
    4    mouse        0.38       0.62
    7    badge        0.54       0.80
    2    bank card    0.62       0.92   — lags most
*/
const BRAND_CFG: Record<number, [s: number, e: number]> = {
  5: [0.0, 0.5],
  3: [0.38, 0.62],
  6: [0.38, 0.62],
  0: [0.38, 0.68],
  8: [0.38, 0.68],
  1: [0.42, 0.7],
  4: [0.38, 0.62],
  7: [0.54, 0.8],
  2: [0.62, 0.92],
};

const RISE = 900;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Hero() {
  const blobRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const weMakeItRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // ── 1. Blob unblur (0 → vh×0.5) ────────────────────────────
      const blur = 25.8465 * Math.max(0, 1 - scrollY / (vh * 0.5));

      // ── 2. Blob shrink  (vh×0.8 → vh×5) ────────────────────────
      const shrinkP = Math.max(
        0,
        Math.min((scrollY - vh * 0.8) / (vh * 4.2), 1),
      );
      const scalePh2 = 1 - shrinkP * 0.6; // 1.0 → 0.4
      const tyPh2 = -shrinkP * vh * 0.153; // 0 → ≈ -112 px

      // ── 3. Blob lands on tablet logo (vh×5 → vh×7) ──────────────
      const landP = Math.max(0, Math.min((scrollY - vh * 5) / (vh * 2), 1));
      const landEt = easeOut(landP);

      // Compute logo target position dynamically so it works at any viewport size
      const cappedVw = Math.min(vw, 1440);
      const paddingB = 0.02 * cappedVw; // 2 vw padding-bottom
      const tabletColW = cappedVw * 0.97 * 0.366; // 36.6% of 97 vw
      const tabletH = (688 / 511) * tabletColW;
      const tabletTop = vh - paddingB - tabletH;
      const logoTargetY = tabletTop + tabletH * 0.18; // logo 18% from tablet top

      const blobNatH = 0.7 * vw * (716 / 1061);
      const blobCentNat = 0.4 * vh + blobNatH / 2; // blob centre before transforms
      const tyPh3Add = logoTargetY - blobCentNat - tyPh2; // extra Y needed in phase 3

      const finalScale = scalePh2 * (1 - landEt * 0.643); // 0.4 → ≈ 0.143
      const finalTY = tyPh2 + landEt * tyPh3Add;

      if (blobRef.current) {
        blobRef.current.style.transform = `translateX(calc(-50% - 22px)) translateY(${finalTY}px) scale(${finalScale})`;
        blobRef.current.style.filter = `blur(${blur}px)`;
      }

      // ── 4. Hero text fade-out (0 → vh×0.4) ─────────────────────
      if (heroTextRef.current) {
        const t = Math.min(scrollY / (vh * 0.4), 1);
        heroTextRef.current.style.opacity = String(1 - t);
        heroTextRef.current.style.transform = `translateY(${-t * 80}px)`;
      }

      // ── 5. "Let's make it Outstanding" (vh×0.25 → vh×1.0) ──────
      if (weMakeItRef.current) {
        const tIn = Math.max(
          0,
          Math.min((scrollY - vh * 0.25) / (vh * 0.35), 1),
        );
        const tOut = Math.max(
          0,
          Math.min((scrollY - vh * 0.75) / (vh * 0.25), 1),
        );
        weMakeItRef.current.style.opacity = String(tIn * (1 - tOut));
      }

      // ── 6. Brand mockup items rise (vh×6 → vh×7.8) ─────────────
      if (brandRef.current) {
        const BRAND_START = vh * 6;
        const BRAND_TRAVEL = vh * 1.8;
        const brandP = Math.max(
          0,
          Math.min(1, (scrollY - BRAND_START) / BRAND_TRAVEL),
        );

        brandRef.current
          .querySelectorAll<HTMLElement>("[data-brand-item]")
          .forEach((el) => {
            const i = Number(el.dataset.brandItem);
            const [s, e] = BRAND_CFG[i] ?? [0, 0.5];
            const raw = (brandP - s) / (e - s);
            const t = Math.max(0, Math.min(1, raw));
            const et = easeOut(t);
            el.style.transform = `translateY(${(1 - et) * RISE}px)`;
            el.style.opacity = String(Math.min(1, et * 1.6));
          });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const item = (i: number, child: React.ReactNode) => (
    <div
      data-brand-item={i}
      style={{
        transform: `translateY(${RISE}px)`,
        opacity: 0,
        willChange: "transform, opacity",
      }}
    >
      {child}
    </div>
  );

  return (
    /*
      900 vh total:
        0 – 600 vh  : hero animation (blob unblur + shrink + WeMakeIt)
        600 – 700 vh : blob lands on tablet logo position
        600 – 780 vh : brand mockup items rise (relative to BRAND_START = vh×6)
    */
    <div style={{ height: "900vh" }}>
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: "100svh" }}
      >
        {/* ── Blob — z-20 so it always sits above the tablet ───── */}
        <div
          ref={blobRef}
          aria-hidden="true"
          className="pointer-events-none absolute z-20"
          style={{
            width: "70vw",
            aspectRatio: "1061 / 716",
            top: "40vh",
            left: "50%",
            transform: "translateX(calc(-50% - 22px)) scale(1)",
            transformOrigin: "center center",
            filter: "blur(25.8465px)",
            willChange: "transform, filter",
          }}
        >
          <Image
            src="/hero-bg.webp"
            alt=""
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* ── Hero heading + subtitle ───────────────────────────── */}
        <div
          ref={heroTextRef}
          className="pointer-events-none absolute inset-x-0 text-center z-30"
          style={{ top: "clamp(2.5rem, 12vh, 7rem)" }}
        >
          <h1
            className="hero-heading select-none font-medium leading-none text-[#1d1d1d]"
            style={{ fontSize: "clamp(2.5rem, 16.667vw, 240px)" }}
          >
            {HEADING}
          </h1>
          <p
            className="text-[#1d1d1d]"
            style={{
              fontSize: "clamp(0.85rem, 1.5vw, 1.4rem)",
              marginTop: "clamp(0.75rem, 2.5vw, 1.75rem)",
            }}
          >
            {SUBTITLE}
          </p>
        </div>

        {/* ── "Let's make it Outstanding" ──────────────────────── */}
        <div
          ref={weMakeItRef}
          className="pointer-events-none absolute inset-x-0 z-[1] text-center"
          style={{ bottom: "8vh", opacity: 0 }}
        >
          <h2
            className="hero-heading font-medium text-[#1d1d1d]"
            style={{ fontSize: "clamp(2rem, 4.8vw, 56px)", lineHeight: "1.05" }}
          >
            Let&apos;s make it
          </h2>
          <div className="relative">
            <h2
              className="hero-heading text-center font-medium"
              style={{
                fontSize: "clamp(2rem, 4.8vw, 56px)",
                lineHeight: "1.15",
                background:
                  "linear-gradient(85deg, #3B64C1, #E03181 34%, #F58235 72%, #FFDA07)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Outstanding
            </h2>
            <h2
              aria-hidden="true"
              className="hero-heading pointer-events-none absolute inset-0 text-center font-medium"
              style={{
                fontSize: "clamp(2rem, 4.8vw, 56px)",
                lineHeight: "1.15",
                WebkitTextStroke: "1px rgba(29,29,31,0.25)",
                WebkitTextFillColor: "transparent",
              }}
            >
              Outstanding
            </h2>
          </div>
          <h3
            className="font-medium text-[#1d1d1d]"
            style={{
              fontSize: "clamp(0.9rem, 1.8vw, 26px)",
              marginTop: "0.25rem",
            }}
          >
            in every little detail
          </h3>
        </div>

        {/* ── Brand mockup grid — rises from below, blob sits on top ── */}
        <div
          ref={brandRef}
          className="absolute inset-0 z-[5] flex items-end justify-center"
          style={{ paddingBottom: "2vw" }}
        >
          <div
            className="flex items-end"
            style={{ width: "97vw", maxWidth: "1440px" }}
          >
            {/* Col 1 : cup · visa · bank-card */}
            <div
              style={{ width: "22.5%", flexShrink: 0 }}
              className="flex flex-col gap-1.5"
            >
              {item(
                0,
                <Image
                  src="/cup.webp"
                  alt="Soun mug"
                  width={314}
                  height={273}
                  className="w-full rounded-2xl object-cover drop-shadow-xl"
                />,
              )}
              {item(
                1,
                <Image
                  src="/motion-music.webp"
                  alt="Banking card"
                  width={314}
                  height={216}
                  className="w-full rounded-2xl object-cover drop-shadow-xl"
                />,
              )}
              {item(
                2,
                <Image
                  src="/visa.webp"
                  alt="Visit card"
                  width={314}
                  height={200}
                  className="w-full rounded-2xl object-cover drop-shadow-xl"
                />,
              )}
            </div>

            {/* Col 2 : pencil · mouse */}
            <div
              style={{ width: "9.2%", flexShrink: 0 }}
              className="flex flex-col items-center gap-1.5 pb-4"
            >
              {item(
                3,
                <Image
                  src="/soun-pencil.webp"
                  alt="Apple Pencil"
                  width={128}
                  height={512}
                  className="w-full object-contain drop-shadow-lg"
                />,
              )}
              {item(
                4,
                <Image
                  src="/mouse.webp"
                  alt="Mouse"
                  width={128}
                  height={174}
                  className="w-full rounded-xl object-contain drop-shadow-lg"
                />,
              )}
            </div>

            {/* Col 3 : central tablet */}
            <div style={{ width: "36.6%", flexShrink: 0 }}>
              {item(
                5,
                <Image
                  src="/tablet-soun.webp"
                  alt="Soun tablet app"
                  width={511}
                  height={688}
                  className="w-full rounded-3xl object-cover drop-shadow-2xl"
                  priority
                />,
              )}
            </div>

            {/* Col 4 : mobile · badge */}
            <div
              style={{ width: "19.4%", flexShrink: 0 }}
              className="flex flex-col gap-1.5"
            >
              {item(
                6,
                <Image
                  src="/visa-apply.webp"
                  alt="Mobile app"
                  width={271}
                  height={437}
                  className="w-full rounded-2xl object-cover drop-shadow-xl"
                />,
              )}
              {item(
                7,
                <Image
                  src="/speaker-ticket.webp"
                  alt="Speaker badge"
                  width={271}
                  height={252}
                  className="w-full rounded-2xl object-cover drop-shadow-xl"
                />,
              )}
            </div>

            {/* Col 5 : watch */}
            <div style={{ width: "12.3%", flexShrink: 0 }}>
              {item(
                8,
                <Image
                  src="/watchos.webp"
                  alt="Watch OS"
                  width={172}
                  height={690}
                  className="w-full rounded-2xl object-cover drop-shadow-xl"
                />,
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
