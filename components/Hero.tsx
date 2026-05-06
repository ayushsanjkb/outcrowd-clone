'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const HEADING = 'Branding'
const SUBTITLE = 'The essence of your business'

export default function Hero() {
  const blobRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const weMakeItRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight

      // Phase 1 — unblur (0 → vh×0.5): scale frozen at 1
      const blur = 25.8465 * Math.max(0, 1 - scrollY / (vh * 0.5))

      // Phase 2 — shrink (vh×0.8 → vh×5): blur already gone
      const scaleProgress = Math.max(0, Math.min((scrollY - vh * 0.8) / (vh * 4.2), 1))
      const scale = 1 - scaleProgress * 0.6          // 1 → 0.4
      const blobTranslateY = -scaleProgress * vh * 0.153  // 0 → ~-112px at 731px vh

      if (blobRef.current) {
        blobRef.current.style.transform = `translateX(calc(-50% - 22px)) translateY(${blobTranslateY}px) scale(${scale})`
        blobRef.current.style.filter = `blur(${blur}px)`
      }

      // Hero text — fade out + float up (0 → vh×0.4)
      if (heroTextRef.current) {
        const t = Math.min(scrollY / (vh * 0.4), 1)
        heroTextRef.current.style.opacity = String(1 - t)
        heroTextRef.current.style.transform = `translateY(${-t * 80}px)`
      }

      // WeMakeIt text — fade in (vh×0.25 → vh×0.6), fade out (vh×0.75 → vh×1.0)
      if (weMakeItRef.current) {
        const tIn  = Math.max(0, Math.min((scrollY - vh * 0.25) / (vh * 0.35), 1))
        const tOut = Math.max(0, Math.min((scrollY - vh * 0.75) / (vh * 0.25), 1))
        weMakeItRef.current.style.opacity = String(tIn * (1 - tOut))
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    /* 600vh tall scroll container — gives 5 full viewport-heights of scroll
       before the next real section appears */
    <div style={{ height: '600vh' }}>
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: '100svh' }}
      >
        {/* Blob — absolute inside sticky viewport, unblurs then shrinks */}
        <div
          ref={blobRef}
          aria-hidden="true"
          className="pointer-events-none absolute z-0"
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
          <Image src="/hero-bg.webp" alt="" fill priority className="object-contain" />
        </div>

        {/* Hero text — fades out as WeMakeIt fades in */}
        <div
          ref={heroTextRef}
          className="pointer-events-none absolute inset-x-0 z-[1] text-center"
          style={{ top: 'clamp(2.5rem, 12vh, 7rem)' }}
        >
          <h1
            className="hero-heading select-none font-medium leading-none text-[#1d1d1d]"
            style={{ fontSize: 'clamp(2.5rem, 16.667vw, 240px)' }}
          >
            {HEADING}
          </h1>
          <p
            className="text-[#1d1d1d] opacity-70"
            style={{
              fontSize: 'clamp(0.85rem, 1.5vw, 1.4rem)',
              marginTop: 'clamp(0.75rem, 2.5vw, 1.75rem)',
            }}
          >
            {SUBTITLE}
          </p>
        </div>

        {/* WeMakeIt text — appears at bottom of sticky viewport */}
        <div
          ref={weMakeItRef}
          className="pointer-events-none absolute inset-x-0 z-[1] text-center"
          style={{ bottom: '8vh', opacity: 0 }}
        >
          <h2
            className="hero-heading font-medium text-[#1d1d1d]"
            style={{ fontSize: 'clamp(2rem, 4.8vw, 56px)', lineHeight: '1.05' }}
          >
            Let&apos;s make it
          </h2>

          {/* Layered "Outstanding": gradient fill with stroke overlay */}
          <div className="relative">
            <h2
              className="hero-heading text-center font-medium"
              style={{
                fontSize: 'clamp(2rem, 4.8vw, 56px)',
                lineHeight: '1.15',
                background: 'linear-gradient(85deg, #3B64C1, #E03181 34%, #F58235 72%, #FFDA07)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Outstanding
            </h2>
            <h2
              aria-hidden="true"
              className="hero-heading pointer-events-none absolute inset-0 text-center font-medium"
              style={{
                fontSize: 'clamp(2rem, 4.8vw, 56px)',
                lineHeight: '1.15',
                WebkitTextStroke: '1px rgba(29,29,31,0.25)',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Outstanding
            </h2>
          </div>

          <h3
            className="font-medium text-[#1d1d1d]"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 26px)', marginTop: '0.25rem' }}
          >
            in every little detail
          </h3>
        </div>
      </div>
    </div>
  )
}
