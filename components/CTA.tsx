import Image from 'next/image'
import Link from 'next/link'

export default function CTA() {
  return (
    <section data-nav-dark className="bg-[#080808] px-6 pb-12 pt-4" id="contact">
      <div className="mx-auto max-w-[1100px]">
        <div className="relative overflow-hidden rounded-3xl bg-[#101010] px-12 py-16">
          <div className="flex items-start justify-between gap-8">
            {/* Left */}
            <div className="flex max-w-[520px] flex-col">
              <h2
                className="font-medium text-white"
                style={{ fontSize: 'clamp(3rem, 7.8vw, 112px)', lineHeight: '1' }}
              >
                Innovate
                <br />
                with us
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-[#737373]">
                Our creative solutions have helped clients raise $100+ mln and expand their reach.
              </p>
              <div className="mt-10 flex gap-4">
                <Link
                  href="mailto:hello@outcrowd.io"
                  className="flex items-center gap-2 rounded-full bg-[#f05a28] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#d94e20]"
                >
                  Write us
                </Link>
                <button className="flex items-center gap-2 rounded-full bg-[#404040] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#4a4a4a]">
                  Book a call
                </button>
              </div>
            </div>

            {/* Right — dashboard image */}
            <div className="hidden flex-1 lg:block">
              <Image
                src="/statistics-dashboard.svg"
                alt="Dashboard analytics"
                width={480}
                height={340}
                className="w-full"
              />
            </div>
          </div>

          {/* Radial glow */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
