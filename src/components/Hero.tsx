import { useEffect, useState } from 'react'
import { documents } from '../config/documents'
import { portrait } from '../config/images'

interface HeroProps {
  onViewCV: () => void
}

/** Stagger between hero elements, in milliseconds. */
const STAGGER = 120

const delay = (index: number) => `${index * STAGGER}ms`

export default function Hero({ onViewCV }: HeroProps) {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    // One frame later so the initial (hidden) styles paint first and the
    // transition actually runs. No timers writing into unmounted elements.
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section
      id="home"
      // min-height only from lg. On mobile the hero is content-height: forcing
      // 100vh combined with items-center was centring the block in a full
      // viewport and creating the large gap under the header.
      className="relative lg:min-h-screen flex items-center"
      style={{
        backgroundColor: '#FAF9F6',
        // Exactly the fixed header's own height (h-16) plus the notch inset.
        // The header applies the same inset, so this matches it rather than
        // doubling it.
        paddingTop: 'calc(4rem + env(safe-area-inset-top))',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full pt-6 pb-10 lg:py-0">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-8 lg:gap-20 items-center lg:min-h-[calc(100vh-64px)]">
          {/* Portrait. order-1 on mobile, so it sits directly under the header. */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            {/* Mobile portrait */}
            <div className="lg:hidden flex justify-center w-full">
              <div
                className="hero-portrait hero-portrait-mobile rounded-2xl overflow-hidden"
                data-visible={entered}
                style={{ backgroundColor: '#F4F2ED' }}
              >
                <img
                  src={portrait.src}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center top' }}
                />
              </div>
            </div>

            {/* Desktop portrait */}
            <div
              className="hero-portrait hidden lg:block relative w-full overflow-hidden"
              data-visible={entered}
              style={{ height: 'min(90vh, 700px)', borderRadius: '4px', backgroundColor: '#F4F2ED' }}
            >
              <img
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center top' }}
              />
              {/* Subtle gradient overlay at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24"
                style={{ background: 'linear-gradient(to top, rgba(250,249,246,0.4), transparent)' }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <p
              className="hero-item text-xs font-semibold tracking-[0.2em] uppercase mb-4 lg:mb-6"
              data-visible={entered}
              style={{ color: '#102A43', transitionDelay: delay(0) }}
            >
              Healthcare Operations &amp; Administration
            </p>

            <h1
              className="hero-item font-serif font-bold leading-none mb-3 lg:mb-4 text-[clamp(40px,11vw,56px)] lg:text-[clamp(52px,8vw,96px)]"
              data-visible={entered}
              style={{ color: '#102A43', transitionDelay: delay(1) }}
            >
              EUCHARIA<br />
              EMERIE MBA
            </h1>

            <p
              className="hero-item text-base lg:text-lg font-medium mb-5"
              data-visible={entered}
              style={{ color: '#4A4A4A', maxWidth: '440px', transitionDelay: delay(2) }}
            >
              Healthcare Operations, Administration<br />&amp; Branch Management
            </p>

            <p
              className="hero-item text-base leading-relaxed mb-8 lg:mb-10"
              data-visible={entered}
              style={{ color: '#4A4A4A', maxWidth: '500px', transitionDelay: delay(3) }}
            >
              An experienced healthcare administrative professional with a background spanning branch operations, medical billing, patient and client service, financial administration, team coordination, and operational leadership.
            </p>

            <div
              className="hero-item flex flex-wrap items-center gap-4"
              data-visible={entered}
              style={{ transitionDelay: delay(4) }}
            >
              <button
                onClick={onViewCV}
                className="px-7 py-3.5 rounded-full text-white font-semibold text-base transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                style={{ backgroundColor: '#102A43' }}
              >
                View CV
              </button>
              <a
                href={documents.pdfPath}
                download={documents.downloadName}
                className="px-7 py-3.5 rounded-full font-semibold text-base border transition-all duration-200 hover:bg-navy hover:text-white"
                style={{ borderColor: '#102A43', color: '#102A43' }}
              >
                Download CV
              </a>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 text-base font-medium transition-colors hover:opacity-70"
                style={{ color: '#4A4A4A' }}
              >
                Contact Me
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2" aria-hidden="true">
        <span className="text-xs tracking-widest uppercase" style={{ color: '#666666' }}>Scroll</span>
        <div className="w-px h-8 animate-bounce" style={{ backgroundColor: '#DEDDD8' }} />
      </div>
    </section>
  )
}
