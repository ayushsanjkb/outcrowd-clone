'use client'

import { useEffect, useRef } from 'react'

const ITEMS = ['Brand Identity', 'Brand Book', 'Logotype', 'Promo Materials']

export default function BrandScrollItems() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight
      itemRefs.current.forEach((el) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const dist = Math.abs(center - vh / 2)
        const opacity = Math.max(0.07, 1 - dist / (vh * 0.55))
        el.style.opacity = String(opacity)
      })
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <section className="bg-white">
      {ITEMS.map((item, i) => (
        <div
          key={item}
          ref={(el) => { itemRefs.current[i] = el }}
          className="flex min-h-svh items-center justify-center"
          style={{ opacity: 0.07 }}
        >
          <h3
            className="text-center font-medium text-[#3b7fc4]"
            style={{ fontSize: 'clamp(2.5rem, 8.3vw, 120px)' }}
          >
            {item}
          </h3>
        </div>
      ))}
    </section>
  )
}
