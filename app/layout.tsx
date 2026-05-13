import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import PageLoader from '@/components/PageLoader'

const itcAvantGarde = localFont({
  src: [
    { path: '../public/fonts/ITCAvantGardeStd-Bk.woff', weight: '400', style: 'normal' },
    { path: '../public/fonts/ITCAvantGardeStd-Md.ttf',  weight: '500', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
})

const lora = localFont({
  src: [
    { path: '../public/fonts/FMl_E.woff2', weight: '100 900', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Outcrowd — Branding & Design Studio',
  description: 'The essence of your business',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${itcAvantGarde.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <PageLoader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
