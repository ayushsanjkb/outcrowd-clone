import Image from 'next/image'
import Link from 'next/link'

const CASES = ['Fitonist', 'Brainforest', 'Cybervergent', 'Nopan', 'Ramos']
const SERVICES = ['Complex solution', 'Branding', 'Design', 'Development']
const ABOUT = ['About us', 'Numbers', 'Mission', 'Values', 'Clients']

const SOCIALS = [
  { href: 'https://dribbble.com/outcrowd', icon: '/behance.svg', label: 'Dribbble' },
  { href: 'https://www.behance.net/outcrowd', icon: '/behance.svg', label: 'Behance' },
  { href: 'https://www.instagram.com/outcrowdstudio/', icon: '/insta.svg', label: 'Instagram' },
  { href: 'https://x.com/outcrowdstudio', icon: '/twitter.svg', label: 'Twitter' },
  { href: 'https://www.linkedin.com/company/outcrowd-network/', icon: '/linkedin.svg', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer data-nav-dark className="bg-[#080808] px-6 pb-10 pt-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-2 gap-10 border-b border-[#1e1e1e] pb-12 md:grid-cols-4">
          {/* Cases */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#555]">Cases</p>
            <ul className="space-y-2">
              {CASES.map((c) => (
                <li key={c}>
                  <Link href="#" className="text-sm text-[#737373] transition-colors hover:text-white">{c}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#555]">Services</p>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link href="#" className="text-sm text-[#737373] transition-colors hover:text-white">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#555]">About us</p>
            <ul className="space-y-2">
              {ABOUT.map((a) => (
                <li key={a}>
                  <Link href="#" className="text-sm text-[#737373] transition-colors hover:text-white">{a}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#555]">Contact</p>
            <Link
              href="mailto:hello@outcrowd.io"
              className="text-sm text-[#737373] transition-colors hover:text-white"
            >
              hello@outcrowd.io
            </Link>

            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ href, icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1a1a] transition-colors hover:bg-[#2a2a2a]"
                >
                  <Image src={icon} alt={label} width={14} height={14} className="opacity-60" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-8">
          <p className="text-xs text-[#555]">Copyright © 2025 Outcrowd Inc. All rights reserved.</p>
          <p className="text-xs text-[#555]">Lewes — USA</p>
        </div>
      </div>
    </footer>
  )
}
