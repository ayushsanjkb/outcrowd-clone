"use client";

import { motion } from "framer-motion";

// Y start values matched exactly to Webflow reference per element
const ITEMS = [
  { cls: "div-block-672", y: 100, src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc12db164920f9e80e42_ipad_01_1.webp",    w: 989  },
  { cls: "div-block-673", y: 150, src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc0ddb164920f9e80a68_iphone_01.webp",   w: 431  },
  { cls: "div-block-674", y: 50,  src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc0fdb164920f9e80c17_desk_1.webp",     w: 584  },
  { cls: "div-block-675", y: 200, src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbd2457ca138735310f7_ipad_03.webp",    w: 963  },
  { cls: "div-block-677", y: 100, src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbe0457ca13873531a11_mac_frame_b.webp", w: 1634 },
  { cls: "div-block-678", y: 200, src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc08db164920f9e8071e_iphone_02.webp",   w: 439  },
  { cls: "div-block-679", y: 200, src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbd1457ca13873530f1b_ipad_04.webp",    w: 765  },
  { cls: "div-block-680", y: 200, src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbca457ca13873530987_Ipad_05.webp",    w: 585  },
  { cls: "div-block-681", y: 200, src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbcb457ca13873530a16_macbook_02.webp", w: 1634 },
];

export default function WeWorkWith() {
  return (
    <section className="overflow-hidden bg-[#f5f5f7] py-[52px] md:py-[80px] lg:py-[120px]">
      <div className="mx-auto max-w-[980px] px-5 md:px-[30px] lg:px-[50px]">
        <h2
          className="hero-heading font-medium text-[#1d1d1f]"
          style={{
            fontSize: "clamp(32px, 4.4vw, 64px)",
            lineHeight: "clamp(40px, 4.6vw, 64px)",
            maxWidth: "13ch",
          }}
        >
          We work with all kinds of clients
        </h2>
      </div>

      {/* ── Gallery — each element fires independently when it enters the viewport ── */}
      <div className="mt-[60px] lg:mt-[100px]">
        <div className="gallery_our_brand">
          <div className="brand_bl">
            {ITEMS.map(({ cls, y, src, w }) => (
              <motion.div
                key={cls}
                className={cls}
                initial={{ y }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <img
                  width={w}
                  alt=""
                  src={src}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
