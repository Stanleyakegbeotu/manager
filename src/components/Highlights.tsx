import { useScrollReveal } from '../hooks/useScrollReveal'
import { yearsOfExperience } from '../config/site'

export default function Highlights() {
  const ref = useScrollReveal()

  // Derived from the documented career start date so the figure cannot go stale.
  const stats = [
    { value: '25-30', label: 'Team Members Supervised' },
    { value: `${yearsOfExperience()}+`, label: 'Years of Professional Experience' },
    { value: 'Healthcare + Administration', label: 'Cross-functional Expertise' },
    { value: '4', label: 'Key Career Positions & Growing' },
  ]

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal border-y"
      style={{ backgroundColor: '#FAF9F6', borderColor: '#DEDDD8' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center lg:items-start text-center lg:text-left px-4 lg:px-8"
              style={{
                borderRight: i < stats.length - 1 ? '1px solid #DEDDD8' : 'none',
              }}
            >
              <span
                className="font-serif font-bold mb-2 leading-none"
                style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#102A43' }}
              >
                {stat.value}
              </span>
              <span className="text-sm leading-tight" style={{ color: '#4A4A4A' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
