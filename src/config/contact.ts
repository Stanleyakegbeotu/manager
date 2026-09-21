/**
 * Single source of truth for identity and contact details.
 * Update values here rather than editing individual components.
 */

export interface PhoneNumber {
  /** Exactly how the number should be shown to a visitor. */
  display: string
  /** E.164 form used for tel: links, or null when no confirmed format exists. */
  e164: string | null
}

export interface ContactConfig {
  name: string
  role: string
  email: string
  /** Prefilled subject for the direct "Send Email" action. */
  emailSubject: string
  /** Public location only — the full residential address is never shown on the site. */
  location: string
  phone: PhoneNumber
  secondaryPhone: PhoneNumber
  whatsappUrl: string
  /** Public LinkedIn profile. */
  linkedinUrl: string
}

export const contact: ContactConfig = {
  name: 'Eucharia Emerie MBA',
  role: 'Healthcare Operations & Administration',
  email: 'Eucharia.goldmba@gmail.com',
  emailSubject: 'Professional Enquiry: Eucharia Emerie MBA',
  location: 'Abuja, Nigeria',

  phone: {
    display: '08086106242',
    e164: '+2348086106242',
  },

  /**
   * Second number, corrected by the client.
   *
   * NOTE: the source PDF prints 090928868926 (12 digits), which is one digit
   * too long to dial. The correct number is 09092868926 (11 digits), giving a
   * valid +234 plus 10 E.164 form. The PDF still carries the typo and should be
   * corrected at source.
   */
  secondaryPhone: {
    display: '09092868926',
    e164: '+2349092868926',
  },

  whatsappUrl: 'https://wa.me/2348086106242',
  linkedinUrl: 'https://www.linkedin.com/in/eucharia-emerie-mba/',
}

/** mailto: URL with a professional prefilled subject. */
export const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(contact.emailSubject)}`

/** tel: URL for the confirmed primary number. */
export const telUrl = `tel:${contact.phone.e164}`

/** tel: URL for the secondary number, or null when no confirmed format exists. */
export const secondaryTelUrl = contact.secondaryPhone.e164
  ? `tel:${contact.secondaryPhone.e164}`
  : null
