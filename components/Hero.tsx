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
  
  // Refs to dynamically track exactly where the tablet image permanently rests on the screen
  const desktopTabletRef = useRef<HTMLDivElement>(null);
  const mobileTabletRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const isMobile = vw < 768;

      // ── 1. Come to centre (0 → vh×1) ─────────────────────────────
      const focusP = c(scrollY / (vh * 1.0));
      const focusEt = easeInOut(focusP);
      const blur = 20 * (1 - focusEt);
      const dropOff = vh * 0.3 * (1 - focusEt);

      // ── 2. Shrink from centre (vh×1 → vh×3) ───────────────────────
      const shrinkP = c((scrollY - vh * 1.0) / (vh * 2.0));
      const scale1 = 0.9 - shrinkP * 0.72; // 0.90 → 0.18

      // ── 3. Land on tablet (vh×3 → vh×5) ──────────────────────────
      const landP = c((scrollY - vh * 3.0) / (vh * 2.0));
      const landEt = easeInOut(landP);

      // Use the static refs to calculate the exact resting position of the tablet logo
      const tabletContainer = isMobile ? mobileTabletRef.current : desktopTabletRef.current;
      
      let tyAtTablet = 0;
      let targetScale = 0.145; // Safe fallback scale

      if (tabletContainer) {
        // Because the parent of the grid is `sticky`, its position relative to the screen is constant.
        // This gives us the exact pixel coordinate where the tablet will sit once it finishes sliding up!
        const rect = tabletContainer.getBoundingClientRect();
        const tabletColW = rect.width;
        const tabletH = tabletColW * (688 / 511);
        
        // The Mastercard-style logo is ~18% down from the top of the tablet image
        const logoTargetY = rect.top + (tabletH * 0.18); 
        tyAtTablet = logoTargetY - (vh * 0.5);

        // Dynamically calculate the scale required to perfectly overlay the logo
        const baseBlobW = Math.max(vw * 0.75, 400); 
        targetScale = (tabletColW * 0.145) / baseBlobW; 
      }

      const finalScale = (1 - landEt) * scale1 + landEt * targetScale;
      const finalTY = dropOff + landEt * tyAtTablet;
      
      // On desktop, the blob was originally tweaked -22px left. On mobile, we keep it perfectly dead center.
      const xOffset = isMobile ? "0px" : "-22px";

      if (blobRef.current) {
        blobRef.current.style.transform = `translateX(calc(-50% + ${xOffset})) translateY(calc(-50% + ${finalTY}px)) scale(${finalScale})`;
        blobRef.current.style.filter = `blur(${blur}px)`;
      }

      // ── 4. "Outstanding" gradient fade-in (vh×1.0 → vh×1.25) ─────
      if (outstandingRef.current) {
        const outP = c((scrollY - vh * 1.0) / (vh * 0.25));
        outstandingRef.current.style.opacity = String(easeInOut(outP));
      }

      // ── 5. Brand mockup items rise (vh×3.0 → vh×5.5) ─────────────
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
        width: "100%"
      }}
    >
      {child}
    </div>
  );

  return (
    <div style={{ height: "600vh", position: "relative" }}>
      
      {/* ── Sticky Timeline Container ─────────────────── */}
      <div className="sticky top-0 overflow-hidden bg-white" style={{ height: "100svh", zIndex: 5 }}>
        
        {/* Blob — z-[10] sandwiches it between "We make it" and "Outstanding" */}
        <div
          ref={blobRef}
          aria-hidden="true"
          className="pointer-events-none absolute z-[10]"
          style={{
            width: "75vw",
            maxWidth: "1000px",
            minWidth: "400px",
            aspectRatio: "1061 / 716",
            top: "50%",
            left: "50%",
            transform: "translateX(calc(-50% - 22px)) translateY(calc(-50% + 30vh)) scale(0.9)",
            transformOrigin: "center center",
            filter: "blur(16px)",
            willChange: "transform, filter",
          }}
        >
          <Image src="/hero-bg.webp" alt="" fill priority className="object-contain" />
        </div>

        {/* Brand Mockup Grids — rises from below */}
        <div
          ref={brandRef}
          className="absolute inset-0 z-[1] flex items-end justify-center overflow-hidden pb-[5vh] md:pb-[2vw]"
        >
          {/* ── DESKTOP GRID (Hidden on mobile) ── */}
          <div className="hidden md:flex items-end justify-center w-[97vw] max-w-[1440px]">
            <div style={{ width: "22.5%", flexShrink: 0 }} className="flex flex-col gap-2">
              {item(0, <Image src="/cup.webp" alt="Soun mug" width={314} height={273} className="w-full rounded-2xl object-cover drop-shadow-xl" />)}
              {item(1, <Image src="/motion-music.webp" alt="Banking card" width={314} height={216} className="w-full rounded-2xl object-cover drop-shadow-xl" />)}
              {item(2, <Image src="/visa.webp" alt="Visit card" width={314} height={200} className="w-full rounded-2xl object-cover drop-shadow-xl" />)}
            </div>
            <div style={{ width: "9.2%", flexShrink: 0 }} className="flex flex-col items-center gap-2 pb-4">
              {item(3, <Image src="/soun-pencil.webp" alt="Apple Pencil" width={128} height={512} className="w-full object-contain drop-shadow-lg" />)}
              {item(4, <Image src="/mouse.webp" alt="Mouse" width={128} height={174} className="w-full rounded-xl object-contain drop-shadow-lg" />)}
            </div>
            <div ref={desktopTabletRef} style={{ width: "36.6%", flexShrink: 0 }}>
              {item(5, <Image src="/tablet-soun.webp" alt="Soun tablet app" width={511} height={688} className="w-full rounded-3xl object-cover drop-shadow-2xl" priority />)}
            </div>
            <div style={{ width: "19.4%", flexShrink: 0 }} className="flex flex-col gap-2">
              {item(6, <Image src="/visa-apply.webp" alt="Mobile app" width={271} height={437} className="w-full rounded-2xl object-cover drop-shadow-xl" />)}
              {item(7, <Image src="/speaker-ticket.webp" alt="Speaker badge" width={271} height={252} className="w-full rounded-2xl object-cover drop-shadow-xl" />)}
            </div>
            <div style={{ width: "12.3%", flexShrink: 0 }}>
              {item(8, <Image src="/watchos.webp" alt="Watch OS" width={172} height={690} className="w-full rounded-2xl object-cover drop-shadow-xl" />)}
            </div>
          </div>

          {/* ── MOBILE GRID (Hidden on desktop) ── */}
          <div className="flex md:hidden flex-col items-center justify-end w-[92vw] gap-4">
            
            {/* Tablet & Title */}
            <div ref={mobileTabletRef} className="w-full flex-shrink-0">
              {item(5, 
                <div className="flex flex-col items-center gap-4 w-full">
                  <Image src="/tablet-soun.webp" alt="Soun tablet app" width={511} height={688} className="w-full rounded-[1.25rem] object-cover drop-shadow-2xl" priority />
                  <h3 className="hero-heading font-medium text-[clamp(1.8rem,7.5vw,3rem)] leading-none text-[#1d1d1d] text-center tracking-tight">
                    in every little <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3b64c1] via-[#e03181] to-[#ffda07]">detail</span>
                  </h3>
                </div>
              )}
            </div>
            
            {/* 4-Col Grid of items below the tablet */}
            <div className="flex w-full items-end justify-between gap-1.5 pt-1">
              <div className="w-[30%] flex flex-col gap-1.5">
                {item(0, <Image src="/cup.webp" alt="Soun mug" width={314} height={273} className="w-full rounded-lg object-cover drop-shadow-md" />)}
                {item(1, <Image src="/motion-music.webp" alt="Banking card" width={314} height={216} className="w-full rounded-lg object-cover drop-shadow-md" />)}
                {item(2, <Image src="/visa.webp" alt="Visit card" width={314} height={200} className="w-full rounded-lg object-cover drop-shadow-md" />)}
              </div>
              <div className="w-[12%] flex flex-col items-center gap-1.5 pb-1">
                {item(3, <Image src="/soun-pencil.webp" alt="Apple Pencil" width={128} height={512} className="w-full object-contain drop-shadow-md" />)}
                {item(4, <Image src="/mouse.webp" alt="Mouse" width={128} height={174} className="w-full rounded-md object-contain drop-shadow-md" />)}
              </div>
              <div className="w-[30%] flex flex-col gap-1.5">
                {item(6, <Image src="/visa-apply.webp" alt="Mobile app" width={271} height={437} className="w-full rounded-lg object-cover drop-shadow-md" />)}
                {item(7, <Image src="/speaker-ticket.webp" alt="Speaker badge" width={271} height={252} className="w-full rounded-lg object-cover drop-shadow-md" />)}
              </div>
              <div className="w-[20%] flex flex-col gap-1.5">
                {item(8, <Image src="/watchos.webp" alt="Watch OS" width={172} height={690} className="w-full rounded-lg object-cover drop-shadow-md" />)}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Fixed Scroll Text Layers ─────────────────── */}
      
      {/* 1. "Branding & Subtitle" -> Tightly grouped together at the top */}
      <div className="pointer-events-none absolute inset-x-0 top-[18vh] md:top-[20vh] z-[15] flex flex-col items-center gap-1 md:gap-4">
        <h1 className="hero-heading select-none text-center font-medium leading-none text-[#1d1d1d]" style={{ fontSize: "clamp(3.5rem, 16.667vw, 240px)" }}>
          Branding
        </h1>
        <p className="font-medium leading-tight text-[#1d1d1d]" style={{ fontSize: "clamp(1rem, 2.5vw, 1.7rem)" }}>
          The essence of your business
        </p>
      </div>

      {/* 2. "We make it" -> z-[20] (Scrolls UP over the blob and centers on screen at 100vh scroll) */}
      <div className="pointer-events-none absolute inset-x-0 flex flex-col items-center justify-center text-center z-[20]" style={{ top: "146vh" }}>
        <h2 className="hero-heading font-medium text-[#1d1d1d]" style={{ fontSize: "clamp(2.5rem, 6.5vw, 56px)", lineHeight: 1.05 }}>
          We make it
        </h2>
      </div>

      {/* 3. "Outstanding" -> z-[5] (Scrolls UP behind the blob, fades in to colorful gradient) */}
      <div ref={outstandingRef} className="pointer-events-none absolute inset-x-0 flex flex-col items-center justify-center text-center z-[5]" style={{ top: "152vh", opacity: 0 }}>
        <h2 className="hero-heading font-medium inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#3b64c1] via-[#e03181] to-[#ffda07]" style={{ fontSize: "clamp(2.5rem, 6.5vw, 56px)", lineHeight: 1.15 }}>
          Outstanding
        </h2>
      </div>

    </div>
  );
}