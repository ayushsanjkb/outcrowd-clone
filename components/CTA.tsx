import Image from 'next/image'
import Link from 'next/link'

export default function CTA() {
  return (
    <section
      data-nav-dark
      className="bg-[#080808] px-4 md:px-8 pb-4"
      id="contact"
    >
      <div className="mx-auto max-w-[1350px]">
        <div
          className="relative overflow-hidden flex flex-col lg:flex-row lg:items-start lg:justify-between"
          style={{
            zIndex: 3,
            backgroundColor: '#101010',
            backgroundImage:
              'url("https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66b371a597474618710d0c03_Group.svg"), url("https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66b9f592b7ac617f6fb0e755_Ellipse%20119%20(1).svg")',
            backgroundPosition: '75% 50%, 100% 50%',
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundSize: 'cover, contain',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1.885rem',
            gap: '2vw',
          }}
        >
          {/* Left content */}
          <div
            className="flex flex-col px-5 pt-8 pb-0 lg:pb-[clamp(1.5rem,2.22vw,2.22rem)] lg:pl-[clamp(2rem,4.17vw,4.17rem)] lg:pr-0 lg:pt-[clamp(3rem,6.43vw,6.43rem)]"
            style={{ flexShrink: 0, width: '100%', maxWidth: 'min(100%, 476px)' }}
          >
            <h2
              className="hero-heading font-medium text-white"
              style={{ fontSize: 'clamp(50px, 7.8vw, 112px)', lineHeight: '1' }}
            >
              Innovate
              <br />
              with us
            </h2>

            <p
              className="font-display text-[#737373]"
              style={{ fontSize: 'clamp(14px, 1.1vw, 18px)', lineHeight: '1.65', marginTop: '1rem', maxWidth: '340px' }}
            >
              Our creative solutions have helped clients raise $100+ mln and expand their reach.
            </p>

            {/* Buttons */}
            <div
              className="flex flex-col gap-3 mt-8 lg:flex-row"
              style={{ marginTop: 'clamp(28px, 9.4vw, 135px)' }}
            >
              {/* Write us */}
              <Link
                href="mailto:hello@outcrowd.io"
                className="group relative overflow-hidden flex items-center justify-center w-full lg:w-auto lg:flex-none"
                style={{ borderRadius: '1.111rem', padding: 'clamp(14px, 2.05vw, 2.05rem) clamp(20px, 3.8vw, 3.8rem)' }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute"
                  style={{ inset: '2px 1px 1px', borderRadius: '1.111rem', background: '#fe4a23', zIndex: 0 }}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-[#8a5cff] transition-transform duration-[600ms] group-hover:scale-[40]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.455,0.03,0.515,0.955)', zIndex: 1 }}
                />
                <span
                  className="font-display relative text-white font-medium whitespace-nowrap"
                  style={{ fontSize: 'clamp(15px, 1.5vw, 1.5rem)', zIndex: 10 }}
                >
                  Write us
                </span>
              </Link>

              {/* Book a call */}
              <button
                className="group relative overflow-hidden flex items-center justify-center w-full lg:w-auto lg:flex-none"
                style={{ borderRadius: '1.111rem', background: '#2a2a2a', padding: 'clamp(14px, 2.05vw, 2.05rem) clamp(20px, 3.8vw, 3.8rem)' }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute"
                  style={{ inset: '2px 1px 1px', borderRadius: '1.111rem', background: '#404040', zIndex: 0 }}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full transition-transform duration-[600ms] group-hover:scale-[40]"
                  style={{ background: '#8a5cff', transitionTimingFunction: 'cubic-bezier(0.455,0.03,0.515,0.955)', zIndex: 1 }}
                />
                <span
                  className="font-display relative text-white font-medium whitespace-nowrap"
                  style={{ fontSize: 'clamp(15px, 1.5vw, 1.5rem)', zIndex: 10 }}
                >
                  Book a call
                </span>
              </button>
            </div>
          </div>

          {/* Image — below buttons on mobile, flush right on desktop */}
          <div className="mt-6 w-full lg:hidden">
            <Image
              src="/statistics-dashboard.svg"
              alt="Dashboard analytics"
              width={562}
              height={613}
              className="w-full"
              style={{ display: 'block', maxHeight: '320px', objectFit: 'contain', objectPosition: 'right bottom' }}
            />
          </div>

          <div className="hidden lg:flex lg:items-start lg:self-start lg:flex-shrink-0">
            <Image
              src="/statistics-dashboard.svg"
              alt="Dashboard analytics"
              width={562}
              height={613}
              style={{ width: 'clamp(320px, 39vw, 562px)', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
