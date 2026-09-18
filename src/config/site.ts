/**
 * Site-wide values that would otherwise go stale or be duplicated.
 */

/** First documented role on the CV: Front Desk Officer, Echo Scan Services, 09/2017. */
export const CAREER_START_YEAR = 2017

/**
 * Years of professional experience derived from the documented career start
 * rather than hard-coded, so the figure never becomes stale.
 */
export function yearsOfExperience(now: Date = new Date()): number {
  return Math.max(0, now.getFullYear() - CAREER_START_YEAR)
}

/** Formspree endpoint, supplied per-environment. Empty when not configured. */
export const FORMSPREE_ENDPOINT: string = import.meta.env.VITE_FORMSPREE_ENDPOINT ?? ''

/** True when the contact form is able to actually submit. */
export const isFormspreeConfigured = FORMSPREE_ENDPOINT.trim().length > 0
