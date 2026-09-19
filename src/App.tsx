import { useState, useEffect, useLayoutEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import Profile from './components/Profile'
import CurrentRole from './components/CurrentRole'
import Experience from './components/Experience'
import Expertise from './components/Expertise'
import Training from './components/Training'
import Education from './components/Education'
import CVSection from './components/CVSection'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MobileMenu from './components/MobileMenu'
import ConnectSheet from './components/ConnectSheet'
import FloatingControls from './components/FloatingControls'
import CVViewer from './pages/CVViewer'

type Page = 'home' | 'cv'

const CV_PATH = '/cv'

function pageFromLocation(): Page {
  return window.location.pathname === CV_PATH ? 'cv' : 'home'
}

export default function App() {
  const [page, setPage] = useState<Page>(pageFromLocation)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [connectSheetOpen, setConnectSheetOpen] = useState(false)

  const navigateTo = (next: Page) => {
    if (next === page) return
    setPage(next)
    window.history.pushState({}, '', next === 'cv' ? CV_PATH : '/')
  }

  useEffect(() => {
    // Stop the browser reapplying a stale scroll offset after a history
    // navigation, which would fight the reset below.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const handlePopState = () => setPage(pageFromLocation())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  /**
   * Every route change starts at the top.
   *
   * Two details matter here. It must be INSTANT: `html { scroll-behavior:
   * smooth }` would otherwise animate the scroll, and swapping the page
   * mid-animation leaves the visitor stranded part-way down the document.
   * And it must run AFTER the new page renders rather than during the click
   * handler, when the previous, much taller page is still mounted.
   * useLayoutEffect fires after render but before paint, so no intermediate
   * scroll position is ever visible.
   */
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [page])

  /** Close the sheet, scroll to the form, then put the caret in the first field. */
  const goToEnquiryForm = () => {
    setConnectSheetOpen(false)
    const section = document.getElementById('contact')
    section?.scrollIntoView({ behavior: 'smooth' })
    window.setTimeout(() => {
      section?.querySelector<HTMLInputElement>('form input:not([aria-hidden="true"])')?.focus()
    }, 500)
  }

  if (page === 'cv') {
    return <CVViewer onBack={() => navigateTo('home')} />
  }

  return (
    <div style={{ backgroundColor: '#FAF9F6', color: '#252525', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Header
        onOpenMenu={() => setMobileMenuOpen(true)}
        onNavigateCV={() => navigateTo('cv')}
        menuOpen={mobileMenuOpen}
      />

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigateCV={() => {
          setMobileMenuOpen(false)
          navigateTo('cv')
        }}
        onConnectClick={() => {
          setMobileMenuOpen(false)
          setConnectSheetOpen(true)
        }}
      />

      <main className="main-bottom-pad">
        <Hero onViewCV={() => navigateTo('cv')} />
        <Highlights />
        <Profile />
        <CurrentRole />
        <Experience />
        <Expertise />
        <Training />
        <Education />
        <CVSection onViewCV={() => navigateTo('cv')} />
        <Contact />
      </main>

      <Footer onNavigateCV={() => navigateTo('cv')} />

      <FloatingControls connectSheetOpen={connectSheetOpen} />

      <ConnectSheet
        isOpen={connectSheetOpen}
        onClose={() => setConnectSheetOpen(false)}
        onEnquiry={goToEnquiryForm}
      />

      {/* Mobile persistent "Let's Connect" bar */}
      {!connectSheetOpen && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
          style={{
            paddingBottom: 'max(env(safe-area-inset-bottom), 12px)',
            paddingLeft: 'env(safe-area-inset-left)',
            paddingRight: 'env(safe-area-inset-right)',
            backgroundColor: 'rgba(250,249,246,0.95)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid #DEDDD8',
          }}
        >
          <div className="px-4 pt-3 pb-1">
            <button
              onClick={() => setConnectSheetOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-semibold text-base shadow-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#102A43' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Let's Connect
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
