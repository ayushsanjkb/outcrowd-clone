'use client'

import Link from 'next/link'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const NAV_COLS = [
  {
    header: { label: 'Cases', href: '#cases' },
    links: [
      { label: 'Fitonist',     href: '#' },
      { label: 'Brainforest',  href: '#' },
      { label: 'Cybervergent', href: '#' },
      { label: 'Nopan',        href: '#' },
      { label: 'Ramos',        href: '#' },
    ],
  },
  {
    header: { label: 'Services', href: '#service' },
    links: [
      { label: 'Complex solution', href: '#' },
      { label: 'Branding',         href: '#' },
      { label: 'Design',           href: '#' },
      { label: 'Development',      href: '#' },
    ],
  },
  {
    header: { label: 'About us', href: '#about' },
    links: [
      { label: 'Numbers', href: '#' },
      { label: 'Mission', href: '#' },
      { label: 'Values',  href: '#' },
      { label: 'Clients', href: '#' },
    ],
  },
]

const SOCIALS = [
  { href: 'https://dribbble.com/outcrowd',                                      icon: '/behance.svg',   label: 'Dribbble'  },
  { href: 'https://www.behance.net/outcrowd',                                   icon: '/behance.svg',   label: 'Behance'   },
  { href: 'https://www.instagram.com/outcrowdstudio/',                           icon: '/insta.svg',     label: 'Instagram' },
  { href: 'https://x.com/outcrowdstudio',                                        icon: '/twitter.svg',   label: 'Twitter'   },
  { href: 'https://www.linkedin.com/company/outcrowd-network/',                  icon: '/linkedin.svg',  label: 'LinkedIn'  },
]

function RollLink({
  href, label, color, hoverColor,
}: {
  href: string; label: string; color: string; hoverColor: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.set(el.querySelectorAll('span')[1], { rotationX: -60 })
  }, [])

  const onEnter = () => {
    const el = ref.current
    if (!el) return
    const [s1, s2] = el.querySelectorAll<HTMLElement>('span')
    gsap.to(s1, { y: '-110%', rotationX: 60, opacity: 0, color: hoverColor, duration: 0.75, ease: 'power4.inOut', overwrite: true })
    gsap.to(s2, { y: '-100%', rotationX: 0, color: hoverColor, duration: 0.75, ease: 'power4.inOut', overwrite: true })
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    const [s1, s2] = el.querySelectorAll<HTMLElement>('span')
    gsap.to(s1, { y: '0%', rotationX: 0, opacity: 1, color, duration: 0.75, ease: 'power4.inOut', overwrite: true })
    gsap.to(s2, { y: '0%', rotationX: -60, color, duration: 0.75, ease: 'power4.inOut', overwrite: true })
  }

  return (
    <Link
      ref={ref}
      href={href}
      className="relative block overflow-hidden text-[15px] font-medium"
      style={{ height: '1.25em', color, perspective: '700px' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className="block">{label}</span>
      <span className="absolute left-0 top-full block">{label}</span>
    </Link>
  )
}

export default function Footer() {
  return (
    <footer data-nav-dark className="bg-[#080808] px-6 pb-10 pt-16">
      <div className="mx-auto max-w-[1100px]">

        {/* Main — nav columns + email/socials */}
        <div className="flex flex-col gap-12 border-b border-[#1e1e1e] pb-12 md:flex-row md:justify-between">

          {/* Nav columns */}
          <div className="flex gap-16 lg:gap-24">
            {NAV_COLS.map(({ header, links }) => (
              <div key={header.label} className="flex flex-col gap-4">
                <RollLink href={header.href} label={header.label} color="#ffffff" hoverColor="#e0e0e0" />
                <div className="flex flex-col gap-3 mt-1">
                  {links.map(({ label, href }) => (
                    <RollLink key={label} href={href} label={label} color="#737373" hoverColor="#ffffff" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Email + socials */}
          <div className="flex flex-col justify-between gap-8">
            <RollLink
              href="mailto:hello@outcrowd.io"
              label="hello@outcrowd.io"
              color="#737373"
              hoverColor="#ffffff"
              dir={1}
            />

            <div className="flex items-center gap-3">
              {SOCIALS.map(({ href, icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#1a1a1a] transition-colors duration-300 hover:bg-[#2a2a2a]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={icon} alt={label} width={15} height={15} className="relative z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between pt-8">
          <p className="text-[13px] text-[#555]">Copyright © 2025 Outcrowd Inc. All rights reserved.</p>
          <p className="text-[13px] text-[#555]">Lewes — USA</p>
        </div>

      </div>
    </footer>
  )
}
