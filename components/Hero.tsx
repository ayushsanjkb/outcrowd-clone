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
      const progress = Math.min(scrollY / (vh * 6), 1)
      const targetScale = 40 / Math.max(vw, vh)
      const scale = 1 - progress * (1 - targetScale)
      const blur = 25.8465 * (1 - progress)
      blobRef.current.style.transform = `translateX(calc(-50% - 22px)) scale(${scale})`
      blobRef.current.style.filter = `blur(${blur}px)`
      // Fade out blob once past the hero + WeMakeIt sections (2 viewports)
      const fadeStart = vh * 1.8
      const fadeEnd = vh * 2.5
      const opacity = scrollY < fadeStart ? 1 : Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart))
      blobRef.current.style.opacity = String(opacity)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/*
        Blob: fixed, displayed at natural proportions (1061×716px → ~73.6vw wide).
        Centered horizontally with the reference's -22px leftward offset.
        Top at ~34.5vh — matches reference where blob sits below the heading text.
        Transparent bg of the image lets the white page show around the circles.
      */}
      <div
        ref={blobRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-0"
        style={{
          width: '80vw',
          aspectRatio: '1061 / 716',
          top: '22vh',
          left: '50%',
          transform: 'translateX(calc(-50% - 22px)) scale(1)',
          transformOrigin: 'center center',
          filter: 'blur(25.8465px)',
          willChange: 'transform, filter',
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

      {/* Hero section — transparent so blob shows through */}
      <section className="relative min-h-svh overflow-x-hidden">
        <h1
          className="relative z-[1] select-none text-center font-medium leading-none text-[#1d1d1d]"
          style={{
            fontSize: 'clamp(2.5rem, 9.6vw, 140px)',
            paddingTop: 'clamp(3rem, 20vh, 8rem)',
          }}
        >
          {HEADING}
        </h1>

        <p
          className="relative z-[1] text-center text-[#4a4a4a]"
          style={{
            fontSize: 'clamp(0.85rem, 1.5vw, 1.4rem)',
            marginTop: 'clamp(1rem, 3vw, 2rem)',
          }}
        >
          {SUBTITLE}
        </p>
      </section>
    </>
  )
}
