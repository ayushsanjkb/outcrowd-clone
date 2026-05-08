import Image from 'next/image'

interface Item { src: string; alt: string; w: number; h: number }

const ROW1: Item[] = [
  { src: '/automera.webp',        alt: 'Automera branding',      w: 540,  h: 390  },
  { src: '/veni.webp',            alt: 'Veni branding',          w: 400,  h: 609  },
  { src: '/aqua-essence.webp',    alt: 'Aqua Essence branding',  w: 540,  h: 668  },
  { src: '/bona.webp',            alt: 'Bona branding',          w: 540,  h: 390  },
]

const ROW2: Item[] = [
  { src: '/motion-music.webp',    alt: 'Motion Music branding',  w: 800,  h: 578  },
  { src: '/dotcal.webp',         alt: 'DotCal branding',         w: 440,  h: 668  },
  { src: '/big-data-mobile.webp', alt: 'Big Data mobile',        w: 250,  h: 300  },
  { src: '/derr.webp',            alt: 'Derr branding',          w: 1107, h: 751  },
]

const ROW3: Item[] = [
  { src: '/laptop-pills.webp',   alt: 'Laptop pills design',     w: 540,  h: 390  },
  { src: '/soun-example.webp',   alt: 'Soun design',             w: 1960, h: 686  },
  { src: '/speaker-ticket.webp', alt: 'Speaker ticket design',   w: 646,  h: 600  },
  { src: '/visa-apply.webp',     alt: 'Visa apply design',       w: 646,  h: 1041 },
]

/* 8 images for the mobile 2-col grid — even count keeps all rows balanced */
const MOBILE_GRID: Item[] = [
  { src: '/automera.webp',      alt: 'Automera branding',     w: 540,  h: 390 },
  { src: '/veni.webp',          alt: 'Veni branding',         w: 400,  h: 609 },
  { src: '/aqua-essence.webp',  alt: 'Aqua Essence branding', w: 540,  h: 668 },
  { src: '/bona.webp',          alt: 'Bona branding',         w: 540,  h: 390 },
  { src: '/motion-music.webp',  alt: 'Motion Music branding', w: 800,  h: 578 },
  { src: '/dotcal.webp',        alt: 'DotCal branding',       w: 440,  h: 668 },
  { src: '/derr.webp',          alt: 'Derr branding',         w: 1107, h: 751 },
  { src: '/laptop-pills.webp',  alt: 'Laptop pills design',   w: 540,  h: 390 },
]

function MarqueeRow({
  items,
  reverse,
  duration,
}: {
  items: Item[]
  reverse?: boolean
  duration: string
}) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden">
      <div
        className={`marquee-track ${reverse ? 'marquee-track--right' : 'marquee-track--left'}`}
        style={{ animationDuration: duration }}
      >
        {doubled.map(({ src, alt, w, h }, i) => (
          <div
            key={`${src}-${i}`}
            className="marquee-card relative flex-none overflow-hidden rounded-2xl"
            style={{ aspectRatio: `${w} / ${h}` }}
          >
            <Image src={src} alt={alt} width={w} height={h} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function WeWorkWith() {
  return (
    <section className="overflow-hidden bg-[#f5f5f7] py-[72px] md:py-[80px] lg:py-[120px]">

      {/* Heading — max-width + padding match Outcrowd .div-block-265 + .container-3 */}
      <div className="mx-auto max-w-[980px] px-5 md:px-[30px] lg:px-[50px]">
        <h2
          className="hero-heading reveal-item font-medium text-[#1d1d1f]"
          style={{
            fontSize: 'clamp(32px, 4.4vw, 64px)',
            lineHeight: 'clamp(40px, 4.6vw, 64px)',
            maxWidth: '13ch',
          }}
        >
          We work with all kinds of clients
        </h2>
      </div>

      {/* ── Mobile: staggered 2-col layout matching Outcrowd reference ── */}
      <div className="mt-8 px-4 md:hidden">
        {/* Row 1 */}
        <div className="mb-3 grid grid-cols-[3fr_2fr] gap-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/automera.webp"     alt="Automera branding"    fill sizes="55vw" className="object-cover" />
          </div>
          <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '2/3', marginTop: '40px' }}>
            <Image src="/veni.webp"         alt="Veni branding"        fill sizes="40vw" className="object-cover" />
          </div>
        </div>
        {/* Row 2 */}
        <div className="mb-3 grid grid-cols-[2fr_3fr] gap-3">
          <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '2/3', marginBottom: '32px' }}>
            <Image src="/aqua-essence.webp" alt="Aqua Essence branding" fill sizes="40vw" className="object-cover" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/bona.webp"         alt="Bona branding"        fill sizes="55vw" className="object-cover" />
          </div>
        </div>
        {/* Row 3 */}
        <div className="grid grid-cols-[3fr_2fr] gap-3">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image src="/derr.webp"         alt="Derr branding"        fill sizes="55vw" className="object-cover" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl" style={{ marginTop: '24px' }}>
            <Image src="/motion-music.webp" alt="Motion Music"         fill sizes="40vw" className="object-cover" />
          </div>
        </div>
      </div>

      {/* ── Desktop: 3-row infinite marquee (hidden below md) ────── */}
      <div className="mt-[60px] hidden flex-col gap-[26px] md:flex lg:mt-[100px] lg:gap-[34px]">
        <MarqueeRow items={ROW1} duration="40s" />
        <MarqueeRow items={ROW2} reverse duration="50s" />
        <MarqueeRow items={ROW3} duration="35s" />
      </div>

    </section>
  )
}
