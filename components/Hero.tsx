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
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function Hero() {
  const blobRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const outstandingRef = useRef<HTMLDivElement>(null);
  const outstandingDarkRef = useRef<HTMLDivElement>(null);

  // Refs to dynamically track exactly where the tablet image permanently rests on the screen
  const desktopTabletRef = useRef<HTMLDivElement>(null);
  const mobileTabletRef = useRef<HTMLDivElement>(null);

  // Cache landing position once blob has fully landed — prevents detachment after sticky exits
  const cachedTyAtTablet = useRef<number | null>(null);
  const cachedTargetScale = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const isMobile = vw < 768;

      // Use the actual rendered sticky height (offsetHeight) instead of window.innerHeight
      // so that CSS top:50% and JS calculations stay in sync on mobile (100svh ≠ innerHeight).
      const stickyH = blobRef.current?.parentElement?.offsetHeight ?? vh;

      // Mobile compresses all animation phases to fit within ~1.7×svh
      // (reference hero is 300svh with 90svh sticky, animation done by ~1.4×svh)
      const focusEnd    = isMobile ? 0.35 : 1.0;
      const shrinkStart = isMobile ? 0.18 : 0.5;
      const shrinkRange = isMobile ? 0.65 : 2.5;
      const landStart   = isMobile ? 0.83 : 3.0;
      const landRange   = isMobile ? 0.83 : 2.0;
      const brandStart  = isMobile ? 0.95 : 3.0;
      const brandRange  = isMobile ? 1.20 : 2.5; // wider range = slower, more eased tablet rise

      // ── 1. Come to centre ─────────────────────────────────────────
      const focusP = c(scrollY / (vh * focusEnd));
      const focusEt = easeInOut(focusP);
      const blur = 20 * (1 - focusEt);
      const dropOff = stickyH * (isMobile ? 0.05 : 0.3) * (1 - focusEt);

      // ── 2. Shrink from centre ─────────────────────────────────────
      const shrinkP = c((scrollY - vh * shrinkStart) / (vh * shrinkRange));
      const scale1 = 0.85 - shrinkP * 0.67; // 0.85 → 0.18

      // ── 3. Land on tablet ──────────────────────────────────────────
      const landP = c((scrollY - vh * landStart) / (vh * landRange));
      const landEt = easeInOut(landP);

      // Use the static refs to calculate the exact resting position of the tablet logo
      const tabletContainer = isMobile
        ? mobileTabletRef.current
        : desktopTabletRef.current;

      let tyAtTablet = 0;
      let targetScale = 0.145; // Safe fallback scale

      // Reset cache while still in the landing approach so fresh rect is used
      if (landP < 1) {
        cachedTyAtTablet.current = null;
        cachedTargetScale.current = null;
      }

      if (tabletContainer) {
        if (cachedTyAtTablet.current === null) {
          // Active calculation — getBoundingClientRect is valid (sticky still locked)
          const rect = tabletContainer.getBoundingClientRect();
          const tabletColW = rect.width;
          const tabletH = isMobile
            ? tabletColW * (478 / 780)
            : tabletColW * (688 / 511);

          const logoTargetY = rect.top + tabletH * 0.18;
          tyAtTablet = logoTargetY - stickyH * 0.5;

          const baseBlobW = Math.min(vw * 0.75, 1000);
          targetScale = (tabletColW * (isMobile ? 0.10 : 0.145)) / baseBlobW;

          // Lock values the moment landing completes — prevents detachment after sticky exits
          if (landP >= 1) {
            cachedTyAtTablet.current = tyAtTablet;
            cachedTargetScale.current = targetScale;
          }
        } else {
          // Landing done — use locked values so blob stays glued to tablet
          tyAtTablet = cachedTyAtTablet.current;
          targetScale = cachedTargetScale.current!;
        }
      }

      const finalScale = (1 - landEt) * scale1 + landEt * targetScale;
      const finalTY = dropOff + landEt * tyAtTablet;

      // On desktop, the blob was originally tweaked -22px left. On mobile, we keep it perfectly dead center.
      const xOffset = isMobile ? "0px" : "-22px";

      if (blobRef.current) {
        blobRef.current.style.transform = `translateX(calc(-50% + ${xOffset})) translateY(calc(-50% + ${finalTY}px)) scale(${finalScale})`;
        blobRef.current.style.filter = `blur(${blur}px)`;
      }

      // ── 4. "Outstanding" dark→gradient swap — fires exactly when text reaches blob top edge.
      // Mobile: text lives at (stickyH + 44px) in the doc; desktop: (1.46×vh + 60px).
      const blobDomH = Math.min(vw * 0.75, 1000) * (716 / 1061);
      const blobVisualH = blobDomH * finalScale;
      const blobTopInViewport = stickyH * 0.5 + finalTY - blobVisualH / 2;
      const outDocPos = isMobile ? (stickyH + 44) : (1.46 * vh + 60);
      const outstandingViewportY = outDocPos - scrollY;
      const swapDone = outstandingViewportY <= blobTopInViewport;
      if (outstandingDarkRef.current) {
        outstandingDarkRef.current.style.opacity = swapDone ? "0" : "1";
      }
      if (outstandingRef.current) {
        outstandingRef.current.style.opacity = swapDone ? "1" : "0";
      }

      // ── 5. Brand mockup items rise ────────────────────────────────
      if (brandRef.current) {
        const brandP = c((scrollY - vh * brandStart) / (vh * brandRange));
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
    // Trigger once on mount to establish initial layout state
    setTimeout(onScroll, 50);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const item = (i: number, child: React.ReactNode) => (
    <div
      data-brand-item={i}
      style={{
        transform: `translateY(${RISE}px)`,
        opacity: 0,
        willChange: "transform, opacity",
        width: "100%",
      }}
    >
      {child}
    </div>
  );

  return (
    <div className="relative h-[300svh] md:h-[600vh]">
      {/* ── Sticky Timeline Container — no bg, no overflow-hidden (matches reference).
           Outstanding texts scroll naturally behind it at z-[3] (below sticky z=5).
           brandRef keeps its own overflow-hidden to clip rising brand items. ── */}
      <div
        className="sticky top-0 h-[90svh] md:h-[100svh]"
        style={{ zIndex: 5 }}
      >
        {/* Blob — z-[10] sandwiches it between "We make it" and "Outstanding" */}
        <div
          ref={blobRef}
          aria-hidden="true"
          className="pointer-events-none absolute z-[10]"
          style={{
            width: "75vw",
            maxWidth: "1000px",
            minWidth: "min(400px, 75vw)",
            aspectRatio: "1061 / 716",
            top: "50%",
            left: "50%",
            transform:
              "translateX(calc(-50% - 22px)) translateY(calc(-50% + 30vh)) scale(0.85)",
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

        {/* Brand Mockup Grids — rises from below */}
        <div
          ref={brandRef}
          className="absolute inset-0 z-[1] flex items-end justify-center overflow-hidden pb-[5vh] md:pb-[2vw]"
        >
          {/* ── DESKTOP GRID (Hidden on mobile) ── */}
          <div className="hidden md:flex items-end justify-center w-[97vw] max-w-[1440px]">
            <div
              style={{ width: "22.5%", flexShrink: 0 }}
              className="flex flex-col gap-2"
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
            <div
              style={{ width: "9.2%", flexShrink: 0 }}
              className="flex flex-col items-center gap-2 pb-4"
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
            <div
              ref={desktopTabletRef}
              style={{ width: "36.6%", flexShrink: 0 }}
            >
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
            <div
              style={{ width: "19.4%", flexShrink: 0 }}
              className="flex flex-col gap-2"
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

          {/* ── MOBILE TABLET — absolutely placed at 40% of sticky height ──
               This keeps the blob landing at the correct center-ish position
               regardless of how tall the brand items grid is below. */}
          {/* Landscape tablet — centered at 40% of sticky height */}
          <div
            ref={mobileTabletRef}
            className="md:hidden absolute w-[88vw] left-1/2 -translate-x-1/2 z-[6]"
            style={{ top: '40%' }}
          >
            {item(
              5,
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc03db164920f9e803f3_desktop.webp"
                alt="Soun tablet app"
                className="w-full rounded-2xl object-cover"
                style={{
                  aspectRatio: '780/478',
                  // boxShadow: '0 32px 64px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.2)',
                }}
              />,
            )}
          </div>

        </div>
      </div>

      {/* ── Fixed Scroll Text Layers ─────────────────── */}

      {/* 1. "Branding & Subtitle" -> Tightly grouped together at the top */}
      <div className="pointer-events-none absolute inset-x-0 top-[30vh] md:top-[20vh] z-[15] flex flex-col items-center gap-1 md:gap-4">
        <h1
          className="hero-heading select-none text-center font-medium leading-none text-[#1d1d1d]"
          style={{ fontSize: "clamp(3.5rem, 16.667vw, 240px)" }}
        >
          Branding
        </h1>
        <p
          className="font-medium leading-tight text-[#1d1d1d]"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.7rem)" }}
        >
          The essence of your business
        </p>
      </div>

      {/* 2. "We make it" — z-[20] (above sticky z=5), scrolls naturally.
           Mobile: at 90svh (= sticky bottom) so it's visible at bottom of viewport at scroll=0.
           Desktop: at 146vh matching reference. */}
      <div
        className="pointer-events-none absolute inset-x-0 flex flex-col items-center justify-center text-center z-[20] top-[90svh] md:top-[146vh]"
      >
        <h2
          className="hero-heading font-medium text-[#1d1d1d]"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 56px)", lineHeight: 1.05 }}
        >
          We make it
        </h2>
      </div>

      {/* 3. "Outstanding" — z-[3] (BELOW sticky z=5), scrolls naturally behind the blob.
           Dark version (opacity:1) is hidden by blob as it scrolls through center.
           At scroll ≈1.35×vh the text emerges above blob top → gradient snaps on.
           Exactly matches reference: heading-42 (dark absolute) + heading-44 (gradient). */}
      <div
        className="pointer-events-none absolute inset-x-0 flex justify-center text-center z-[3] top-[calc(90svh+44px)] md:top-[calc(146vh+60px)]"
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          {/* Dark overlay (like heading-42: position absolute, same bounds) */}
          <h2
            ref={outstandingDarkRef}
            className="hero-heading font-medium text-[#1d1d1d]"
            style={{
              fontSize: "clamp(2.5rem, 6.5vw, 56px)",
              lineHeight: 1.05,
              position: "absolute",
              inset: 0,
              textAlign: "center",
              willChange: "opacity",
            }}
          >
            Outstanding
          </h2>
          {/* Gradient (like heading-44: position relative, sets container size) */}
          <h2
            ref={outstandingRef}
            className="hero-heading font-medium inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#3b64c1] via-[#e03181] to-[#ffda07]"
            style={{
              fontSize: "clamp(2.5rem, 6.5vw, 56px)",
              lineHeight: 1.05,
              opacity: 0,
              willChange: "opacity",
            }}
          >
            Outstanding
          </h2>
        </div>
      </div>

    </div>
  );
}
