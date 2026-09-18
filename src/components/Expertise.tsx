import { useScrollReveal } from '../hooks/useScrollReveal'

const primary = [
  {
    title: 'Healthcare Operations',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    skills: ['Diagnostic Operations', 'Branch Administration', 'HIPAA Compliance', 'Electronic Health Records'],
  },
  {
    title: 'Branch Administration',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    skills: ['Office Management', 'Workflow Coordination', 'Reporting & Documentation', 'Resource Management'],
  },
  {
    title: 'Medical Billing & Coding',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
      </svg>
    ),
    skills: ['HMO Administration', 'Insurance Claims', 'Accounts Receivable', 'Billing Variance Resolution'],
  },
  {
    title: 'Team Leadership',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    skills: ['Staff Supervision', 'Performance Monitoring', 'Team Development', 'Duty Assignment'],
  },
  {
    title: 'Patient & Client Relations',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    skills: ['Patient Satisfaction', 'Complaint Resolution', 'Service Standards', 'Front-line Support'],
  },
  {
    title: 'Financial Administration',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    skills: ['Accounts Payable', 'Cash Flow Management', 'Invoice Processing', 'Financial Reporting'],
  },
]

const supporting = [
  'Electronic Health Records', 'Medical Billing Systems', 'HMO Administration',
  'Accounts Receivable', 'Accounts Payable', 'Microsoft Office Suite',
  'Documentation & Reporting', 'Staff Coordination', 'Customer Service',
  'Planning & Research', 'Eligibility Verification', 'Authorization Processing',
]

export default function Expertise() {
  const ref = useScrollReveal()

  return (
    <section
      id="expertise"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal py-24 lg:py-32"
      style={{ backgroundColor: '#FAF9F6' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#102A43' }}>
          Areas of Expertise
        </p>
        <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-4 leading-tight" style={{ color: '#102A43' }}>
          Core Competencies
        </h2>
        <p className="text-base mb-16" style={{ color: '#4A4A4A', maxWidth: '520px' }}>
          A broad range of professional skills developed across healthcare operations, administration, and financial management.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: '#DEDDD8' }}>
          {primary.map((item) => (
            <div
              key={item.title}
              className="group p-8 transition-colors duration-200 cursor-default"
              style={{ backgroundColor: '#FAF9F6' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F4F2ED' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#FAF9F6' }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-6 flex-shrink-0" style={{ backgroundColor: '#F4F2ED', color: '#102A43' }}>
                {item.icon}
              </div>
              <h3 className="font-serif font-semibold text-lg mb-4" style={{ color: '#102A43' }}>
                {item.title}
              </h3>
              <ul className="space-y-2">
                {item.skills.map(s => (
                  <li key={s} className="flex items-center gap-2 text-sm" style={{ color: '#4A4A4A' }}>
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#DEDDD8' }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Supporting skills */}
        <div className="mt-16 pt-10" style={{ borderTop: '1px solid #DEDDD8' }}>
          <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: '#666666' }}>
            Additional Skills
          </p>
          <div className="flex flex-wrap gap-3">
            {supporting.map(skill => (
              <span
                key={skill}
                className="px-4 py-2 text-sm rounded-full border"
                style={{ borderColor: '#DEDDD8', color: '#4A4A4A', backgroundColor: '#FAF9F6' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
