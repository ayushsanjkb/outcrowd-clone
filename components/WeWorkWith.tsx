import Image from 'next/image'

const ROW1 = [
  { src: '/automera.webp', alt: 'Automera branding', w: 540, h: 390 },
  { src: '/veni.webp', alt: 'Veni branding', w: 400, h: 609 },
  { src: '/aqua-essence.webp', alt: 'Aqua Essence branding', w: 540, h: 668 },
]

const ROW2 = [
  { src: '/bona.webp', alt: 'Bona branding', w: 540, h: 390 },
  { src: '/motion-music.webp', alt: 'Motion Music branding', w: 800, h: 578 },
  { src: '/dotcal.webp', alt: 'DotCal branding', w: 440, h: 668 },
]

const ROW3 = [
  { src: '/big-data-mobile.webp', alt: 'Big Data mobile', w: 250, h: 300 },
  { src: '/derr.webp', alt: 'Derr branding', w: 1107, h: 751 },
  { src: '/laptop-pills.webp', alt: 'Laptop pills design', w: 540, h: 390 },
]

export default function WeWorkWith() {
  return (
    <section className="overflow-hidden bg-[#f5f5f7] px-6 py-24">
      <div className="mx-auto max-w-[1100px]">
        <h2
          className="mb-16 font-medium text-[#1d1d1d]"
          style={{ fontSize: 'clamp(2.5rem, 4.4vw, 64px)', maxWidth: '600px' }}
        >
          We work with all kinds of clients
        </h2>

        {/* Row 1 */}
        <div className="mb-5 flex items-end gap-5">
          {ROW1.map(({ src, alt, w, h }) => (
            <div key={src} className="relative flex-1 overflow-hidden rounded-2xl shadow-sm">
              <Image src={src} alt={alt} width={w} height={h} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="mb-5 flex items-start gap-5">
          {ROW2.map(({ src, alt, w, h }) => (
            <div key={src} className="relative flex-1 overflow-hidden rounded-2xl shadow-sm">
              <Image src={src} alt={alt} width={w} height={h} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex items-center gap-5">
          {ROW3.map(({ src, alt, w, h }) => (
            <div key={src} className={`relative overflow-hidden rounded-2xl shadow-sm ${src.includes('derr') ? 'flex-[2]' : 'flex-1'}`}>
              <Image src={src} alt={alt} width={w} height={h} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
