import { useState, useEffect } from 'react'

interface FloatingControlsProps {
  connectSheetOpen: boolean
}

/**
 * Back-to-top control.
 *
 * The floating WhatsApp button was removed at the client's request. WhatsApp is
 * still reachable from the Contact section, the "Let's Connect" sheet and the
 * mobile menu, so no contact route was lost.
 */
export default function FloatingControls({ connectSheetOpen }: FloatingControlsProps) {
  const [showBackTop, setShowBackTop] = useState(false)

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      setShowBackTop(window.scrollY > 600)
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const hidden = connectSheetOpen || !showBackTop

  return (
    <div
      className="fixed z-40 flex flex-col items-end transition-opacity duration-300"
      style={{
        right: 'max(env(safe-area-inset-right), 20px)',
        // Clears the persistent mobile "Let's Connect" bar and the Home Indicator.
        bottom: 'max(calc(env(safe-area-inset-bottom) + 88px), 108px)',
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? 'none' : 'auto',
      }}
      aria-hidden={hidden}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-11 h-11 rounded-full flex items-center justify-center shadow-md border transition-transform duration-300"
        style={{
          backgroundColor: '#FAF9F6',
          borderColor: '#DEDDD8',
          color: '#102A43',
          transform: hidden ? 'translateY(12px)' : 'translateY(0)',
        }}
        aria-label="Back to top"
        tabIndex={hidden ? -1 : 0}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  )
}
