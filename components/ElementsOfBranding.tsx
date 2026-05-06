import Image from 'next/image'

export default function ElementsOfBranding() {
  return (
    <section data-nav-dark className="bg-black px-6 py-24">
      <div className="mx-auto max-w-[1100px]">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h2
            className="font-medium text-white"
            style={{ fontSize: 'clamp(2rem, 4.4vw, 64px)' }}
          >
            Elements of Branding
          </h2>
          <p
            className="mx-auto mt-4 text-center text-[#737373]"
            style={{ fontSize: 'clamp(0.85rem, 1.1vw, 16px)', maxWidth: '620px', lineHeight: '1.7' }}
          >
            The logo encapsulates the idea behind the brand. We know how to make it work for you. Colors add a touch of soul that will resonate better with your customers.
          </p>
        </div>

        {/* Brand example block */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-[#1e1e1e]">
          {/* Section header */}
          <div className="border-b border-[#1e1e1e] px-8 py-5">
            <p className="text-sm font-medium text-white">
              <span className="text-white">Soun</span>{' '}
              <span className="text-[#555]">Example</span>
            </p>
          </div>

          {/* Row 1 — full width brand bar */}
          <div className="border-b border-[#1e1e1e]">
            <Image
              src="/elements.webp"
              alt="Soun brand elements"
              width={1440}
              height={503}
              className="w-full object-cover"
            />
          </div>

          {/* Row 2 — Logo section */}
          <div className="border-b border-[#1e1e1e] px-8 py-5">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[#555]">Logo</p>
            <Image
              src="/soun-logo.webp"
              alt="Soun logo"
              width={1440}
              height={386}
              className="w-full rounded-xl object-cover"
            />
          </div>

          {/* Row 3 — Font + Color */}
          <div className="grid grid-cols-2 border-b border-[#1e1e1e]">
            <div className="border-r border-[#1e1e1e] px-8 py-5">
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[#555]">Font</p>
              <Image
                src="/sans-fonts.webp"
                alt="Google Sans font"
                width={540}
                height={280}
                className="w-full rounded-xl object-cover"
              />
            </div>
            <div className="px-8 py-5">
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[#555]">Color</p>
              <Image
                src="/color-codes.webp"
                alt="Brand colors"
                width={540}
                height={280}
                className="w-full rounded-xl object-cover"
              />
            </div>
          </div>

          {/* Row 4 — Elements row */}
          <div className="px-8 py-5">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[#555]">Elements</p>
            <Image
              src="/soun-example.webp"
              alt="Brand UI elements"
              width={1440}
              height={406}
              className="w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
