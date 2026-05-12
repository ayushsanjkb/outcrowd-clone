import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import MobileHeroBrand from '@/components/MobileHeroBrand'
import BrandSystem from '@/components/BrandSystem'
import BrandScrollItems from '@/components/BrandScrollItems'
import ElementsOfBranding from '@/components/ElementsOfBranding'
import WhatIsOurSecret from '@/components/WhatIsOurSecret'
import WeWorkWith from '@/components/WeWorkWith'
import WhyUs from '@/components/WhyUs'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MobileHeroBrand />
      <BrandSystem />
      <BrandScrollItems />
      <ElementsOfBranding />
      <WhatIsOurSecret />
      <WeWorkWith />
      <WhyUs />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
