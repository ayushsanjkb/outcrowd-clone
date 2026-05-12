'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const ITEMS = [
  { col: 'w-[30%]', items: [
    { src: '/cup.webp',         alt: 'Soun mug',      w: 314, h: 273, cls: 'rounded-lg' },
    { src: '/motion-music.webp',alt: 'Banking card',  w: 314, h: 216, cls: 'rounded-lg' },
    { src: '/visa.webp',        alt: 'Visit card',    w: 314, h: 200, cls: 'rounded-lg' },
  ]},
  { col: 'w-[12%]', items: [
    { src: '/soun-pencil.webp', alt: 'Apple Pencil',  w: 128, h: 512, cls: 'object-contain' },
    { src: '/mouse.webp',       alt: 'Mouse',         w: 128, h: 174, cls: 'rounded-md object-contain' },
  ]},
  { col: 'w-[30%]', items: [
    { src: '/visa-apply.webp',  alt: 'Mobile app',    w: 271, h: 437, cls: 'rounded-lg' },
    { src: '/speaker-ticket.webp', alt: 'Speaker',   w: 271, h: 252, cls: 'rounded-lg' },
  ]},
  { col: 'w-[20%]', items: [
    { src: '/watchos.webp',     alt: 'Watch OS',      w: 172, h: 690, cls: 'rounded-lg' },
  ]},
]

export default function MobileHeroBrand() {
  return (
    <section className="md:hidden bg-white px-[4vw] pt-16 pb-20 overflow-hidden">
      {/* Title */}
      <motion.h3
        className="hero-heading font-medium text-[clamp(1.8rem,7.5vw,3rem)] leading-none text-[#1d1d1d] text-center tracking-tight mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        in every little{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3b64c1] via-[#e03181] to-[#ffda07]">
          detail
        </span>
      </motion.h3>

      {/* Brand items grid — staggered slide-up */}
      <div className="flex w-full items-end justify-between gap-1.5">
        {ITEMS.map(({ col, items }, ci) => (
          <div key={ci} className={`${col} flex flex-col gap-1.5 ${ci === 1 ? 'items-center pb-1' : ''}`}>
            {items.map(({ src, alt, w, h, cls }, ii) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                transition={{
                  duration: 0.7,
                  delay: ci * 0.08 + ii * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Image
                  src={src}
                  alt={alt}
                  width={w}
                  height={h}
                  className={`w-full ${cls} drop-shadow-md`}
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
