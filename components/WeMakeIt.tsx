export default function WeMakeIt() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center gap-1">
      <h2
        className="relative z-[1] text-center font-bold leading-tight text-[#1d1d1d]"
        style={{ fontSize: 'clamp(2rem, 4.8vw, 56px)', lineHeight: '1.05' }}
      >
        Let&apos;s make it
      </h2>

      {/* Layered "Outstanding": gradient fill with stroke overlay */}
      <div className="relative z-[1]">
        {/* Gradient fill */}
        <h2
          className="text-center font-medium leading-tight"
          style={{
            fontSize: 'clamp(2rem, 4.8vw, 56px)',
            lineHeight: '1.15',
            background: 'linear-gradient(85deg, #3B64C1, #E03181 34%, #F58235 72%, #FFDA07)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Outstanding
        </h2>
        {/* Stroke outline on top — adds depth matching the reference */}
        <h2
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 text-center font-medium leading-tight"
          style={{
            fontSize: 'clamp(2rem, 4.8vw, 56px)',
            lineHeight: '1.15',
            WebkitTextStroke: '1px rgba(29,29,31,0.25)',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Outstanding
        </h2>
      </div>

      <h3
        className="relative z-[1] text-center font-medium text-[#1d1d1d]"
        style={{ fontSize: 'clamp(0.9rem, 1.8vw, 26px)', marginTop: '0.25rem' }}
      >
        in every little detail
      </h3>
    </section>
  )
}
