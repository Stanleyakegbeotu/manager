import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { documents } from '../config/documents'
import { portrait } from '../config/images'

interface CVSectionProps {
  onViewCV: () => void
}

export default function CVSection({ onViewCV }: CVSectionProps) {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const ref = useScrollReveal()

  // A popover only earns its place when there is more than one format to choose
  // between; with no .docx yet, the button downloads the PDF directly.
  const hasWord = documents.docxPath !== null

  return (
    <section
      id="cv"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal py-24 lg:py-32 relative"
      style={{ backgroundColor: '#102A43' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Curriculum Vitae
            </p>
            <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-6 leading-tight text-white">
              View or Download<br />My CV
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Explore my full professional background, skills and experience. Available to view online or download in your preferred format.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={onViewCV}
                className="px-7 py-3.5 rounded-full font-semibold text-base transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#FAF9F6', color: '#102A43' }}
              >
                View CV
              </button>

              {hasWord ? (
                <div className="relative">
                  <button
                    onClick={() => setPopoverOpen(!popoverOpen)}
                    aria-expanded={popoverOpen}
                    aria-haspopup="menu"
                    className="px-7 py-3.5 rounded-full font-semibold text-base border border-white/30 text-white transition-all duration-200 hover:bg-white/10 flex items-center gap-2"
                  >
                    Download CV
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {popoverOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setPopoverOpen(false)} />
                      <div
                        role="menu"
                        className="absolute bottom-full mb-2 left-0 z-20 w-56 rounded-2xl shadow-xl overflow-hidden"
                        style={{ backgroundColor: '#FAF9F6', border: '1px solid #DEDDD8' }}
                      >
                        <a
                          href={documents.pdfPath}
                          download={documents.downloadName}
                          role="menuitem"
                          className="flex items-center gap-3 px-5 py-4 text-sm font-medium transition-colors hover:bg-ivory-alt"
                          style={{ color: '#252525' }}
                          onClick={() => setPopoverOpen(false)}
                        >
                          <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#102A43' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          Download PDF
                        </a>
                        <div style={{ height: '1px', backgroundColor: '#DEDDD8' }} />
                        <a
                          href={documents.docxPath!}
                          download
                          role="menuitem"
                          className="flex items-center gap-3 px-5 py-4 text-sm font-medium transition-colors hover:bg-ivory-alt"
                          style={{ color: '#252525' }}
                          onClick={() => setPopoverOpen(false)}
                        >
                          <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#102A43' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Word (.docx)
                        </a>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <a
                  href={documents.pdfPath}
                  download={documents.downloadName}
                  className="px-7 py-3.5 rounded-full font-semibold text-base border border-white/30 text-white transition-all duration-200 hover:bg-white/10 flex items-center gap-2"
                >
                  Download PDF
                </a>
              )}

              {/* Rendered only when a real Google Docs URL exists — never a placeholder link. */}
              {documents.googleDocsUrl && (
                <a
                  href={documents.googleDocsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 flex items-center gap-2"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  View in Google Docs
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Portrait card. The offset frame is rendered first and sits behind
              the photo, so its edges cannot cut lines across her face. */}
          <div className="hidden lg:flex justify-end items-center">
            <div className="relative">
              <div
                className="absolute -top-4 -right-4 w-full h-full rounded-2xl border border-white/10"
                style={{ zIndex: 0 }}
                aria-hidden="true"
              />
              <div
                className="relative w-64 h-80 rounded-2xl overflow-hidden border border-white/10"
                style={{ zIndex: 1, backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                <img
                  src={portrait.src}
                  /* Decorative here: the hero already carries her portrait with
                     meaningful alt, so repeating it would just add noise. */
                  alt=""
                  width={portrait.width}
                  height={portrait.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center top' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
