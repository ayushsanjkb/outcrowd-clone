'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function WeWorkWith() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start end": Top of container hits bottom of screen (Progress = 0)
    // Center of screen (Progress = 0.5) -> Where we want the default layout!
    // "end start": Bottom of container hits top of screen (Progress = 1)
    offset: ["start end", "end start"] 
  })

  // ── The Center-Zero Parallax ──
  // [Start (Bottom of screen), Center of screen, End (Top of screen)]
  // We force the middle value to be 0 so it honors your CSS layout exactly.
  const y1 = useTransform(scrollYProgress, [0, 0.5, 1], [ 100, 0, -100])
  const y2 = useTransform(scrollYProgress, [0, 0.5, 1], [ 250, 0, -250])
  const y3 = useTransform(scrollYProgress, [0, 0.5, 1], [  50, 0,  -50])
  const y4 = useTransform(scrollYProgress, [0, 0.5, 1], [ 150, 0, -150])
  const y5 = useTransform(scrollYProgress, [0, 0.5, 1], [ 300, 0, -300])
  const y6 = useTransform(scrollYProgress, [0, 0.5, 1], [ 200, 0, -200])

  return (
    <section className="overflow-hidden bg-[#f5f5f7] py-[72px] md:py-[80px] lg:py-[120px]">

      <div className="mx-auto max-w-[980px] px-5 md:px-[30px] lg:px-[50px]">
        <h2
          className="hero-heading font-medium text-[#1d1d1f]"
          style={{
            fontSize: 'clamp(32px, 4.4vw, 64px)',
            lineHeight: 'clamp(40px, 4.6vw, 64px)',
            maxWidth: '13ch',
          }}
        >
          We work with all kinds of clients
        </h2>
      </div>

      {/* ── Unified Animated Gallery ────── */}
      <div ref={containerRef} className="mt-[60px] lg:mt-[100px]">
        <div className="gallery_our_brand">
          <div className="brand_bl">
            
            <motion.div style={{ y: y1 }} className="div-block-672">
              <img width="988.5" sizes="(max-width: 991px) 100vw, 988.5px" alt="" src="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc12db164920f9e80e42_ipad_01_1.webp" loading="lazy" srcSet="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc12db164920f9e80e42_ipad_01_1.webp 500w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc12db164920f9e80e42_ipad_01_1.webp 800w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc12db164920f9e80e42_ipad_01_1.webp 1080w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc12db164920f9e80e42_ipad_01_1.webp 1600w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc12db164920f9e80e42_ipad_01_1.webp 1977w" className="image-149" />
            </motion.div>
            
            <motion.div style={{ y: y2 }} className="div-block-673">
              <img width="431" sizes="(max-width: 479px) 100vw, 431px" alt="" src="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc0ddb164920f9e80a68_iphone_01.webp" loading="lazy" srcSet="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc0ddb164920f9e80a68_iphone_01.webp 500w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc0ddb164920f9e80a68_iphone_01.webp 862w" />
            </motion.div>
            
            <motion.div style={{ y: y3 }} className="div-block-674">
              <img width="584" sizes="(max-width: 767px) 100vw, 584px" alt="" src="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc0fdb164920f9e80c17_desk_1.webp" loading="lazy" srcSet="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc0fdb164920f9e80c17_desk_1.webp 500w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc0fdb164920f9e80c17_desk_1.webp 800w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc0fdb164920f9e80c17_desk_1.webp 1080w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc0fdb164920f9e80c17_desk_1.webp 1168w" />
            </motion.div>
            
            <motion.div style={{ y: y4 }} className="div-block-675">
              <img width="963" sizes="(max-width: 991px) 100vw, 963px" alt="" src="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbd2457ca138735310f7_ipad_03.webp" loading="lazy" srcSet="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbd2457ca138735310f7_ipad_03.webp 500w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbd2457ca138735310f7_ipad_03.webp 800w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbd2457ca13873530f1b_ipad_04.webp 1080w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbd2457ca138735310f7_ipad_03.webp 1600w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbd2457ca138735310f7_ipad_03.webp 1926w" />
            </motion.div>
            
            <motion.div style={{ y: y5 }} className="div-block-677">
              <img width="1634" sizes="(max-width: 1919px) 100vw, 1634px" alt="" src="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbe0457ca13873531a11_mac_frame_b.webp" loading="lazy" srcSet="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbe0457ca13873531a11_mac_frame_b.webp 500w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbe0457ca13873531a11_mac_frame_b.webp 800w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbe0457ca13873531a11_mac_frame_b.webp 1080w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbe0457ca13873531a11_mac_frame_b.webp 1600w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbe0457ca13873531a11_mac_frame_b.webp 2000w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbe0457ca13873531a11_mac_frame_b.webp 3268w" />
            </motion.div>
            
            <motion.div style={{ y: y6 }} className="div-block-678">
              <img width="439" sizes="(max-width: 479px) 100vw, 439px" alt="" src="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc08db164920f9e8071e_iphone_02.webp" loading="lazy" srcSet="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc08db164920f9e8071e_iphone_02.webp 500w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dc08db164920f9e8071e_iphone_02.webp 878w" />
            </motion.div>
            
            <motion.div style={{ y: y1 }} className="div-block-679">
              <img width="765" sizes="(max-width: 767px) 100vw, 765px" alt="" src="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbd1457ca13873530f1b_ipad_04.webp" loading="lazy" srcSet="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbd1457ca13873530f1b_ipad_04.webp 500w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbd1457ca13873530f1b_ipad_04.webp 800w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbd1457ca13873530f1b_ipad_04.webp 1080w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbd1457ca13873530f1b_ipad_04.webp 1530w" />
            </motion.div>
            
            <motion.div style={{ y: y3 }} className="div-block-680">
              <img width="585" sizes="(max-width: 767px) 100vw, 585px" alt="" src="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbca457ca13873530987_Ipad_05.webp" loading="lazy" srcSet="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbca457ca13873530987_Ipad_05.webp 500w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbca457ca13873530987_Ipad_05.webp 800w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbca457ca13873530987_Ipad_05.webp 1080w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbca457ca13873530987_Ipad_05.webp 1170w" />
            </motion.div>
            
            <motion.div style={{ y: y5 }} className="div-block-681">
              <img width="1634" sizes="(max-width: 1919px) 100vw, 1634px" alt="" src="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbcb457ca13873530a16_macbook_02.webp" loading="lazy" srcSet="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbcb457ca13873530a16_macbook_02.webp 500w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbcb457ca13873530a16_macbook_02.webp 800w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbcb457ca13873530a16_macbook_02.webp 1080w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbcb457ca13873530a16_macbook_02.webp 1600w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbcb457ca13873530a16_macbook_02.webp 2000w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbcb457ca13873530a16_macbook_02.webp 2600w, https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c6dbcb457ca13873530a16_macbook_02.webp 2000w" />
            </motion.div>
            
          </div>
        </div>
      </div>

    </section>
  )
}