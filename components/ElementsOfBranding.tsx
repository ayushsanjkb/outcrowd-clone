import Image from "next/image";

export default function ElementsOfBranding() {
  return (
    <section data-nav-dark className="bg-black px-[50px] py-[350px]"
    style={{
      backgroundImage: '/dotted background.webp',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="mx-auto max-w-[1100px]">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h2
            className="hero-heading reveal-item font-medium text-white"
            style={{ fontSize: "clamp(2rem, 4.4vw, 64px)" }}
          >
            Elements of Branding
          </h2>
          <p
            className="reveal-item mx-auto mt-4 text-center text-[#737373]"
            style={{
              fontSize: "clamp(0.85rem, 1.1vw, 16px)",
              maxWidth: "620px",
              lineHeight: "1.7",
              transitionDelay: "100ms",
            }}
          >
            The logo encapsulates the idea behind the brand. We know how to make
            it work for you. Colors add a touch of soul that will resonate
            better with your customers.
          </p>
        </div>

        {/* Brand example block — each row reveals independently */}
        <div
          className="mt-16 overflow-hidden rounded-2xl"
          style={{ backgroundImage: "radial-gradient(circle,#0000,#000)" }}
        >
          {/* Row 1 — full width brand bar */}
          <div className="reveal-item px-8 py-5" style={{ transitionDelay: "0ms" }}>
            <Image
              src="/soun-example.webp"
              alt="Soun brand elements"
              width={1440}
              height={503}
              className="w-full object-cover"
            />
          </div>

          {/* Row 2 — Logo */}
          <div className="reveal-item px-8 py-5" style={{ transitionDelay: "80ms" }}>
            <Image
              src="/soun-logo.webp"
              alt="Soun logo"
              width={1440}
              height={386}
              className="w-full rounded-xl object-cover"
            />
          </div>

          {/* Row 3 — Font */}
          <div className="grid grid-cols-2">
            <div className="reveal-item px-8 py-5" style={{ transitionDelay: "160ms" }}>
              <Image
                src="/sans-fonts.webp"
                alt="Google Sans font"
                width={540}
                height={280}
                className="w-full rounded-xl object-cover"
              />
            </div>
          </div>

          {/* Row 4 — Color */}
          <div className="reveal-item px-8 py-5" style={{ transitionDelay: "240ms" }}>
            <Image
              src="/color-codes.webp"
              alt="Brand colors"
              width={540}
              height={280}
              className="w-full rounded-xl object-cover"
            />
          </div>

          {/* Row 5 — Elements */}
          <div className="grid grid-cols-2">
            <div className="reveal-item px-8 py-5" style={{ transitionDelay: "320ms" }}>
              <Image
                src="/elements.webp"
                alt="Brand UI elements"
                width={1440}
                height={406}
                className="w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
