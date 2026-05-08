"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "Cases", href: "#cases" },
  { label: "Service", href: "#service" },
  { label: "Blog", href: "#blog" },
  { label: "About us", href: "#about" },
] as const;

const SOCIALS = [
  {
    href: "https://dribbble.com/outcrowd",
    icon: "/behance.svg",
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
] as const;

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const darkSections = document.querySelectorAll("[data-nav-dark]");
    let darkIntersecting = 0;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) darkIntersecting++;
          else darkIntersecting = Math.max(0, darkIntersecting - 1);
        });
        setDark(darkIntersecting > 0);
      },
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 },
    );
    darkSections.forEach((s) => io.observe(s));

    let lastY = window.scrollY;
    let upDelta = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY) {
        upDelta = 0;
        if (y > 80) setScrolled(true);
      } else {
        upDelta += lastY - y;
        if (upDelta > 60) setScrolled(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const pillBg = dark ? "bg-[#1a1a1a]" : "bg-[#fafafa]";
  const linkColor = dark ? "#737373" : "#9c9c9c";
  const hoverColor = dark ? "#ffffff" : "#1d1d1d";
  const bookBg = dark
    ? "bg-[#2e2e2e] text-white"
    : "bg-[#ebebeb] text-[#1d1d1d]";
  const iconColor = dark || menuOpen ? "#ffffff" : "#080808";

  return (
    <>
      {/* ── Header bar ─────────────────────────────────────────────── */}
      <header className="fixed left-0 right-0 top-0 z-50">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between px-6 pt-5 md:hidden">
          <OutcrowdLogo dark={dark || menuOpen} />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 flex-col items-end justify-center gap-[5px]"
          >
            {menuOpen ? (
              /* X icon */
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <line
                  x1="2"
                  y1="2"
                  x2="18"
                  y2="18"
                  stroke={iconColor}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <line
                  x1="18"
                  y1="2"
                  x2="2"
                  y2="18"
                  stroke={iconColor}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              /* Hamburger */
              <>
                <span
                  className="block h-[1.5px] w-5 rounded-full"
                  style={{ background: iconColor }}
                />
                <span
                  className="block h-[1.5px] w-4 rounded-full"
                  style={{ background: iconColor }}
                />
              </>
            )}
          </button>
        </div>

        {/* Desktop pill nav */}
        <div className="hidden md:flex justify-center px-4 pt-5">
          <nav
            className={`flex shrink-0 items-center justify-between ${pillBg}`}
            style={{
              width: scrolled ? "20rem" : "41.25rem",
              height: "3.47222rem",
              padding: "0.28rem",
              borderRadius: "0.83333rem",
              transition: `width 0.7s ${EASE}, background-color 0.3s`,
            }}
          >
            <Link href="/" aria-label="Home" className="shrink-0 pl-2">
              <OutcrowdLogo dark={dark} />
            </Link>

            <div
              style={{
                width: scrolled ? "0" : "22rem",
                overflow: "hidden",
                transition: `width 0.7s ${EASE}`,
              }}
            >
              <ul
                className="flex items-center gap-7 whitespace-nowrap"
                style={{
                  opacity: scrolled ? 0 : 1,
                  transform: scrolled ? "scale(0.85)" : "scale(1)",
                  transformOrigin: "right center",
                  transition: `opacity 0.5s ${EASE}, transform 0.5s ${EASE}`,
                  pointerEvents: scrolled ? "none" : "auto",
                }}
              >
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <RollLink href={href} label={label} color={linkColor} hoverColor={hoverColor} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <div
                style={{
                  opacity: scrolled ? 1 : 0,
                  transform: scrolled ? "scale(1)" : "scale(0.7)",
                  transition: `opacity 0.5s ${EASE}, transform 0.5s ${EASE}`,
                  pointerEvents: scrolled ? "auto" : "none",
                  display: scrolled ? "block" : "none",
                }}
              >
                <RippleButton
                  tag="button"
                  rippleColor={
                    dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"
                  }
                  className={`rounded-full px-4 py-2 text-sm font-medium ${bookBg}`}
                >
                  Book a call
                </RippleButton>
              </div>

              <RippleButton
                tag="a"
                href="#contact"
                rippleColor="#8a5cff"
                className="rounded-lg bg-[#f05a28] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Contact
              </RippleButton>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Mobile fullscreen menu ──────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-[#080808] md:hidden transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto transition-opacity ease-in-out duration-150" : "opacity-0 pointer-events-none transition-opacity ease-in-out duration-150 delay-200"}`}
      >
        {/* Spacer for the top bar */}
        <div className="h-[72px]" />

        {/* Nav links */}
        <nav className="flex flex-col px-8 mt-4">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-[#1c1c1c] py-5 text-[2.4rem] font-medium leading-tight text-white transition-opacity hover:opacity-60"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="mt-auto px-8 pb-10">
          <div className="border-t border-[#1c1c1c] pt-6">
            <a
              href="mailto:hello@outcrowd.io"
              className="block text-sm font-medium text-white mb-5"
            >
              hello@outcrowd.io
            </a>
            <div className="flex items-center gap-3 mb-8">
              {SOCIALS.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a1a1a]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={icon}
                    alt={label}
                    width={16}
                    height={16}
                    className="opacity-70"
                  />
                </a>
              ))}
            </div>
            <Link
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="block w-full rounded-full bg-[#f05a28] py-4 text-center text-sm font-semibold text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

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
    // Incoming span starts below, tilted like the bottom face of a cube
    gsap.set(el.querySelectorAll("span")[1], { rotationX: -60 });
  }, []);

  const onEnter = () => {
    const el = ref.current;
    if (!el) return;
    const [s1, s2] = el.querySelectorAll<HTMLElement>("span");
    // Outgoing: rises up and folds away (top tilts backward)
    gsap.to(s1, { y: "-110%", rotationX: 60, opacity: 0, color: hoverColor, duration: 0.75, ease: "power4.inOut", overwrite: true });
    gsap.to(s2, { y: "-100%", rotationX: 0, color: hoverColor, duration: 0.75, ease: "power4.inOut", overwrite: true });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    const [s1, s2] = el.querySelectorAll<HTMLElement>("span");
    gsap.to(s1, { y: "0%", rotationX: 0, opacity: 1, color, duration: 0.75, ease: "power4.inOut", overwrite: true });
    gsap.to(s2, { y: "0%", rotationX: -60, color, duration: 0.75, ease: "power4.inOut", overwrite: true });
  };

  return (
    <Link
      ref={ref}
      href={href}
      className="relative block overflow-hidden text-sm font-medium"
      style={{ height: "1.2em", color, perspective: "700px" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className="block">{label}</span>
      <span className="absolute left-0 top-full block">{label}</span>
    </Link>
  );
}

type RippleProps = {
  tag?: "a" | "button";
  href?: string;
  rippleColor?: string;
  className?: string;
  children: React.ReactNode;
};

function RippleButton({
  tag = "button",
  href,
  rippleColor = "rgba(0,0,0,0.15)",
  className = "",
  children,
}: RippleProps) {
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full transition-transform duration-[600ms] group-hover:scale-[36]"
        style={{
          background: rippleColor,
          transitionTimingFunction: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
        }}
      />
    </>
  );
  const shared = `group relative overflow-hidden ${className}`;
  if (tag === "a" && href)
    return (
      <Link href={href} className={shared}>
        {inner}
      </Link>
    );
  return <button className={shared}>{inner}</button>;
}

const LOGO_PATH =
  "M2.943,12.219 C4.681,10.534 4.681,7.802 2.97,6.117 L-0.139,3.073 L-3.276,6.117 C-5.014,7.802 -5.014,10.534 -3.303,12.219 C-1.578,13.891 1.219,13.891 2.943,12.219z " +
  "M-6.367,-3.054 C-9.802,-6.422 -9.788,-11.867 -6.326,-15.235 C-2.919,-18.535 2.538,-18.589 6,-15.411 L9,-12.396 L5.905,-9.287 L2.905,-12.301 C1.181,-13.876 -1.534,-13.835 -3.217,-12.192 C-4.955,-10.508 -4.956,-7.779 -3.245,-6.095 L-0.122,-3.067 L2.973,0.002 L6.082,3.058 C9.517,6.426 9.504,11.871 6.042,15.239 C2.594,18.593 -2.999,18.593 -6.434,15.225 C-9.869,11.857 -9.856,6.412 -6.394,3.044 L-3.258,0.002 L-6.367,-3.054z";

function OutcrowdLogo({ dark }: { dark: boolean }) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const strokeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = strokeRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap) return;

    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

    let tween: gsap.core.Tween;

    const onEnter = () => {
      tween?.kill();
      tween = gsap.to(path, {
        strokeDashoffset: 0,
        duration: 0.75,
        ease: "power2.inOut",
      });
    };
    const onLeave = () => {
      tween?.kill();
      tween = gsap.to(path, {
        strokeDashoffset: -len,
        duration: 0.55,
        ease: "power2.in",
      });
    };

    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
      tween?.kill();
    };
  }, []);

  const fill = dark ? "#ffffff" : "#080808";

  return (
    <span ref={wrapRef} className="flex items-center gap-2">
      <svg
        width="22"
        height="22"
        viewBox="-13 -8 26 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g transform="rotate(-90) scale(0.75)">
          <path fill={fill} d={LOGO_PATH} />
          <path
            ref={strokeRef}
            fill="none"
            stroke={dark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.95)"}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d={LOGO_PATH}
          />
        </g>
      </svg>
    </span>
  );
}
