import { useScrollReveal } from '../hooks/useScrollReveal'
import { trainingImage } from '../config/images'

/**
 * Backdrop treatment. Kept as named constants so the strength can be tuned in
 * one place without hunting through JSX.
 *
 * The photo is faded and softened so it supports the copy instead of competing
 * with it. The warm wash above it is a gradient rather than a flat 65% layer:
 * a flat wash on top of a 22% image would leave roughly 7% effective
 * visibility, which reads as nothing at all. The gradient is heaviest at the
 * bottom, where the quote sits, so that text stays comfortably readable.
 */
const BACKDROP_OPACITY = 0.22
const BACKDROP_FILTER = 'saturate(0.75) blur(2px)'
const WARM_WASH =
  'linear-gradient(to top, rgba(250,249,246,0.88) 0%, rgba(250,249,246,0.55) 40%, rgba(250,249,246,0.38) 100%)'

const providers = [
  { name: 'AXA Mansard', year: '2019' },
  { name: 'Hygeia HMO', year: '2019' },
  { name: 'Life Action Plus', year: '2020' },
  { name: 'NNPC HMO', year: '2020' },
  { name: 'Redcare', year: '2020' },
  { name: 'Hallmark HMO', year: '2021' },
  { name: 'Leadway Health Care', year: '2021' },
  { name: 'Novo Health Africa', year: '2021' },
]

const skills = [
  'Eligibility verification & enrollee administration',
  'Authorization processing & approval codes',
  'Medical billing & monthly submissions',
  'HMO retainership account reconciliation',
  'Time management & presentation skills',
  'Customer service excellence',
  'Teamwork & workplace etiquette',
  'Basic Information Technology',
  'Invoice preparation for CBN, DSS, NCC & corporates',
]

export default function Training() {
  const ref = useScrollReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal py-24 lg:py-32"
      style={{ backgroundColor: '#F4F2ED' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#102A43' }}>
          Training &amp; Professional Development
        </p>
        <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-16 leading-tight" style={{ color: '#102A43' }}>
          Continuous Learning
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Training providers */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-8" style={{ color: '#666666' }}>
              Training Providers
            </h3>
            <ul className="space-y-0">
              {providers.map((p, i) => (
                <li
                  key={p.name}
                  className="flex items-center justify-between py-4"
                  style={{ borderBottom: '1px solid #DEDDD8' }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium" style={{ color: '#DEDDD8' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base font-medium" style={{ color: '#252525' }}>{p.name}</span>
                  </div>
                  <span className="text-sm" style={{ color: '#666666' }}>{p.year}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <h3 className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: '#666666' }}>
                Skills Acquired
              </h3>
              <ul className="space-y-3">
                {skills.map((skill) => (
                  <li key={skill} className="flex items-start gap-3 text-sm" style={{ color: '#4A4A4A' }}>
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
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Soft editorial backdrop panel */}
          <div className="hidden lg:block">
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: '2px',
                height: '600px',
                backgroundColor: '#FAF9F6',
                border: '1px solid #DEDDD8',
              }}
            >
              <img
                src={trainingImage.src}
                alt=""
                width={trainingImage.width}
                height={trainingImage.height}
                loading="lazy"
                decoding="async"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: BACKDROP_OPACITY,
                  filter: BACKDROP_FILTER,
                  // Slight scale hides the soft edge the blur leaves at the bounds.
                  transform: 'scale(1.04)',
                  objectPosition: 'center top',
                }}
              />

              {/* Warm off-white wash: keeps the photo recessed and the copy dominant. */}
              <div className="absolute inset-0" style={{ background: WARM_WASH }} aria-hidden="true" />

              {/* Navy, not white: the panel is now light, so white text would be unreadable. */}
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-serif italic text-lg leading-relaxed" style={{ color: '#102A43' }}>
                  "Certified across eight leading healthcare and HMO organisations in Nigeria."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
