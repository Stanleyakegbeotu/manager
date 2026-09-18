import { useScrollReveal } from '../hooks/useScrollReveal'

const responsibilities = [
  'Oversee day-to-day operations of the diagnostic branch',
  'Supervise and coordinate a team of 25-30 staff',
  'Monitor staff performance, assign duties, and support staff development',
  'Handle patient and client concerns professionally while maintaining service standards',
  'Manage workflow and branch operations across all departments',
  'Maintain effective communication between clinical, technical, administrative, and management teams',
]

export default function CurrentRole() {
  const ref = useScrollReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal py-24 lg:py-32"
      style={{ backgroundColor: '#FAF9F6' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#102A43' }}>
          Current Leadership Role
        </p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: role info */}
          <div>
            <h2 className="font-serif font-bold text-4xl lg:text-5xl leading-tight mb-4" style={{ color: '#102A43' }}>
              Branch Manager
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
              <span className="text-base font-medium" style={{ color: '#252525' }}>Silhouette Diagnostic Consultant</span>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#DEDDD8' }} />
              <span className="text-base" style={{ color: '#4A4A4A' }}>Wuse 2, Abuja</span>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#DEDDD8' }} />
              <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: '#102A43', color: '#FAF9F6' }}>
                2023 - Present
              </span>
            </div>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#4A4A4A', maxWidth: '460px' }}>
              Currently serving as Branch Manager at Silhouette Diagnostic Consultant, overseeing all operational, administrative, and clinical coordination responsibilities with a team of up to 30 staff members.
            </p>
            <button
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-60"
              style={{ color: '#102A43' }}
            >
              View Full Experience
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Right: responsibilities */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: '#666666' }}>
              Key Responsibilities
            </h3>
            <ul className="space-y-4">
              {responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-4 pb-4" style={{ borderBottom: i < responsibilities.length - 1 ? '1px solid #DEDDD8' : 'none' }}>
                  <span className="text-xs font-semibold tabular-nums mt-0.5 flex-shrink-0" style={{ color: '#102A43' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: '#252525' }}>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
