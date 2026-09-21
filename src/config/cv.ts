/**
 * CV content, transcribed from the source PDF at
 * /public/documents/Eucharia-Emerie-MBA-CV.pdf.
 *
 * Nothing here is invented. Education deliberately carries no award level
 * (MBA/HND/BSc) because the source document states course names only.
 *
 * The source PDF lists the city only, so no street address appears anywhere.
 */

export interface CVRole {
  title: string
  company: string
  location: string
  period: string
  current?: boolean
  bullets: string[]
}

export interface CVEducation {
  qualification: string
  institution: string
  location: string
  year?: string
}

export interface CVTrainingProvider {
  name: string
  year: string
}

export const summary =
  'Healthcare operations and administrative professional with progressive experience across diagnostic services, branch management, medical insurance billing, patient and client service, and financial administration. Currently leads day-to-day branch operations and coordinates a multidisciplinary team of approximately 25-30 staff. Skilled in workflow coordination, staff supervision, medical billing, HMO account reconciliation, invoicing, reporting, documentation, and customer service. Recognized for clear communication, accountability, and a practical approach to improving service delivery.'

/** "Core Competencies" in the source document. */
export const skills: string[] = [
  'Healthcare Operations',
  'Branch Administration',
  'Team Leadership',
  'Medical Billing & Coding',
  'HMO Administration',
  'Patient & Client Relations',
  'Accounts Receivable & Payable',
  'Electronic Health Records',
  'Reporting & Documentation',
  'Microsoft Office',
  'Planning & Research',
  'Customer Service',
]

export const roles: CVRole[] = [
  {
    title: 'Branch Manager',
    company: 'Silhouette Diagnostic Consultant',
    location: 'Wuse 2, Abuja',
    period: 'Apr 2023 - Present',
    current: true,
    bullets: [
      'Oversee day-to-day operations of the diagnostic branch and coordinate workflow across clinical, technical, administrative, and management functions.',
      'Supervise and coordinate a team of approximately 25-30 staff, supporting performance, teamwork, accountability, and professional service delivery.',
      'Monitor staff performance, assign duties, and support staff development to maintain efficient branch operations.',
      'Handle patient concerns and complaints professionally while maintaining a high standard of customer service.',
      'Maintain effective communication between clinical, technical, administrative, and management teams.',
    ],
  },
  {
    title: 'Medical Insurance Billing & Coding / Billing Officer',
    company: 'Echolab',
    location: 'Wuse 2, Abuja',
    period: 'Aug 2019 - 2023',
    bullets: [
      'Identified, researched, and resolved billing variances to maintain accurate and up-to-date billing records.',
      'Generated and submitted invoices in line with established accounts-receivable schedules and payment terms.',
      'Managed cash-flow reporting, customer remittances, chargebacks, and account reconciliations, resolving issues independently.',
      'Handled high-volume account enquiries and worked with clients on overdue accounts, payment plans, and restructuring options.',
      'Maintained vendor records, reconciled monthly statements, and verified accounts-payable transactions and payments.',
      'Processed invoices and payment requests across company branch locations and produced management reports on accounts-receivable status.',
      'Reconciled HMO and retainership accounts, supported month-end closing activities, and trained new team members and managers on accounts-payable systems and policies.',
    ],
  },
  {
    title: 'Administrative Assistant',
    company: 'Echo Lab',
    location: 'Garki, Abuja',
    period: 'Jun 2018 - Jul 2019',
    bullets: [
      'Managed office inventory, restocked supplies, and coordinated purchase orders to maintain adequate stock levels.',
      'Coordinated travel arrangements, including airfare, hotel, and ground transportation.',
      'Prepared correspondence, duty rosters, departmental documents, meeting materials, and expense reports using Microsoft Office tools.',
      'Supported meetings by preparing rooms and materials, documenting discussions, and distributing meeting notes.',
      'Identified and recommended process improvements to strengthen administrative accuracy, efficiency, and service quality.',
    ],
  },
  {
    title: 'Front Desk Officer',
    company: 'Echo Scan Services',
    location: 'Garki, Abuja',
    period: 'Sep 2017 - 2018',
    bullets: [
      'Supported clients and patients by answering enquiries, handling telephone requests, and providing information about investigations and charges.',
      'Verified client information, payment details, and supporting documentation for accuracy and completeness.',
      'Entered client investigation, payment, account, and call-log information into internal systems.',
      'Collaborated with departments and management to ensure client requests were addressed appropriately and on time.',
      'Collected client feedback, guided clients to investigation rooms, and supported accurate front-desk records.',
    ],
  },
]

export const education: CVEducation[] = [
  {
    qualification: 'Business Administration and Management',
    institution: 'Nasarawa State University',
    location: 'Keffi, Nasarawa',
  },
  {
    qualification: 'Business Administration and Management',
    institution: 'Federal Polytechnic Bida',
    location: 'Niger',
    year: '2016',
  },
  {
    qualification: 'Secondary School Certificate Examination (SSCE)',
    institution: 'Innovative International College',
    location: 'New Karu, Nasarawa',
    year: '2014',
  },
]

export const trainingProviders: CVTrainingProvider[] = [
  { name: 'AXA Mansard Provider Training', year: '2019' },
  { name: 'Hygeia HMO Provider Training', year: '2019' },
  { name: 'Life Action Plus HMO Provider Training', year: '2020' },
  { name: 'NNPC HMO Training', year: '2020' },
  { name: 'Redcare HMO Training', year: '2020' },
  { name: 'Hallmark HMO Training', year: '2021' },
  { name: 'Leadway Health Care Training', year: '2021' },
  { name: 'Novo Health Africa HMO Training', year: '2021' },
]

/** "Training focus" in the source document. */
export const trainingSkills: string[] = [
  'Client eligibility verification',
  'Enrollee and policy-number administration',
  'Authorization and approval codes',
  'Billing generation and submission',
  'Time management and presentation skills',
  'Basic information technology',
  'Customer service',
  'Teamwork and workplace etiquette',
  'Corporate and institutional invoicing',
]

export const professionalStrengths =
  'Communication, leadership, interpersonal skills, emotional intelligence, planning, research, accountability, and constructive teamwork.'

export const systemsAndTools =
  'Microsoft Office, electronic health records, medical billing systems, reporting and documentation tools.'

export const interests = 'Reading, research, and writing.'
