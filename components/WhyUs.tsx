import Image from 'next/image'

const REASONS = [
  {
    icon: '/goal.svg',
    title: 'Business-centered approach',
    desc: 'Everything we do is geared toward your strategic goals. Essentially, our designs are an effective way to make your business successful.',
  },
  {
    icon: '/graph.svg',
    title: 'Strong marketing tools',
    desc: 'Marketing and design are inextricably linked. We know just how to make them complement each other.',
  },
  {
    icon: '/convo.svg',
    title: 'Close communication',
    desc: 'We have found that keeping in touch with our clients accounts for 60% of a given project\'s success.',
  },
  {
    icon: '/timer.svg',
    title: 'Meeting the deadlines',
    desc: "We hate falling behind on a project just as much as our clients. That's why we never do it.",
  },
  {
    icon: '/progress.svg',
    title: 'Future-proof results',
    desc: "Fads are fine, but some things are timeless. We make every effort to stay on the cutting edge of design.",
  },
  {
    icon: '/done-pc.svg',
    title: 'Exceeding Expectations',
    desc: "You know why we really care about your success? Because it motivates us like nothing else! So it's a win-win situation.",
  },
]

export default function WhyUs() {
  return (
    <section className="bg-[#fbfbfd] px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <h3
          className="hero-heading reveal-item mb-16 font-medium text-[#1d1d1d]"
          style={{ fontSize: 'clamp(2.5rem, 4.6vw, 64px)' }}
        >
          Why us?
        </h3>

        <div className="reveal-group grid grid-cols-1 gap-x-20 gap-y-20 sm:grid-cols-3">
          {REASONS.map(({ icon, title, desc }) => (
            <div key={title} className="reveal-item">
              <div className="mb-5 flex h-[102px] w-[102px] items-center justify-center rounded-2xl">
                <Image src={icon} alt={title} width={80} height={80} className="object-cover" />
              </div>
              <h3 className="mb-3 text-[17px] font-semibold tracking-tight text-[#1d1d1d]">{title}</h3>
              <p className="text-[17px] leading-normal tracking-tight text-[#737373]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
