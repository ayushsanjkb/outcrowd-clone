import Image from 'next/image'

const REASONS = [
  {
    icon: 'https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbfbc024a182742b77a4_1.svg',
    title: 'Business-centered approach',
    desc: 'Everything we do is geared toward your strategic goals. Essentially, our designs are an effective way to make your business successful.',
  },
  {
    icon: 'https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbffc024a182742b7a57_2.2.svg',
    title: 'Strong marketing tools',
    desc: 'Marketing and design are inextricably linked. We know just how to make them complement each other.',
  },
  {
    icon: 'https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6db97457ca1387352d0a4_3.svg',
    title: 'Close communication',
    desc: 'We have found that keeping in touch with our clients accounts for 60% of a given project\'s success.',
  },
  {
    icon: 'https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6db97457ca1387352d0b3_4.4.svg',
    title: 'Meeting the deadlines',
    desc: "We hate falling behind on a project just as much as our clients. That's why we never do it.",
  },
  {
    icon: 'https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbfbc024a182742b775e_5.5.svg',
    title: 'Future-proof results',
    desc: "Fads are fine, but some things are timeless. We make every effort to stay on the cutting edge of design.",
  },
  {
    icon: 'https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbfbc024a182742b77a0_6.svg',
    title: 'Exceeding Expectations',
    desc: "You know why we really care about your success? Because it motivates us like nothing else! So it's a win-win situation.",
  },
]

export default function WhyUs() {
  return (
    <section className="bg-[#fbfbfd] px-6 py-20 max-md:px-5 max-md:pt-[72px] max-md:pb-[160px]">
      <div className="mx-auto max-w-[1000px]">
        <h3
          className="hero-heading text-center md:text-left reveal-item mb-16 font-medium text-[#1d1d1d]"
          style={{ fontSize: 'clamp(2rem, 4.6vw, 64px)' }}
        >
          Why us?
        </h3>

        <div className="reveal-group grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 md:gap-x-[110px] md:gap-y-[76px] lg:grid-cols-3">
          {REASONS.map(({ icon, title, desc }) => (
            <div key={title} className="reveal-item max-md:flex max-md:flex-col max-md:items-center max-md:text-center">
              <div className="mb-5 flex h-[102px] w-[102px] md:h-[80px] md:w-[80px] items-center justify-center rounded-xl overflow-hidden">
                <Image src={icon} alt={title} width={80} height={80} className="object-contain w-full h-full" />
              </div>
              <h3 className="mb-3 text-[17px] md:text-[27px] font-semibold tracking-tight text-[#1d1d1d] font-display leading-tight md:mt-10">{title}</h3>
              <p className="text-[17px] leading-tight tracking-tight text-[#86868B] font-display font-[500] md:max-w-2xl">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
