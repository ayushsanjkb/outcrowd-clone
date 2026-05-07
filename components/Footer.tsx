'use client'

import Link from 'next/link'

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

/* Text-roll hover — two stacked spans, same as nav links */
function RollLink({ href, label, white = false }: { href: string; label: string; white?: boolean }) {
  const ease = 'cubic-bezier(0.76,0,0.24,1)'
  const color = white ? 'text-white' : 'text-[#737373]'
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden text-[15px] font-medium ${color}`}
      style={{ height: '1.25em' }}
    >
      <span
        className="block group-hover:-translate-y-full"
        style={{ transition: `transform 350ms ${ease}` }}
      >
        {label}
      </span>
      <span
        className="absolute left-0 top-full block group-hover:-translate-y-full"
        style={{ transition: `transform 350ms ${ease}` }}
      >
        {label}
      </span>
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
                {/* Section header — white, bold */}
                <RollLink href={header.href} label={header.label} white />
                {/* Sub-links — gray */}
                <div className="flex flex-col gap-3 mt-1">
                  {links.map(({ label, href }) => (
                    <RollLink key={label} href={href} label={label} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Email + socials */}
          <div className="flex flex-col justify-between gap-8">
            <Link
              href="mailto:hello@outcrowd.io"
              className="text-[15px] font-medium text-[#737373] transition-colors duration-300 hover:text-white"
            >
              hello@outcrowd.io
            </Link>

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
