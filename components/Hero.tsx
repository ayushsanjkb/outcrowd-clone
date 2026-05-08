"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/*
  Brand mockup stagger (proportions within the brand animation window):
  index  item        startProg  endProg
    5    tablet       0.00       0.50
    3    pencil       0.38       0.62
    6    mobile       0.38       0.62
    0    cup          0.38       0.68
    8    watch        0.38       0.68
    1    visa card    0.42       0.70
    4    mouse        0.38       0.62
    7    badge        0.54       0.80
    2    bank card    0.62       0.92
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

const RISE = 1100;
const c = (v: number) => Math.max(0, Math.min(1, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function Hero() {
  const blobRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const outstandingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // ── 1. Come to centre (0 → vh×1) ─────────────────────────────
      //    Blob rises from 30%vh below centre to exact centre,
      //    blur clears over the same window.
      const focusP  = c(scrollY / (vh * 1.0));
      const focusEt = easeInOut(focusP);
      const blur     = 20 * (1 - focusEt);           // 20px → 0
      const dropOff  = vh * 0.3 * (1 - focusEt);    // 30%vh below → 0

      // ── 2. Shrink from centre (vh×1 → vh×3) ───────────────────────
      //    Pure scale, no positional movement.
      const shrinkP = c((scrollY - vh * 1.0) / (vh * 2.0));
      const scale1  = 0.9 - shrinkP * 0.72;          // 0.90 → 0.18

      // ── 3. Land on tablet (vh×3 → vh×5) ──────────────────────────
      //    Scale continues 0.18→0.07, blob moves from centre to tablet.
      const landP  = c((scrollY - vh * 3.0) / (vh * 2.0));
      const landEt = easeInOut(landP);

      const cappedVw = Math.min(vw, 1440);
      const tabletColW = cappedVw * 0.97 * 0.366;
      const tabletH = (688 / 511) * tabletColW;
      const tabletTop = vh - 0.02 * cappedVw - tabletH;
      const logoTargetY = tabletTop + tabletH * 0.18;
      // blob natural centre = vh×0.5 (top:50% + translateY(-50%))
      const tyAtTablet = logoTargetY - vh * 0.5;

      const finalScale = (1 - landEt) * scale1 + landEt * 0.07;
      const finalTY    = dropOff + landEt * tyAtTablet;

      if (blobRef.current) {
        blobRef.current.style.transform = `translateX(calc(-50% - 22px)) translateY(calc(-50% + ${finalTY}px)) scale(${finalScale})`;
        blobRef.current.style.filter = `blur(${blur}px)`;
      }

      // ── 4. "Outstanding" gradient fade-in (vh×1.0 → vh×1.25) ─────
      if (outstandingRef.current) {
        const outP = c((scrollY - vh * 1.0) / (vh * 0.25));
        outstandingRef.current.style.opacity = String(easeInOut(outP));
      }

      // ── 5. Brand mockup items rise — easeInOut (vh×3.0 → vh×5.5) ─
      if (brandRef.current) {
        const brandP = c((scrollY - vh * 3.0) / (vh * 2.5));
        brandRef.current
          .querySelectorAll<HTMLElement>("[data-brand-item]")
          .forEach((el) => {
            const i = Number(el.dataset.brandItem);
            const [s, e] = BRAND_CFG[i] ?? [0, 0.5];
            const t = c((brandP - s) / (e - s));
            const et = easeInOut(t);
            el.style.transform = `translateY(${(1 - et) * RISE}px)`;
            el.style.opacity = String(Math.min(1, et * 1.2));
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
    <>
      {/* ── Mobile hero — compact, static, no scroll animation ─────── */}
      <div className="md:hidden">
        {/* First viewport: heading + blob */}
        <div className="relative flex min-h-svh flex-col items-center justify-center px-6 pt-20 pb-10">
          {/* Static blob */}
          <div
            className="pointer-events-none absolute"
            style={{
              width: "85vw",
              aspectRatio: "1061 / 716",
              top: "70%",
              left: "50%",
              transform:
                "translateX(calc(-50% - 10px)) translateY(-50%) scale(0.72)",
              filter: "blur(10px)",
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
          <div className="relative z-10 text-center">
            <h1
              className="hero-heading font-medium leading-none text-[#1d1d1d]"
              style={{ fontSize: "clamp(3.5rem, 22vw, 240px)" }}
            >
              Branding
            </h1>
            <p
              className="mt-3 text-[#1d1d1d]"
              style={{ fontSize: "clamp(0.9rem, 3.5vw, 1.2rem)" }}
            >
              The essence of your business
            </p>
          </div>
        </div>

        {/* Brand mockup — simplified 2-row mobile layout */}
        <div className="px-4 pb-20">
          {/* Row 1: tablet (hero) */}
          <div className="mb-3">
            <Image
              src="/tablet-soun.webp"
              alt="Soun tablet app"
              width={511}
              height={688}
              className="w-full rounded-3xl object-cover shadow-2xl"
              priority
            />
          </div>
          {/* Row 2: three items side by side */}
          <div className="grid grid-cols-3 gap-3">
            <Image
              src="/cup.webp"
              alt="Soun mug"
              width={314}
              height={273}
              className="w-full rounded-2xl object-cover shadow-lg"
            />
            <Image
              src="/visa-apply.webp"
              alt="Mobile app"
              width={271}
              height={437}
              className="w-full rounded-2xl object-cover shadow-lg"
            />
            <Image
              src="/watchos.webp"
              alt="Watch OS"
              width={172}
              height={690}
              className="w-full rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>

        {/* "Let's make it Outstanding in every little detail" */}
        <div className="px-6 pb-24 text-center">
          <h2
            className="hero-heading font-medium text-[#1d1d1d]"
            style={{ fontSize: "clamp(1.9rem, 7vw, 56px)", lineHeight: 1.05 }}
          >
            Let&apos;s make it
          </h2>
          <h2
            className="hero-heading font-medium"
            style={{
              fontSize: "clamp(1.9rem, 7vw, 56px)",
              lineHeight: 1.15,
              background:
                "linear-gradient(85deg,#3b64c1,#e03181 34%,#f58235 72%,#ffda07)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Outstanding
          </h2>
          <p
            className="mt-2 font-medium text-[#1d1d1d]"
            style={{ fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)" }}
          >
            in every little detail
          </p>
        </div>
      </div>

      {/* ── Desktop hero — full scroll animation (hidden on mobile) ─── */}
      <div
        className="hidden md:block"
        style={{ height: "600vh", position: "relative" }}
      >
        {/* ── Sticky background: blob + brand grid ─────────────────── */}
        <div
          className="sticky top-0 overflow-hidden"
          style={{ height: "100svh", zIndex: 5 }}
        >
          {/* Blob — centered at viewport 50/50, shrinks on scroll */}
          <div
            ref={blobRef}
            aria-hidden="true"
            className="pointer-events-none absolute z-[2]"
            style={{
              width: "75vw",
              aspectRatio: "1061 / 716",
              top: "50%",
              left: "50%",
              transform:
                "translateX(calc(-50% - 22px)) translateY(calc(-50% + 30vh)) scale(0.9)",
              transformOrigin: "center center",
              filter: "blur(16px)",
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

          {/* Brand mockup grid — rises from below */}
          <div
            ref={brandRef}
            className="absolute inset-0 z-[1] flex items-end justify-center"
            style={{ paddingBottom: "2vw" }}
          >
            <div
              className="flex items-end"
              style={{ width: "97vw", maxWidth: "1440px" }}
            >
              {/* Col 1 : cup · motion-music · visa */}
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

        {/* ── "Branding" heading — left-aligned, full-width ────────── */}
        <div
          className="pointer-events-none absolute"
          style={{ top: "20vh", left: 0, right: 0, zIndex: 10 }}
        >
          <h1
            className="hero-heading select-none font-medium text-center leading-none text-[#1d1d1d]"
            style={{ fontSize: "clamp(2.5rem, 16.667vw, 240px)" }}
          >
            Branding
          </h1>
        </div>

        {/* ── Subtitle — centered, sits mid-viewport over the blob ──── */}
        <div
          className="pointer-events-none absolute inset-x-0 text-center"
          style={{ top: "55vh", zIndex: 10 }}
        >
          <p
            className="text-[#1d1d1d]"
            style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.7rem)" }}
          >
            The essence of your business
          </p>
        </div>

        {/* ── "Let's make it" — z-10, ABOVE blob, scrolls naturally ── */}
        <div
          className="pointer-events-none absolute inset-x-0 text-center"
          style={{ top: "118vh", zIndex: 10 }}
        >
          <h2
            className="hero-heading font-medium text-[#1d1d1d]"
            style={{ fontSize: "clamp(2rem, 4.8vw, 56px)", lineHeight: 1.05 }}
          >
            Let&apos;s make it
          </h2>
        </div>

        {/* ── "Outstanding" — z-1, BEHIND blob circles, scrolls naturally */}
        {/*    opacity:0 → 1 after it clears the blob circles              */}
        <div
          ref={outstandingRef}
          className="pointer-events-none absolute inset-x-0 text-center"
          style={{ top: "126vh", zIndex: 1, opacity: 0 }}
        >
          {/* inline-block so the gradient spans the text width, not the viewport */}
          <h2
            className="hero-heading font-medium"
            style={{
              display: "inline-block",
              fontSize: "clamp(2rem, 4.8vw, 56px)",
              lineHeight: 1.15,
              background:
                "linear-gradient(85deg,#3b64c1,#e03181 34%,#f58235 72%,#ffda07)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Outstanding
          </h2>
          {/* invisible placeholder — intentionally removed stroke duplicate that was clashing */}
          <h2
            aria-hidden="true"
            className="hero-heading pointer-events-none absolute inset-0 text-center font-medium"
            style={{
              fontSize: "clamp(2rem, 4.8vw, 56px)",
              lineHeight: 1.15,
              WebkitTextStroke: "1px rgba(29,29,31,0.25)",
              WebkitTextFillColor: "transparent",
            }}
          >
            Outstanding
          </h2>
        </div>
      </div>
    </>
  );
}
