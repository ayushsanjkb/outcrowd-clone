# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # run ESLint
```

No test suite is configured.

## Stack

- **Next.js 16.2.4** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS v4** — configured via `@import "tailwindcss"` in `globals.css`, no `tailwind.config` file
- **GSAP 3** for animations (imported per-component where needed)
- **Lenis** for smooth scrolling (initialized once in `SmoothScroll`)
- Single-page app: all sections render in `app/page.tsx` as a vertical stack

## Architecture

### Scroll system
`SmoothScroll` (`components/SmoothScroll.tsx`) wraps the entire app in `layout.tsx`. It runs two global systems:
1. **Lenis** smooth-scroll RAF loop
2. **IntersectionObserver** scroll-reveal: any element with class `reveal-item` fades/slides in when entering the viewport; `reveal-group` staggers children with CSS `transition-delay`

### Hero scroll animation
`Hero.tsx` is a `900vh` tall section with a sticky inner panel. A single `scroll` event handler drives four layered animations keyed to scroll progress (expressed as multiples of `vh`): blob unblur → blob shrink → blob lands on tablet position → brand mockup items rise. The timing config lives in `BRAND_CFG` at the top of the file.

### Navbar theme switching
`Navbar.tsx` watches sections tagged `data-nav-dark` via `IntersectionObserver`. When a dark section intersects, the pill navbar switches to dark colors (no re-renders from a global theme store — purely local state).

### Fonts
Two Google fonts loaded in `layout.tsx` via `next/font/google`:
- `Syne` → CSS variable `--font-display`, Tailwind class `font-display`, and `.hero-heading` in CSS
- `Poppins` → CSS variable `--font-body`, default `font-sans`

### Responsive font sizing
Between 992 px and 1919 px, `html` font-size is `1vw` (set in `globals.css`), making `rem` units viewport-relative. Below 992 px, it falls back to `1rem`. Most text uses `clamp()` for additional control.

### CSS utilities (globals.css)
- `.nav-roll` — text-roll hover effect for nav links (two stacked spans)
- `.btn-ripple` + `.btn-ripple-orange/light/dark` — radial ripple on hover via `::after` pseudo-element
- `.reveal-item` / `.reveal-group` — scroll-reveal system described above
