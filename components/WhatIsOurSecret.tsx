import Image from "next/image";

const SECRETS = [
  {
    icon: "/goal.svg",
    title: "Right on target",
    desc: "Branding doesn't exist in a vacuum. It's a way to achieve business goals. We always keep that in mind.",
  },
  {
    icon: "/done-pc.svg",
    title: "Customer-first principle",
    desc: "At the end of the day, it's all about the customers. They are the ones who will be the ultimate judges. We make sure your branding will appeal to the right kind of people!",
  },
  {
    icon: "/puzzle.svg",
    title: "Brand value",
    desc: "We go beyond creating beautiful visuals. We unleash a hidden potential to increase your brand value. Sounds too good to be true? Try us!",
  },
  {
    icon: "/goal.svg",
    title: "Future-proof results",
    desc: "Businesses run for years and decades. We make sure your branding doesn't lag behind. Think of it as a long-term strategic investment.",
  },
  {
    icon: "/progress.svg",
    title: "Bragging rights",
    desc: "Our branding solutions will always leave you feeling proud. You'll want to plaster your new branding over every surface, just so everyone can see how cool it is!",
  },
  {
    icon: "/done-pc.svg",
    title: "Exceeding expectations",
    desc: "We always go above and beyond. Why? Because we're a team of perfectionists who love seeing their clients happy.",
  },
];

export default function WhatIsOurSecret() {
  return (
    <section data-nav-dark className="bg-black px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <h2
          className="hero-heading text-center md:text-left reveal-item mb-16 font-medium text-white"
          style={{ fontSize: "clamp(2rem, 4.6vw, 64px)" }}
        >
          What&apos;s our secret?
        </h2>

        <div className="reveal-group grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 md:gap-x-[110px] md:gap-y-[76px] lg:grid-cols-3">
          {SECRETS.map(({ icon, title, desc }) => (
            <div key={title} className="reveal-item max-md:flex max-md:flex-col max-md:items-center max-md:text-center">
              <div className="mb-5 flex h-[102px] w-[102px] max-md:h-[60px] max-md:w-[60px] items-center justify-center rounded-2xl overflow-hidden">
                <Image
                  src={icon}
                  alt={title}
                  width={80}
                  height={80}
                  className="object-contain w-full h-full"
                />
              </div>
              <h3 className="mb-3 text-[17px] max-md:text-[21px] font-semibold tracking-tight text-white font-display">
                {title}
              </h3>
              <p className="text-[17px] leading-normal tracking-tight text-[#737373] font-display font-[500] md:max-w-2xl">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
