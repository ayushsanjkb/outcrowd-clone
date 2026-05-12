"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How long does it take to get started?",
    a: "Our turnaround is lightning-fast. Just one week from signing off and we're there with the kick-off meeting to get it rolling.",
  },
  {
    q: "What is your typical working process?",
    a: "It all starts with grabbing a cup of coffee, chilling with mates, and some quality time at the PlayStation (just kidding!). We always start a project with analysis, learning the requirements, and making estimates that will be shared in the price proposal.",
  },
  {
    q: "Do you work on a fixed-price basis or time and material?",
    a: "Flexibility is the key of success in this crazy world, so we try to suggest an appropriate solution for each specific case we deal with.",
  },
  {
    q: "How do you usually start new collaborations?",
    a: "Each new engagement starts with an introduction call and filling out the design/branding brief. If you have a cool project in mind, feel free to get in touch at hello@outcrowd.io",
  },
  {
    q: "Do you guys work with big companies only? We're an early-stage startup.",
    a: "We're all for building a borderless world, so we are open to working with any project we come across.",
  },
  {
    q: "How long it will take to get an estimate from you?",
    a: "We hate to keep you waiting. Setting up a team, making preliminary research and analysis, and getting back to you with the contract will take up to 24 hours.",
  },
  {
    q: "Do you have a minimum engagement?",
    a: "We set no entry thresholds for people who want to work with us. We've set a minimum project duration as 30 hours and we're waiting for you!",
  },
  {
    q: "What's the average project duration?",
    a: "Our team works full-time on every project, so the overall duration will highly depend on the initial estimate. On average, our projects last from 2 weeks to 5 months.",
  },
  {
    q: "Can we start the design without wireframes?",
    a: "Wireframes help to build UX without distractions. The wireframe is an essential part of the design process and we would not recommend eliminating it.",
  },
  {
    q: "What templates does Outcrowd use to create design?",
    a: "We don't use pre-built templates or kits because there's just no soul in them. We're committed to building fully customized and product-based solutions.",
  },
  {
    q: "Where should I start with my business if I have an idea?",
    a: "Hey, you've come to the right place! Please get in touch and we'll help you with the ideation, design, and development. Full cycle on us, no hassle for you.",
  },
];

function FAQItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        className="flex w-full items-center justify-between py-3 md:py-7 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-white text-[18px] md:text-[24px]">
          {q}
        </span>
        {/* Icon: + when closed, − when open, smooth morph via opacity cross-fade */}
        <span className="relative ml-8 flex h-7 w-7 flex-shrink-0 items-center justify-center">
          {/* Horizontal bar — always visible */}
          <span className="absolute h-[1.5px] w-4 rounded-full bg-[#555]" />
          {/* Vertical bar — fades out when open */}
          <span
            className="absolute h-4 w-[1.5px] rounded-full bg-[#555] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ opacity: isOpen ? 0 : 1 }}
          />
        </span>
      </button>
      {/* grid-rows expand — cubic ease-out for natural feel */}
      <div
        className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p className="pb-7 text-[17px] leading-relaxed text-[#737373]">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      data-nav-dark
      className="bg-[#080808] px-6 py-24 max-md:px-5 max-md:pt-[48px] max-md:pb-[64px]"
    >
      <div className="mx-auto max-w-[1100px]">
        <h3
          className="hero-heading reveal-item text-[2.625rem] md:text-[56px] mb-16 text-center font-medium text-white"
          style={{
            fontSize: "clamp(42px, 5vw, 56px)",
            lineHeight: "clamp(48px, 5.2vw, 56px)",
          }}
        >
          Questions and Answers
        </h3>

        <div className="divide-y divide-[#1e1e1e]">
          {FAQS.map(({ q, a }, i) => (
            <FAQItem
              key={q}
              q={q}
              a={a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
