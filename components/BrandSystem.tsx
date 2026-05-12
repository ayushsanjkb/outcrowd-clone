"use client";

export default function BrandSystem() {
  return (
    <section className="bg-white px-6 pb-[72px] pt-[120px] text-center md:pb-[68px] md:pt-[320px]">
      <div className="mx-auto max-w-[700px]">
        <h2
          className="hero-heading reveal-item font-medium text-[#1d1d1d]"
          style={{
            fontSize: "clamp(2rem, 3.9vw, 56px)",
            lineHeight: "clamp(40px, 4.44vw, 64px)",
          }}
        >
          A brand system equals higher value
        </h2>
        <p
          className="reveal-item mx-auto mt-[14px] text-[#737373] font-extralight! tracking-tight md:mt-[30px]"
          style={{
            fontSize: "clamp(1rem, 1.6667vw, 1.5rem)",
            lineHeight: "1.25",
            transitionDelay: "120ms",
          }}
        >
          A brand system is something every business needs. Trust us,
          we&apos;ve seen what branding can do. It&apos;s the best way to
          impress your customers and paint the right image.
        </p>
      </div>
    </section>
  );
}
