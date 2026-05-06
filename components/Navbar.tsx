'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'Cases', href: '#cases' },
  { label: 'Service', href: '#service' },
  { label: 'Blog', href: '#blog' },
  { label: 'About us', href: '#about' },
] as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const darkSections = document.querySelectorAll('[data-nav-dark]')
    let darkIntersecting = 0

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) darkIntersecting++
          else darkIntersecting = Math.max(0, darkIntersecting - 1)
        })
        setDark(darkIntersecting > 0)
      },
      { rootMargin: '-64px 0px 0px 0px', threshold: 0 },
    )
    darkSections.forEach((s) => io.observe(s))

    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const pillBg = dark ? 'bg-[#1a1a1a]' : 'bg-[#fafafa]'
  const linkColor = dark ? 'text-[#737373] hover:text-white' : 'text-[#9c9c9c] hover:text-[#1d1d1d]'
  const bookBg = dark
    ? 'bg-[#2e2e2e] text-white hover:bg-[#3a3a3a]'
    : 'bg-[#ebebeb] text-[#1d1d1d] hover:bg-[#e0e0e0]'

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-6 pt-5">
      <nav
        className={`flex shrink-0 items-center justify-between overflow-hidden rounded-[0.83333rem] transition-colors duration-300 ${pillBg}`}
        style={{ width: '41.25rem', height: '3.47222rem', padding: '0.28rem' }}
      >
        <Link href="/" aria-label="Home" className="shrink-0 pl-2">
          <OutcrowdLogo dark={dark} />
        </Link>

        {!scrolled ? (
          <ul className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className={`text-sm font-medium transition-colors duration-200 ${linkColor}`}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <button
            className={`hidden rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 md:block ${bookBg}`}
          >
            Book a call
          </button>
        )}

        <Link
          href="#contact"
          className="rounded-full bg-[#f05a28] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#d94e20]"
        >
          Contact
        </Link>
      </nav>
    </header>
  )
}

function OutcrowdLogo({ dark }: { dark: boolean }) {
  const fill = dark ? '#ffffff' : '#080808'
  return (
    <span className="flex items-center gap-2">
      <svg width="22" height="22" viewBox="-13 -8 26 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g transform="rotate(-90) scale(0.75)">
          <path
            fill={fill}
            d="M2.943,12.219 C4.681,10.534 4.681,7.802 2.97,6.117 L-0.139,3.073 L-3.276,6.117 C-5.014,7.802 -5.014,10.534 -3.303,12.219 C-1.578,13.891 1.219,13.891 2.943,12.219z
               M-6.367,-3.054 C-9.802,-6.422 -9.788,-11.867 -6.326,-15.235 C-2.919,-18.535 2.538,-18.589 6,-15.411 L9,-12.396 L5.905,-9.287 L2.905,-12.301 C1.181,-13.876 -1.534,-13.835 -3.217,-12.192 C-4.955,-10.508 -4.956,-7.779 -3.245,-6.095 L-0.122,-3.067 L2.973,0.002 L6.082,3.058 C9.517,6.426 9.504,11.871 6.042,15.239 C2.594,18.593 -2.999,18.593 -6.434,15.225 C-9.869,11.857 -9.856,6.412 -6.394,3.044 L-3.258,0.002 L-6.367,-3.054z"
          />
        </g>
      </svg>
    </span>
  )
}
