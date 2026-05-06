import Image from 'next/image'

const MOCKUPS = [
  { src: '/visa.webp', alt: 'Visa card branding', w: 280, h: 175, offset: '-translate-y-8' },
  { src: '/soun-pencil.webp', alt: 'Brand pencil', w: 100, h: 320, offset: 'translate-y-4' },
  { src: '/soun-example.webp', alt: 'Soun app mockup', w: 280, h: 560, offset: '-translate-y-12' },
  { src: '/speaker-ticket.webp', alt: 'Speaker badge', w: 200, h: 240, offset: 'translate-y-8' },
  { src: '/watchos.webp', alt: 'Watch OS branding', w: 180, h: 200, offset: '-translate-y-4' },
]

export default function BrandSystem() {
  return (
    <>
      {/* Floating mockups section */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="mx-auto flex max-w-[1100px] items-center justify-center gap-6 px-6">
          {MOCKUPS.map((m) => (
            <div key={m.src} className={`shrink-0 transform ${m.offset} drop-shadow-xl`}>
              <Image
                src={m.src}
                alt={m.alt}
                width={m.w}
                height={m.h}
                className="rounded-2xl object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* "A brand system equals higher value" */}
      <section className="bg-white px-6 pb-24 pt-12 text-center">
        <div className="mx-auto max-w-[700px]">
          <h2
            className="font-medium text-[#1d1d1d]"
            style={{ fontSize: 'clamp(2rem, 3.9vw, 56px)', lineHeight: '1.1' }}
          >
            A brand system equals higher value
          </h2>
          <p
            className="mx-auto mt-6 text-center text-[#737373]"
            style={{ fontSize: 'clamp(0.9rem, 1.1vw, 16px)', maxWidth: '520px', lineHeight: '1.7' }}
          >
            A brand system is something every business needs. Trust us, we&apos;ve seen what branding can do. It&apos;s the best way to impress your customers and paint the right image.
          </p>
        </div>
      </section>
    </>
  )
}
