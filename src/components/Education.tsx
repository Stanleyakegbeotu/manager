import { useScrollReveal } from '../hooks/useScrollReveal'

/**
 * Transcribed exactly as the source CV states it. The source document lists
 * course names and institutions only — it does not state an award level, so no
 * degree label (MBA, HND, BSc…) is shown here.
 */
const education = [
  {
    qualification: 'Business Administration and Management',
    institution: 'Nasarawa State University',
    location: 'Keffi, Nasarawa',
    year: '',
  },
  {
    qualification: 'Business Administration and Management',
    institution: 'Federal Polytechnic',
    location: 'Bida, Niger',
    year: '2016',
  },
  {
    qualification: 'Secondary School Certificate Examination (SSCE)',
    institution: 'Innovative International College',
    location: 'New Karu, Nasarawa',
    year: '2014',
  },
]

export default function Education() {
  const ref = useScrollReveal()

  return (
    <section
      id="education"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal py-24 lg:py-32"
      style={{ backgroundColor: '#FAF9F6' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#102A43' }}>
          Education
        </p>
        <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-16 leading-tight" style={{ color: '#102A43' }}>
          Academic Background
        </h2>

        <div className="space-y-0">
          {education.map((item, i) => (
            <div
              key={i}
              className="grid lg:grid-cols-[48px_1fr_auto] gap-6 items-start py-10"
              style={{ borderTop: '1px solid #DEDDD8' }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#F4F2ED' }}
              >
                <svg
                  className="w-5 h-5"
                  style={{ color: '#102A43' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-serif font-semibold text-xl mb-2" style={{ color: '#102A43' }}>
                  {item.qualification}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: '#4A4A4A' }}>
                    {item.institution}
                  </span>
                  <span style={{ color: '#DEDDD8' }}>·</span>
                  <span className="text-sm" style={{ color: '#666666' }}>
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Year */}
              {item.year && (
                <div className="text-sm font-medium" style={{ color: '#666666' }}>
                  {item.year}
                </div>
              )}
            </div>
          ))}
          <div style={{ borderTop: '1px solid #DEDDD8' }} />
        </div>

        {/* Interests */}
        <div className="mt-16 pt-10" style={{ borderTop: '1px solid #DEDDD8' }}>
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#666666' }}>
            Interests
          </p>
          <p className="text-base" style={{ color: '#4A4A4A' }}>
            Reading, Research &amp; Writing
          </p>
        </div>
      </div>
    </section>
  )
}
