"use client";

export default function BrandSystem() {
  return (
    <section className="bg-white px-6 pb-28 pt-40 text-center">
      <div className="mx-auto max-w-[700px]">
        <h2
          className="hero-heading reveal-item font-medium text-[#1d1d1d]"
          style={{ fontSize: "clamp(2rem, 3.9vw, 56px)", lineHeight: "1.1" }}
        >
          A brand system equals higher value
        </h2>
        <p
          className="reveal-item mx-auto mt-6 text-[#737373] font-extralight! tracking-tight"
          style={{
            fontSize: "clamp(1rem, 1.6667vw, 1.5rem)",
            lineHeight: "40px",
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
