import { documents } from '../config/documents'
import { contact, mailtoUrl, telUrl } from '../config/contact'
import {
  education,
  interests,
  professionalStrengths,
  roles,
  skills,
  summary,
  systemsAndTools,
  trainingProviders,
  trainingSkills,
} from '../config/cv'

interface CVViewerProps {
  onBack: () => void
}

/**
 * The CV rendered as native, designed content rather than an embedded PDF.
 *
 * An <object>/<iframe> PDF embed depends on a browser plugin that many setups
 * disable (Chrome's "Download PDFs instead of automatically opening them"),
 * which left the viewer blank. Rendering the content directly always works, is
 * responsive, selectable, searchable and accessible. The real PDF and Word
 * files remain one tap away.
 */
export default function CVViewer({ onBack }: CVViewerProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F4F2ED' }}>
      {/* Toolbar */}
      <header
        className="sticky top-0 z-20"
        style={{
          backgroundColor: 'rgba(250,249,246,0.96)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #DEDDD8',
          paddingTop: 'env(safe-area-inset-top)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        }}
      >
        <div className="flex items-center justify-between gap-3 h-14 px-4 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-60 flex-shrink-0"
            style={{ color: '#102A43' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sm:hidden">Back</span>
          </button>

          <p className="text-sm font-semibold truncate min-w-0" style={{ color: '#102A43' }}>
            <span className="hidden sm:inline">{documents.title}</span>
            <span className="sm:hidden">CV</span>
          </p>

          <a
            href={documents.pdfPath}
            download={documents.downloadName}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 flex-shrink-0"
            style={{ backgroundColor: '#102A43' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span className="hidden sm:inline">Download</span>
            <span className="sr-only sm:hidden">Download PDF</span>
          </a>
        </div>
      </header>

      <main
        className="flex-1 w-full mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 lg:py-12"
        style={{
          paddingLeft: 'max(env(safe-area-inset-left), 1rem)',
          paddingRight: 'max(env(safe-area-inset-right), 1rem)',
          paddingBottom: 'max(env(safe-area-inset-bottom), 2rem)',
        }}
      >
        <article
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: '#FAF9F6', border: '1px solid #DEDDD8' }}
        >
          {/* Identity header */}
          <div className="px-6 sm:px-10 lg:px-14 pt-10 lg:pt-14 pb-8" style={{ borderBottom: '1px solid #DEDDD8' }}>
            <h1
              className="font-serif font-bold leading-tight mb-3"
              style={{ color: '#102A43', fontSize: 'clamp(30px, 5vw, 46px)' }}
            >
              Eucharia Emerie MBA
            </h1>
            <p className="text-base font-medium mb-6" style={{ color: '#4A4A4A' }}>
              Healthcare Operations &amp; Administration Professional
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href={mailtoUrl} className="hover:underline break-all" style={{ color: '#252525' }}>
                {contact.email}
              </a>
              <a href={telUrl} className="hover:underline" style={{ color: '#252525' }}>
                {contact.phone.display}
              </a>
              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline inline-flex items-center gap-1.5"
                style={{ color: '#252525' }}
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
                LinkedIn
              </a>
              <span style={{ color: '#4A4A4A' }}>{contact.location}</span>
            </div>
          </div>

          <div className="px-6 sm:px-10 lg:px-14 py-10 lg:py-12 space-y-12">
            <Section title="Professional Summary">
              <p className="text-base leading-relaxed" style={{ color: '#4A4A4A' }}>
                {summary}
              </p>
            </Section>

            <Section title="Core Competencies">
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {skills.map((skill) => (
                  <li key={skill} className="flex items-start gap-3">
                    <Dot />
                    <span className="text-sm leading-relaxed" style={{ color: '#252525' }}>
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Professional Experience">
              <div className="space-y-10">
                {roles.map((role) => (
                  <div key={`${role.title}-${role.period}`}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                      <h3 className="font-serif font-semibold text-xl" style={{ color: '#102A43' }}>
                        {role.title}
                      </h3>
                      {role.current && (
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: '#102A43', color: '#FAF9F6' }}
                        >
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
                      <span className="text-sm font-medium" style={{ color: '#252525' }}>
                        {role.company}
                      </span>
                      <span aria-hidden="true" style={{ color: '#DEDDD8' }}>
                        ·
                      </span>
                      <span className="text-sm" style={{ color: '#666666' }}>
                        {role.location}
                      </span>
                      <span aria-hidden="true" style={{ color: '#DEDDD8' }}>
                        ·
                      </span>
                      <span className="text-sm font-medium" style={{ color: '#666666' }}>
                        {role.period}
                      </span>
                    </div>

                    <ul className="space-y-2.5">
                      {role.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <Dot />
                          <span className="text-sm leading-relaxed" style={{ color: '#4A4A4A' }}>
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Education">
              <div className="space-y-5">
                {education.map((item) => (
                  <div key={`${item.qualification}-${item.institution}`} className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-base font-semibold" style={{ color: '#102A43' }}>
                        {item.qualification}
                      </p>
                      <p className="text-sm" style={{ color: '#4A4A4A' }}>
                        {item.institution}, {item.location}
                      </p>
                    </div>
                    {item.year && (
                      <span className="text-sm font-medium flex-shrink-0" style={{ color: '#666666' }}>
                        {item.year}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Professional Training">
              <ul className="space-y-0 mb-8">
                {trainingProviders.map((provider) => (
                  <li
                    key={provider.name}
                    className="flex items-center justify-between gap-4 py-3"
                    style={{ borderBottom: '1px solid #DEDDD8' }}
                  >
                    <span className="text-sm font-medium" style={{ color: '#252525' }}>
                      {provider.name}
                    </span>
                    <span className="text-sm flex-shrink-0" style={{ color: '#666666' }}>
                      {provider.year}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#666666' }}>
                Training Focus
              </p>
              <ul className="space-y-2.5">
                {trainingSkills.map((skill) => (
                  <li key={skill} className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: '#102A43' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm leading-relaxed" style={{ color: '#4A4A4A' }}>
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Additional Information">
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#666666' }}>
                    Professional Strengths
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#4A4A4A' }}>
                    {professionalStrengths}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#666666' }}>
                    Systems &amp; Tools
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#4A4A4A' }}>
                    {systemsAndTools}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#666666' }}>
                    Interests
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#4A4A4A' }}>
                    {interests}
                  </p>
                </div>
              </div>
            </Section>
          </div>

          {/* Document actions */}
          <div
            className="px-6 sm:px-10 lg:px-14 py-8 flex flex-col sm:flex-row sm:items-center gap-4"
            style={{ borderTop: '1px solid #DEDDD8', backgroundColor: '#F4F2ED' }}
          >
            <p className="text-sm flex-1" style={{ color: '#4A4A4A' }}>
              Prefer a copy to keep?
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={documents.pdfPath}
                download={documents.downloadName}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#102A43' }}
              >
                Download PDF
              </a>
              {documents.docxPath && (
                <a
                  href={documents.docxPath}
                  download
                  className="px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors"
                  style={{ borderColor: '#102A43', color: '#102A43' }}
                >
                  Download Word
                </a>
              )}
              <a
                href={documents.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors"
                style={{ borderColor: '#DEDDD8', color: '#4A4A4A' }}
              >
                Open PDF
              </a>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="text-xs font-semibold tracking-[0.2em] uppercase mb-5 pb-3"
        style={{ color: '#102A43', borderBottom: '1px solid #DEDDD8' }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function Dot() {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
      style={{ backgroundColor: '#102A43' }}
      aria-hidden="true"
    />
  )
}
