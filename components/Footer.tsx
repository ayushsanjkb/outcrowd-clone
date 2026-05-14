"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const NAV_COLS = [
  {
    header: { label: "Cases", href: "#cases" },
    links: [
      { label: "Fitonist", href: "#" },
      { label: "Brainforest", href: "#" },
      { label: "Cybervergent", href: "#" },
      { label: "Nopan", href: "#" },
      { label: "Ramos", href: "#" },
    ],
  },
  {
    header: { label: "Services", href: "#service" },
    links: [
      { label: "Complex solution", href: "#" },
      { label: "Branding", href: "#" },
      { label: "Design", href: "#" },
      { label: "Development", href: "#" },
    ],
  },
  {
    header: { label: "About us", href: "#about" },
    links: [
      { label: "Numbers", href: "#" },
      { label: "Mission", href: "#" },
      { label: "Values", href: "#" },
      { label: "Clients", href: "#" },
    ],
  },
];

const SOCIALS = [
  {
    href: "https://dribbble.com/outcrowd",
    icon: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66a6043f15171cfef875605c_dribbble-icon%201.svg",
    label: "Dribbble",
  },
  {
    href: "https://www.behance.net/outcrowd",
    icon: "/behance.svg",
    label: "Behance",
  },
  {
    href: "https://www.instagram.com/outcrowdstudio/",
    icon: "/insta.svg",
    label: "Instagram",
  },
  {
    href: "https://x.com/outcrowdstudio",
    icon: "/twitter.svg",
    label: "Twitter",
  },
  {
    href: "https://www.linkedin.com/company/outcrowd-network/",
    icon: "/linkedin.svg",
    label: "LinkedIn",
  },
];

function RollLink({
  href,
  label,
  color,
  hoverColor,
}: {
  href: string;
  label: string;
  color: string;
  hoverColor: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const [s1, s2] = el.querySelectorAll<HTMLElement>("span");
    gsap.set(s1, { transformStyle: "preserve-3d", transformOrigin: "50% 100%" });
    gsap.set(s2, {
      y: "100%",
      rotationX: -90,
      transformOrigin: "50% 0",
      transformStyle: "preserve-3d",
    });
  }, []);

  const onEnter = () => {
    const el = ref.current;
    if (!el) return;
    const [s1, s2] = el.querySelectorAll<HTMLElement>("span");
    gsap.to(s1, {
      y: "-100%",
      rotationX: 90,
      opacity: 0,
      color: hoverColor,
      duration: 0.55,
      ease: "power4.inOut",
      overwrite: true,
    });
    gsap.to(s2, {
      y: "0%",
      rotationX: 0,
      color: hoverColor,
      duration: 0.55,
      ease: "power4.inOut",
      overwrite: true,
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    const [s1, s2] = el.querySelectorAll<HTMLElement>("span");
    gsap.to(s1, {
      y: "0%",
      rotationX: 0,
      opacity: 1,
      color,
      duration: 0.55,
      ease: "power4.inOut",
      overwrite: true,
      willChange: "transform, opacity, color",
    });
    gsap.to(s2, {
      y: "100%",
      rotationX: -90,
      color,
      duration: 0.55,
      ease: "power4.inOut",
      overwrite: true,
      willChange: "transform, color",
    });
  };

  return (
    <Link
      ref={ref}
      href={href}
      className="font-display relative block overflow-hidden text-[14px] font-[500]"
      style={{ height: "1.9em", color, perspective: "700px" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className="block">{label}</span>
      <span className="absolute left-0 top-0 block">{label}</span>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer data-nav-dark className="bg-[#080808] px-8 md:px-16 lg:px-14 pb-10 pt-10">
      <div className="max-w-[1440px] mx-auto">
        {/* Main — email/socials + nav columns */}
        <div className="flex flex-col gap-10 border-b border-[#1e1e1e] pb-12 md:flex-row md:justify-between md:gap-12">
          {/* Email + socials — top on mobile, right on desktop */}
          <div className="order-1 md:order-2 flex flex-col items-start md:items-end gap-5">
            <a
              href="mailto:hello@outcrowd.io"
              className="font-display email-link text-white no-underline"
              style={{
                fontSize: "clamp(1.5rem, 3.2vw, 2.9rem)",
                fontWeight: 500,
                lineHeight: "120%",
              }}
            >
              hello@outcrowd.io
            </a>

            <div className="flex items-center gap-1">
              {SOCIALS.map(({ href, icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-[18px] bg-[#1a1a1a]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={icon}
                    alt={label}
                    width={22}
                    height={22}
                    className="relative z-10 opacity-100 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full transition-transform duration-[600ms] group-hover:scale-[12]"
                    style={{
                      background: "#f05a28",
                      transitionTimingFunction: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Nav columns — wrap on mobile (2+1 rows), row on desktop */}
          <div className="order-2 md:order-1 flex flex-wrap gap-10 md:flex-nowrap md:gap-16 lg:gap-24">
            {NAV_COLS.map(({ header, links }) => (
              <div key={header.label} className="flex flex-col gap-4">
                <RollLink
                  href={header.href}
                  label={header.label}
                  color="#ffffff"
                  hoverColor="#e0e0e0"
                />
                <div className="flex flex-col gap-3 mt-1">
                  {links.map(({ label, href }) => (
                    <RollLink
                      key={label}
                      href={href}
                      label={label}
                      color="#737373"
                      hoverColor="#ffffff"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar — stacked on mobile, row on desktop */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-8 gap-1">
          <p className="font-display text-[13px] md:text-[16px] text-[#A3A3A3] font-[500]">
            Copyright © 2025 Outcrowd Inc. All rights reserved.
          </p>
          <p className="font-display text-[13px] md:text-[16px] text-[#A3A3A3] font-[500]">Lewes — USA</p>
        </div>
      </div>
    </footer>
  );
}
