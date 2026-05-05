'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const HEADING = 'Branding'
const SUBTITLE = 'The essence of your business'

export default function Hero() {
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!blobRef.current) return
      const scrollY = window.scrollY
      const vh = window.innerHeight
      const vw = window.innerWidth
      const targetScale = 40 / Math.max(vw, vh)
      const progress = Math.min(scrollY / (vh * 2), 1)
      const scale = 1 - progress * (1 - targetScale)
      blobRef.current.style.transform = `translate3d(-22px, 0px, 0px) scale(${scale})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Fixed blob at z=0 — sits above the white body bg, below the text (z=1) */}
      <div
        ref={blobRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          willChange: 'transform, filter',
          transform: 'translate3d(-22px, 0px, 0px) scale(1)',
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          filter: 'blur(22.4454px)',
        }}
      >
        <Image
          src="/hero-bg.webp"
          alt=""
          fill
          priority
          className="object-contain object-center"
        />
      </div>

      {/* Hero section — transparent bg so blob shows through */}
      <section className="relative min-h-svh overflow-hidden">
        {/* Heading — z=1 so it paints above the fixed blob */}
        <h1
          className="relative z-[1] select-none whitespace-nowrap text-left font-medium leading-none text-[#1d1d1d]"
          style={{
            fontSize: 'clamp(2.5rem, 18vw, 20rem)',
            paddingTop: 'clamp(5rem, 13vh, 10rem)',
            paddingLeft: 'clamp(1rem, 12vw, 9rem)',
          }}
        >
          {HEADING}
        </h1>

        {/* Subtitle — z=1 sits above blob */}
        <p
          className="relative z-[1] text-center text-[#9c9c9c]"
          style={{
            fontSize: 'clamp(0.9rem, 1.8vw, 1.6rem)',
            marginTop: 'clamp(1rem, 3vw, 2.5rem)',
          }}
        >
          {SUBTITLE}
        </p>
      </section>
    </>
  )
}
