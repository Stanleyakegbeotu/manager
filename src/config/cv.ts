/**
 * CV content, transcribed from the source PDF at
 * /public/documents/Eucharia-Emerie-MBA-CV.pdf.
 *
 * Nothing here is invented. Education deliberately carries no award level
 * (MBA/HND/BSc) because the source document states course names only.
 *
 * The one deliberate difference from the PDF: the full residential street
 * address is NOT included. The downloadable PDF keeps it, but it must never be
 * shown on the public site, so only the city is exposed here.
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
  'Competent administrative professional supporting the underwriting process with effective document evaluation, report writing and file management skills. Proficient in issuing quotes, gathering details and reviewing renewal requests.'

export const skills: string[] = [
  'Excellent communication skills, with very high proficiency in oral and written English',
  'Excellent computer skills, especially the use of MS Office packages',
  'Possess a strong background in planning and research',
  'Strong leadership, interpersonal and emotional intelligence skills',
  'Ability to provide thoughtful contributions to strategic process',
  'Interrogative ability',
  'Ability to listen and respond constructively to team members’ ideas',
  'Show commitment, dedication and accountability in my work',
  'Overseeing electronic health records',
  'Ensuring HIPAA compliance in record keeping',
  'Using medical billing software to submit claims and request patient payment',
  'Managing medical billing systems',
]

export const roles: CVRole[] = [
  {
    title: 'Branch Manager',
    company: 'Silhouette Diagnostic Consultant',
    location: 'Wuse 2, Abuja',
    period: '4/2023 - Present',
    current: true,
    bullets: [
      'Oversee the day-to-day operations of the diagnostic branch.',
      'Supervise and coordinate a team of 25 to 30 staff, ensuring effective performance, teamwork, and professional service delivery.',
      'Oversee workflow and branch operations.',
      'Monitor staff performance, assign duties and support staff development.',
      'Handle patient concerns and complaints professionally while maintaining a high standard of customer service.',
      'Maintain effective communication between clinical, technical, administrative and management teams.',
    ],
  },
  {
    title: 'Medical Insurance Billing and Coding / Billing Officer',
    company: 'Echolab',
    location: 'Wuse 2, Abuja',
    period: '08/2019 - 2023',
    bullets: [
      'Identified, researched and resolved billing variances to maintain system accuracy and currency.',
      'Generated and submitted invoices based upon established accounts receivable schedules and terms.',
      'Worked with the Treasurer and assisted the Chief Financial Officer to properly apply customer remittances.',
      'Managed efficient cash flow reporting, posted cash receipts and analysed chargebacks, independently addressing and resolving issues.',
      'Applied more than fifty payments per month on average.',
      'Produced, distributed and tracked more than seventy monthly invoices for the Company.',
      'Handled high volume of in-bound calls pertaining to reconciliation of delinquent accounts.',
      'Contacted clients with past due accounts to formulate payment plans and discuss restructuring options.',
      'Worked effectively with medical payers such as Medicare, Medicaid and commercial insurances to obtain timely and accurate payments.',
      'Kept vendor files accurate and up-to-date to expedite payment processing.',
      'Entered invoices requiring payment and disbursed amounts via check, electronic transfer or bank draft.',
      'Verified vendor accounts by reconciling monthly statements and related transactions.',
      'Verified accuracy of accounts payable payments, reducing payment errors and check reissues.',
      'Generated accounts payable reports for management review to aid in financial and business decision making.',
      'Generated financial statements and reports detailing accounts receivable status.',
      'Managed efficient and accurate processing of invoices and check requests for all the company branch locations in Nigeria.',
      'Trained and mentored new team members and managers on accounts payable systems and policies to build cohesive groups and promote operational performance.',
      'Promoted consistent accuracy of billing information by reconciling many HMOs and retainership accounts monthly.',
      'Utilised talents and expertise to complete on-time and accurate monthly closing processes, journal entries and accruals.',
    ],
  },
  {
    title: 'Admin Assistant',
    company: 'Echo Lab',
    location: 'Garki, Abuja',
    period: '06/2018 - 07/2019',
    bullets: [
      'Managed office inventory by restocking supplies and placing purchase orders to maintain adequate stock levels.',
      'Coordinated travel arrangements, including booking airfare, hotel and ground transportation.',
      'Used MS packages to compose, edit and prepare correspondence and other department documents, including duty roster.',
      'Maintained computers and other administrative office equipment and placed orders for materials in short supply.',
      'Arranged conference rooms and facilities to prepare for meetings.',
      'Identified and recommended changes to existing processes to improve accuracy, efficiency and quality service.',
      'Welcomed office visitors warmly and alerted staff to arrivals of scheduled appointments.',
      'Created detailed expense reports and requests for capital expenditures.',
      'Supported efficient meetings by organising spaces and materials, documenting discussions and distributing meeting notes.',
      'Processed invoices and expenses using MS packages to facilitate on-time payment.',
    ],
  },
  {
    title: 'Front Desk Officer',
    company: 'Echo Scan Services',
    location: 'Garki, Abuja',
    period: '09/2017 - 2018',
    bullets: [
      'Solicited feedback verbally to evaluate levels of client and patient satisfaction.',
      'Verified that personal and payment information on client and patient accounts was accurate and complete.',
      'Collaborated with various team members to ensure client and patient requests were addressed appropriately and timely.',
      'Provided each client with information on investigation amounts of the lab upon walk-in.',
      'Responded to customer requests via email.',
      'Copied, logged and scanned supporting documentation.',
      'Entered client details such as investigation, payments, account information and call logs into the computer system.',
      'Assisted clients by answering questions, responding to inquiries and handling telephone requests.',
      'Worked directly with departments, clients and management to achieve results.',
      'Assisted and guided clients to their investigation rooms.',
      'Verified data integrity and accuracy.',
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

export const trainingProviders: CVTrainingProvider[] = [
  { name: 'AXA Mansard Provider Training', year: '2019' },
  { name: 'Hygeia HMO HYProvider Training', year: '2019' },
  { name: 'Life Action Plus HYProvider Training', year: '2020' },
  { name: 'NNPC HMO Training', year: '2020' },
  { name: 'Redcare HMO Training', year: '2020' },
  { name: 'Hallmark HMO Training', year: '2021' },
  { name: 'Leadway Health Care Training', year: '2021' },
  { name: 'Novo Health Africa HMO Training', year: '2021' },
]

export const trainingSkills: string[] = [
  'Effective at checking if a client is active',
  'Effective at inputting client enrollee number and policy number',
  'Generate authorization codes and approval codes',
  'Effective generation of bills after investigation at any period',
  'Perfect submission of bills at the start of every month',
  'Time management and presentation skills',
  'Basic Information Technology',
  'Effective customer service skills',
  'Teamwork and general workplace etiquette',
  'Prepare invoices for CBN, DSS, NCC and other corporate organisations',
]

export const interests = 'Reading, research and writing.'
export const references = 'Available upon request.'
