interface FooterProps {
  onNavigateCV: () => void
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#profile' },
  { label: 'Experience', href: '#experience' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Education', href: '#education' },
  { label: 'CV', href: '#cv' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer({ onNavigateCV }: FooterProps) {
  const scrollTo = (href: string) => {
    if (href === '#cv') { onNavigateCV(); return }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="py-16 lg:py-20" style={{ backgroundColor: '#FAF9F6', borderTop: '1px solid #DEDDD8' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          {/* Identity */}
          <div>
            <div className="font-serif font-bold text-2xl mb-2" style={{ color: '#102A43' }}>EM</div>
            <p className="text-sm font-semibold mb-1" style={{ color: '#252525' }}>Eucharia Emerie MBA</p>
            <p className="text-sm" style={{ color: '#666666' }}>Healthcare Operations &amp; Administration</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#666666' }}>Navigation</p>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm transition-colors hover:text-navy"
                    style={{ color: '#4A4A4A' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#666666' }}>Contact</p>
            <a href="mailto:Eucharia.goldmba@gmail.com" className="text-sm block mb-2 hover:underline" style={{ color: '#4A4A4A' }}>
              Eucharia.goldmba@gmail.com
            </a>
            <a href="tel:+2348086106242" className="text-sm block mb-1 hover:underline" style={{ color: '#4A4A4A' }}>
              08086106242
            </a>
            <p className="text-sm" style={{ color: '#4A4A4A' }}>Abuja, Nigeria</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid #DEDDD8' }}>
          <p className="text-sm" style={{ color: '#666666' }}>
            © 2026 Eucharia Emerie MBA. All rights reserved.
          </p>
          {/* Was #DEDDD8, the border colour, which is close to unreadable on
              the ivory ground. Muted but legible instead. */}
          <p className="text-sm" style={{ color: '#666666' }}>
            References available upon request.
          </p>
        </div>
      </div>
    </footer>
  )
}
