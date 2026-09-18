import { useScrollReveal } from '../hooks/useScrollReveal'
import { yearsOfExperience } from '../config/site'

export default function Profile() {
  const ref = useScrollReveal()
  const years = yearsOfExperience()

  return (
    <section
      id="profile"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal py-24 lg:py-32"
      style={{ backgroundColor: '#F4F2ED' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1px_360px] gap-12 lg:gap-16 items-start">

          {/* Profile copy */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#102A43' }}>
              Professional Profile
            </p>
            <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-8 leading-tight" style={{ color: '#102A43' }}>
              A Dedicated Healthcare<br />Administrative Leader
            </h2>
            <div className="space-y-5 text-base leading-relaxed" style={{ color: '#4A4A4A', maxWidth: '560px' }}>
              <p>
                Eucharia Emerie MBA is a competent and results-oriented healthcare administrative professional with {years}+ years of progressive experience across diagnostic operations, branch management, medical billing and coding, and administrative coordination.
              </p>
              <p>
                With a background in Business Administration and Management, she brings strategic thinking and operational discipline to every role she undertakes, from overseeing multi-departmental branch operations to managing complex HMO billing processes.
              </p>
              <p>
                Known for her strong leadership capabilities, meticulous attention to detail, and exceptional interpersonal skills, Eucharia consistently delivers high-quality outcomes in demanding healthcare environments across Abuja, Nigeria.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block self-stretch" style={{ backgroundColor: '#DEDDD8' }} />

          {/* Quote panel */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <svg className="w-8 h-6" viewBox="0 0 32 24" fill="none" aria-hidden="true">
                <path d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0l2.4 2.4C11.2 3.2 8 6.4 8 11.2V12h6.4V24H0zm17.6 0V14.4C17.6 6.4 22.4 1.6 32 0l2.4 2.4C28.8 3.2 25.6 6.4 25.6 11.2V12H32V24H17.6z" fill="#DEDDD8"/>
              </svg>
            </div>
            <blockquote className="font-serif text-xl italic leading-relaxed mb-6" style={{ color: '#102A43' }}>
              Committed to efficient healthcare systems and exceptional client service in every interaction, every operation, every day.
            </blockquote>
            <div className="w-12 h-px mb-4" style={{ backgroundColor: '#102A43' }} />
            <p className="text-sm font-semibold" style={{ color: '#252525' }}>Eucharia Emerie MBA</p>
            <p className="text-xs" style={{ color: '#666666' }}>Branch Manager · Silhouette Diagnostic Consultant</p>

            {/* Key strengths */}
            <div className="mt-10 space-y-3">
              {[
                'Strategic Operations Leadership',
                'Healthcare Administration & Compliance',
                'Team Development & Mentorship',
                'Medical Billing & HMO Management',
              ].map((strength) => (
                <div key={strength} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#102A43' }} />
                  <span className="text-sm font-medium" style={{ color: '#252525' }}>{strength}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
