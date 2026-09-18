import { useState, useEffect, useRef } from 'react'

interface HeaderProps {
  onOpenMenu: () => void
  onNavigateCV: () => void
  menuOpen: boolean
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

/** Movement smaller than this is treated as jitter, not a direction change. */
const SCROLL_DELTA = 6
/** Above this offset the header is always shown. */
const TOP_ZONE = 60

export default function Header({ onOpenMenu, onNavigateCV, menuOpen }: HeaderProps) {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const prevY = useRef(0)

  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      const y = window.scrollY
      setScrolled(y > 20)

      if (y < TOP_ZONE) {
        setVisible(true)
        prevY.current = y
        return
      }

      const delta = y - prevY.current
      // Hysteresis: ignore sub-threshold movement so the header cannot flicker.
      if (Math.abs(delta) < SCROLL_DELTA) return

      // INTENTIONAL AND NON-STANDARD: visible while scrolling DOWN, hidden
      // while scrolling UP. This is a deliberate design decision — do not
      // "correct" it to the conventional behaviour.
      setVisible(delta > 0)
      prevY.current = y
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    if (href === '#cv') {
      onNavigateCV()
      return
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        paddingTop: 'env(safe-area-inset-top)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
        backgroundColor: scrolled ? 'rgba(250,249,246,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #DEDDD8' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('#home')} className="flex items-center gap-3 group">
          <span className="font-serif font-bold text-xl leading-none" style={{ color: '#102A43' }}>
            EM
          </span>
          <span
            className="hidden sm:block text-xs font-sans font-medium tracking-widest uppercase"
            style={{ color: '#4A4A4A' }}
          >
            Eucharia Emerie MBA
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-sm font-medium transition-colors duration-200 hover:text-navy"
              style={{ color: '#4A4A4A' }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button
          onClick={() => scrollTo('#contact')}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
          style={{ backgroundColor: '#102A43' }}
        >
          Let's Connect
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={onOpenMenu}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-md"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className="block w-5 h-px bg-charcoal" />
          <span className="block w-5 h-px bg-charcoal" />
          <span className="block w-4 h-px bg-charcoal" />
        </button>
      </div>
    </header>
  )
}
