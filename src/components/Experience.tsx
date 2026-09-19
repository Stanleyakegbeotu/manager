import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const experience = [
  {
    period: '2023 - Present',
    title: 'Branch Manager',
    company: 'Silhouette Diagnostic Consultant',
    location: 'Wuse 2, Abuja',
    current: true,
    summary: 'Leading all branch operations, managing a team of 25-30 staff, and coordinating clinical, technical, and administrative functions to deliver exceptional patient and client service.',
    highlights: [
      'Oversee day-to-day operations of the diagnostic branch',
      'Supervise a team of 25-30 staff ensuring effective performance and professional service delivery',
      'Monitor staff performance, assign duties, and support staff development',
      'Handle patient concerns professionally maintaining a high standard of customer service',
      'Maintain effective communication across all departments',
    ],
  },
  {
    period: '2019 - 2023',
    title: 'Medical Insurance Billing & Coding / Billing Officer',
    company: 'Echolab',
    location: 'Wuse 2, Abuja',
    current: false,
    summary: 'Managed comprehensive medical billing operations, HMO reconciliations, accounts receivable and payable, and trained staff on billing systems and policies.',
    highlights: [
      'Identified, researched and resolved billing variances to maintain system accuracy',
      'Generated and submitted invoices based on accounts receivable schedules and terms',
      'Managed efficient cash flow reporting and analysed chargebacks independently',
      'Reconciled HMO retainership accounts monthly across company branch locations',
      'Trained and mentored new team members on accounts payable systems and policies',
      'Worked with medical payers including Medicare, Medicaid, and commercial insurances',
    ],
  },
  {
    period: '2018 - 2019',
    title: 'Administrative Assistant',
    company: 'Echo Lab',
    location: 'Garki, Abuja',
    current: false,
    summary: 'Provided comprehensive administrative support including office management, travel coordination, document preparation, and operational reporting.',
    highlights: [
      'Managed office inventory by restocking supplies and placing purchase orders',
      'Coordinated travel arrangements including airfare, hotel and ground transportation',
      'Composed, edited and prepared correspondence and department documents using MS packages',
      'Arranged conference rooms and facilities for meetings',
      'Created detailed expense reports and requests for capital expenditures',
    ],
  },
  {
    period: '2017 - 2018',
    title: 'Front Desk Officer',
    company: 'Echo Scan Services',
    location: 'Garki, Abuja',
    current: false,
    summary: 'Delivered front-line patient and client service, processed documentation, and ensured accurate verification of payment and personal information.',
    highlights: [
      'Solicited feedback to evaluate levels of patient/client satisfaction',
      'Verified personal and payment information on client and patient accounts',
      'Responded to customer requests via email and telephone',
      'Entered client details, payments, and call logs into the computer system',
      'Assisted and guided clients to their investigation rooms',
    ],
  },
]

export default function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0)
  const ref = useScrollReveal()

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal py-24 lg:py-32"
      style={{ backgroundColor: '#F4F2ED' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#102A43' }}>
          Career Experience
        </p>
        <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-16 leading-tight" style={{ color: '#102A43' }}>
          Professional Journey
        </h2>

        <div className="space-y-0">
          {experience.map((job, i) => {
            const isOpen = expanded === i
            return (
              <div key={i} style={{ borderTop: '1px solid #DEDDD8' }}>
                <button
                  className="w-full text-left py-8 flex items-start gap-6 group"
                  onClick={() => setExpanded(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`experience-panel-${i}`}
                >
                  <span className="hidden lg:block text-sm font-medium flex-shrink-0 w-32 pt-1" style={{ color: '#666666' }}>
                    {job.period}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {job.current && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#102A43', color: '#FAF9F6' }}>
                          Current
                        </span>
                      )}
                      <span className="text-sm lg:hidden" style={{ color: '#666666' }}>{job.period}</span>
                    </div>
                    <h3 className="font-serif font-semibold text-xl lg:text-2xl mb-1 group-hover:opacity-70 transition-opacity" style={{ color: '#102A43' }}>
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium" style={{ color: '#252525' }}>{job.company}</span>
                      <span className="text-xs" style={{ color: '#DEDDD8' }}>·</span>
                      <span className="text-sm" style={{ color: '#666666' }}>{job.location}</span>
                    </div>
                  </div>
                  {/* A span, not a button: the whole row is already the button,
                      and nesting interactive elements would be invalid HTML. */}
                  <span
                    className="flex-shrink-0 flex items-center gap-1.5 mt-1.5 text-sm font-semibold whitespace-nowrap transition-opacity group-hover:opacity-70"
                    style={{ color: '#102A43' }}
                  >
                    <span className="hidden sm:inline">{isOpen ? 'Hide details' : 'View full details'}</span>
                    <span className="sm:hidden">{isOpen ? 'Hide' : 'Details'}</span>
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* Expandable detail */}
                <div
                  id={`experience-panel-${i}`}
                  aria-hidden={!isOpen}
                  className="overflow-hidden transition-all duration-400"
                  style={{ maxHeight: isOpen ? '600px' : '0', opacity: isOpen ? 1 : 0 }}
                >
                  {/* Indent only from lg, where the date column exists. The old
                      inline clamp() always resolved to 8.5rem, indenting mobile too. */}
                  <div className="pb-10 lg:pl-[8.5rem]">
                    <p className="text-base leading-relaxed mb-6" style={{ color: '#4A4A4A', maxWidth: '600px' }}>
                      {job.summary}
                    </p>
                    <ul className="space-y-3">
                      {job.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="w-1 h-1 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: '#102A43' }} />
                          <span className="text-sm leading-relaxed" style={{ color: '#252525' }}>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
          <div style={{ borderTop: '1px solid #DEDDD8' }} />
        </div>
      </div>
    </section>
  )
}
