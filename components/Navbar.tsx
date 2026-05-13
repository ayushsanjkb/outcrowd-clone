"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import Lottie from "lottie-react";

import logoWhite from "@/public/lotties/logo-white.json";
import logoDark from "@/public/lotties/logo-dark.json";

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
      {
        rootMargin: "-64px 0px 0px 0px",
        threshold: 0,
      },
    );

    darkSections.forEach((s) => io.observe(s));

    let lastY = window.scrollY;
    let upDelta = 0;

    const onScroll = () => {
      const y = window.scrollY;

      if (y > lastY) {
        upDelta = 0;

        if (y > 80) {
          setScrolled(true);
        }
      } else {
        upDelta += lastY - y;

        if (upDelta > 60) {
          setScrolled(false);
        }
      }

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
      <header className="fixed left-0 right-0 top-0 z-50">
        {/* Mobile */}
        <div className="flex items-center justify-between px-6 pt-5 md:hidden">
          <OutcrowdLogo dark={dark || menuOpen} />

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className="block h-[1.5px] rounded-full"
              style={{
                background: iconColor,
                width: '20px',
                transform: menuOpen ? 'translateY(3.25px) rotate(45deg)' : 'none',
                transition: 'transform 0.35s cubic-bezier(0.76,0,0.24,1), background 0.3s',
              }}
            />
            <span
              className="block h-[1.5px] rounded-full"
              style={{
                background: iconColor,
                width: menuOpen ? '20px' : '14px',
                transform: menuOpen ? 'translateY(-3.25px) rotate(-45deg)' : 'none',
                transition: 'transform 0.35s cubic-bezier(0.76,0,0.24,1), width 0.35s cubic-bezier(0.76,0,0.24,1), background 0.3s',
              }}
            />
          </button>
        </div>

        {/* Desktop */}
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
            <Link
              href="/"
              aria-label="Home"
              className="shrink-0 pl-2"
            >
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
                    <RollLink
                      href={href}
                      label={label}
                      color={linkColor}
                      hoverColor={hoverColor}
                    />
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
                    dark
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(0,0,0,0.08)"
                  }
                  className={`font-display rounded-lg px-4 py-3 text-sm font-medium ${bookBg}`}
                >
                  Book a call
                </RippleButton>
              </div>

              <RippleButton
                tag="a"
                href="#contact"
                rippleColor="#8a5cff"
                className="font-display rounded-lg bg-[#f05a28] px-5 py-2.5 text-sm font-normal text-white"
              >
                Contact
              </RippleButton>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu — curtain drop from top */}
      <div
        className="fixed inset-0 z-40 flex flex-col bg-[#080808] md:hidden"
        style={{
          clipPath: menuOpen ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
          transition: 'clip-path 0.7s cubic-bezier(0.76, 0, 0.24, 1)',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div className="h-[72px]" />

        <nav className="flex flex-col px-8 mt-4">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-[#1c1c1c] py-5 text-[2.4rem] font-medium leading-tight text-white transition-opacity hover:opacity-60 font-display"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-8 pb-10">
          <div className="border-t border-[#1c1c1c] pt-6">
            <a
              href="mailto:hello@outcrowd.io"
              className="mb-5 block text-sm font-medium text-white font-display"
            >
              hello@outcrowd.io
            </a>

            <div className="mb-8 flex items-center gap-3">
              {SOCIALS.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a1a1a]"
                >
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
              className="block w-full rounded-full bg-[#f05a28] py-4 text-center text-sm font-semibold text-white font-display"
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

    const [s1, s2] = el.querySelectorAll<HTMLElement>("span");

    gsap.set(s1, {
      transformStyle: "preserve-3d",
      transformOrigin: "50% 100%",
    });

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
    });

    gsap.to(s2, {
      y: "100%",
      rotationX: -90,
      color,
      duration: 0.55,
      ease: "power4.inOut",
      overwrite: true,
    });
  };

  return (
    <Link
      ref={ref}
      href={href}
      className="relative block overflow-hidden text-sm font-medium font-display"
      style={{
        height: "1.9em",
        color,
        perspective: "700px",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className="block">{label}</span>

      <span className="absolute left-0 top-0 block">
        {label}
      </span>
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
      <span className="relative z-10">
        {children}
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full transition-transform duration-[600ms] group-hover:scale-[36]"
        style={{
          background: rippleColor,
          transitionTimingFunction:
            "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
        }}
      />
    </>
  );

  const shared = `group relative overflow-hidden ${className}`;

  if (tag === "a" && href) {
    return (
      <Link href={href} className={shared}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={shared}>
      {inner}
    </button>
  );
}

function OutcrowdLogo({ dark }: { dark: boolean }) {
  const darkRef = useRef<any>(null);
  const whiteRef = useRef<any>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;

    if (!wrap) return;

    const play = () => {
      darkRef.current?.stop();
      whiteRef.current?.stop();

      darkRef.current?.play();
      whiteRef.current?.play();
    };

    play();

    wrap.addEventListener("mouseenter", play);

    return () => {
      wrap.removeEventListener("mouseenter", play);
    };
  }, []);

  return (
    <span
      ref={wrapRef}
      className="flex items-center select-none"
    >
      <div className="relative h-[18px] w-[36px] overflow-hidden">
        
        {/* Dark */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            opacity: dark ? 0 : 1,
          }}
        >
          <Lottie
            lottieRef={darkRef}
            animationData={logoDark}
            loop={false}
            autoplay={false}
            className="h-full w-full"
            rendererSettings={{
              preserveAspectRatio: "xMidYMid meet",
            }}
          />
        </div>

        {/* White */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            opacity: dark ? 1 : 0,
          }}
        >
          <Lottie
            lottieRef={whiteRef}
            animationData={logoWhite}
            loop={false}
            autoplay={false}
            className="h-full w-full"
            rendererSettings={{
              preserveAspectRatio: "xMidYMid meet",
            }}
          />
        </div>
      </div>
    </span>
  );
}