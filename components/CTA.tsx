import Image from 'next/image'
import Link from 'next/link'

export default function CTA() {
  return (
    <section data-nav-dark className="bg-[#080808] px-6 pb-12 pt-4" id="contact">
      <div className="mx-auto max-w-[1350px]">
        <div className="relative overflow-hidden rounded-3xl bg-[#101010] px-12 py-16">

          <div className="flex items-center justify-between gap-8">
            {/* Left */}
            <div className="flex max-w-[480px] flex-col">
              <h2
                className="hero-heading font-medium text-white"
                style={{ fontSize: 'clamp(3rem, 7.8vw, 112px)', lineHeight: '1' }}
              >
                Innovate
                <br />
                with us
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-[#737373]">
                Our creative solutions have helped clients raise $100+ mln and expand their reach.
              </p>

              <div className="mt-10 flex gap-4">
                {/* Write us — orange + violet ripple */}
                <Link
                  href="mailto:hello@outcrowd.io"
                  className="group relative overflow-hidden rounded-full bg-[#f05a28] px-7 py-3.5 text-sm font-medium text-white"
                >
                  <span className="relative z-10">Write us</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-[#8a5cff] transition-transform duration-[600ms] group-hover:scale-[36]"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.455,0.03,0.515,0.955)' }}
                  />
                </Link>

                {/* Book a call — violet + violet ripple */}
                <button
                  className="group relative overflow-hidden rounded-full bg-[#8a5cff] px-7 py-3.5 text-sm font-medium text-white"
                >
                  <span className="relative z-10">Book a call</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-[rgba(255,255,255,0.2)] transition-transform duration-[600ms] group-hover:scale-[36]"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.455,0.03,0.515,0.955)' }}
                  />
                </button>
              </div>
            </div>

            {/* Right — dashboard image */}
            <div className="hidden flex-1 lg:block">
              <Image
                src="/statistics-dashboard.svg"
                alt="Dashboard analytics"
                width={520}
                height={360}
                className="w-full"
              />
            </div>
          </div>

          {/* Decorative gradient */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-[480px] w-[480px] opacity-30"
            style={{ background: 'radial-gradient(circle, rgba(138,92,255,0.25) 0%, transparent 70%)' }}
          />
        </div>
      </div>
    </section>
  )
}
