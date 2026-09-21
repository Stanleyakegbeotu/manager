import { useId, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { contact, mailtoUrl, secondaryTelUrl, telUrl } from '../config/contact'
import { FORMSPREE_ENDPOINT, isFormspreeConfigured } from '../config/site'

const REASON_OPTIONS = [
  'Professional Opportunity',
  'Recruitment',
  'Business Enquiry',
  'Collaboration',
  'General Enquiry',
  'Other',
] as const

export type ContactReason = (typeof REASON_OPTIONS)[number]

export interface ContactFormData {
  name: string
  email: string
  phone: string
  organisation: string
  reason: ContactReason | ''
  message: string
}

export type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

type FieldErrors = Partial<Record<keyof ContactFormData, string>>

const EMPTY_FORM: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  organisation: '',
  reason: '',
  message: '',
}

const LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  organisation: 120,
  message: 3000,
} as const

const MESSAGE_MIN = 10

function validate(form: ContactFormData): FieldErrors {
  const errors: FieldErrors = {}

  const name = form.name.trim()
  if (!name) errors.name = 'Please enter your full name.'
  else if (name.length > LIMITS.name) errors.name = `Please keep this under ${LIMITS.name} characters.`

  const email = form.email.trim()
  if (!email) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.'
  else if (email.length > LIMITS.email) errors.email = 'That email address is too long.'

  // Phone is optional and international formats vary widely, so only the
  // obviously-wrong cases are rejected.
  const phone = form.phone.trim()
  if (phone) {
    if (phone.length > LIMITS.phone) errors.phone = 'That phone number is too long.'
    else if (!/^[+()\-.\s\d]{6,}$/.test(phone)) errors.phone = 'Please enter a valid phone number.'
  }

  if (form.organisation.trim().length > LIMITS.organisation) {
    errors.organisation = `Please keep this under ${LIMITS.organisation} characters.`
  }

  if (!form.reason) errors.reason = 'Please select a reason for contact.'

  const message = form.message.trim()
  if (!message) errors.message = 'Please enter your message.'
  else if (message.length < MESSAGE_MIN) errors.message = `Please write at least ${MESSAGE_MIN} characters.`
  else if (message.length > LIMITS.message) errors.message = `Please keep this under ${LIMITS.message} characters.`

  return errors
}

export default function Contact() {
  const ref = useScrollReveal()
  const fieldId = useId()

  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [state, setState] = useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  // Bots fill hidden fields; humans never see this one.
  const [honeypot, setHoneypot] = useState('')

  const update = <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (state === 'submitting') return

    const found = validate(form)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }

    // Silently accept and discard obvious bot submissions.
    if (honeypot.trim()) {
      setState('success')
      return
    }

    if (!isFormspreeConfigured) {
      setState('error')
      setErrorMessage(
        'The contact form is not configured yet. Please contact me directly by email in the meantime.',
      )
      return
    }

    setState('submitting')
    setErrorMessage('')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          organisation: form.organisation.trim(),
          reason: form.reason,
          message: form.message.trim(),
          // Formspree reads _subject as the email subject line. With the
          // Subject field gone, build one from the reason and the sender's
          // name so her inbox still shows something meaningful.
          _subject: `${form.reason}: ${form.name.trim()}`,
        }),
      })

      // Only a confirmed success clears the form — never assume delivery.
      if (response.ok) {
        setState('success')
        setForm(EMPTY_FORM)
        setErrors({})
        return
      }

      setState('error')
      setErrorMessage('Your message could not be sent. Please try again or contact me directly by email.')
    } catch {
      setState('error')
      setErrorMessage('Your message could not be sent. Please check your connection and try again.')
    }
  }

  const inputBase: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#FAF9F6',
    border: '1px solid #DEDDD8',
    borderRadius: '8px',
    padding: '12px 16px',
    // 16px minimum: iOS Safari auto-zooms the page when a focused input has
    // smaller text, which visibly jerks the layout on every field.
    fontSize: '16px',
    color: '#252525',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  }

  const disabled = state === 'submitting'

  const renderField = (
    key: Exclude<keyof ContactFormData, 'reason' | 'message'>,
    label: string,
    options: { required?: boolean; type?: string; placeholder?: string; autoComplete?: string } = {},
  ) => {
    const { required = true, type = 'text', placeholder = '', autoComplete } = options
    const id = `${fieldId}-${key}`
    const errorId = `${id}-error`
    const hasError = Boolean(errors[key])

    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium mb-2" style={{ color: '#252525' }}>
          {label}
          {required && <span style={{ color: '#102A43' }}> *</span>}
        </label>
        <input
          id={id}
          name={key}
          type={type}
          value={form[key]}
          onChange={(e) => update(key, e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          maxLength={LIMITS[key]}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          style={{ ...inputBase, borderColor: hasError ? '#B91C1C' : '#DEDDD8' }}
          onFocus={(e) => {
            e.target.style.borderColor = '#102A43'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = hasError ? '#B91C1C' : '#DEDDD8'
          }}
        />
        {hasError && (
          <p id={errorId} className="mt-1.5 text-sm" style={{ color: '#B91C1C' }}>
            {errors[key]}
          </p>
        )}
      </div>
    )
  }

  const reasonId = `${fieldId}-reason`
  const messageId = `${fieldId}-message`

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal py-24 lg:py-32"
      style={{ backgroundColor: '#F4F2ED' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_580px] gap-16 items-start">
          {/* Left info */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#102A43' }}>
              Contact
            </p>
            <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-6 leading-tight" style={{ color: '#102A43' }}>
              Get In Touch
            </h2>
            <p className="text-base leading-relaxed mb-12" style={{ color: '#4A4A4A', maxWidth: '380px' }}>
              I'm open to professional opportunities, collaborations and meaningful conversations. Send me a message and I'll get back to you as soon as possible.
            </p>

            <div className="space-y-6">
              <a href={mailtoUrl} className="flex items-start gap-4 group">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#FAF9F6', color: '#102A43' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase mb-0.5" style={{ color: '#666666' }}>
                    Email
                  </p>
                  <p className="text-sm font-medium group-hover:underline" style={{ color: '#252525' }}>
                    {contact.email}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#FAF9F6', color: '#102A43' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase mb-0.5" style={{ color: '#666666' }}>
                    Location
                  </p>
                  <p className="text-sm font-medium" style={{ color: '#252525' }}>
                    {contact.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#FAF9F6', color: '#102A43' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase mb-0.5" style={{ color: '#666666' }}>
                    Phone
                  </p>
                  <a href={telUrl} className="text-sm font-medium block hover:underline" style={{ color: '#252525' }}>
                    {contact.phone.display}
                  </a>
                  {secondaryTelUrl ? (
                    <a href={secondaryTelUrl} className="text-sm block hover:underline" style={{ color: '#4A4A4A' }}>
                      {contact.secondaryPhone.display}
                    </a>
                  ) : (
                    <span className="text-sm block" style={{ color: '#4A4A4A' }}>
                      {contact.secondaryPhone.display}
                    </span>
                  )}
                </div>
              </div>

              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#FAF9F6', color: '#102A43' }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase mb-0.5" style={{ color: '#666666' }}>
                    LinkedIn
                  </p>
                  <p className="text-sm font-medium group-hover:underline" style={{ color: '#252525' }}>
                    linkedin.com/in/eucharia-emerie-mba
                  </p>
                </div>
              </a>
            </div>

            {/* Direct actions */}
            <div className="mt-12 flex flex-wrap gap-3">
              <a
                href={mailtoUrl}
                className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border transition-all hover:bg-navy hover:text-white hover:border-navy"
                style={{ borderColor: '#102A43', color: '#102A43' }}
              >
                Send Email
              </a>
              <a
                href={contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border transition-all"
                style={{ borderColor: '#DEDDD8', color: '#4A4A4A' }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl p-8 lg:p-10" style={{ backgroundColor: '#FAF9F6', border: '1px solid #DEDDD8' }}>
            {state === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center py-12" role="status">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: '#D1FAE5' }}
                >
                  <svg
                    className="w-7 h-7"
                    style={{ color: '#065F46' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif font-semibold text-2xl mb-3" style={{ color: '#102A43' }}>
                  Message Sent
                </h3>
                <p className="text-sm leading-relaxed mb-8" style={{ color: '#4A4A4A' }}>
                  Message sent successfully. Thank you for getting in touch.
                </p>
                <button
                  onClick={() => setState('idle')}
                  className="text-sm font-medium underline"
                  style={{ color: '#102A43' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-5">
                  {renderField('name', 'Full Name', {
                    placeholder: 'Enter your full name',
                    autoComplete: 'name',
                  })}
                  {renderField('email', 'Email Address', {
                    type: 'email',
                    placeholder: 'yourname@example.com',
                    autoComplete: 'email',
                  })}

                  <div className="grid sm:grid-cols-2 gap-5">
                    {renderField('phone', 'Phone Number', {
                      required: false,
                      type: 'tel',
                      placeholder: 'Optional',
                      autoComplete: 'tel',
                    })}
                    {renderField('organisation', 'Organisation / Company', {
                      required: false,
                      placeholder: 'Optional',
                      autoComplete: 'organization',
                    })}
                  </div>

                  {/* Reason */}
                  <div>
                    <label htmlFor={reasonId} className="block text-sm font-medium mb-2" style={{ color: '#252525' }}>
                      Reason for Contact <span style={{ color: '#102A43' }}>*</span>
                    </label>
                    <select
                      id={reasonId}
                      name="reason"
                      value={form.reason}
                      onChange={(e) => update('reason', e.target.value as ContactReason | '')}
                      disabled={disabled}
                      aria-invalid={Boolean(errors.reason)}
                      aria-describedby={errors.reason ? `${reasonId}-error` : undefined}
                      style={{
                        ...inputBase,
                        borderColor: errors.reason ? '#B91C1C' : '#DEDDD8',
                        cursor: 'pointer',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 12px center',
                        backgroundSize: '16px',
                        paddingRight: '40px',
                      }}
                    >
                      <option value="">Select a reason</option>
                      {REASON_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {errors.reason && (
                      <p id={`${reasonId}-error`} className="mt-1.5 text-sm" style={{ color: '#B91C1C' }}>
                        {errors.reason}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor={messageId} className="block text-sm font-medium mb-2" style={{ color: '#252525' }}>
                      Message <span style={{ color: '#102A43' }}>*</span>
                    </label>
                    <textarea
                      id={messageId}
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder="Type your message here..."
                      maxLength={LIMITS.message}
                      disabled={disabled}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? `${messageId}-error` : undefined}
                      style={{
                        ...inputBase,
                        borderColor: errors.message ? '#B91C1C' : '#DEDDD8',
                        resize: 'vertical',
                        minHeight: '120px',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#102A43'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.message ? '#B91C1C' : '#DEDDD8'
                      }}
                    />
                    {errors.message && (
                      <p id={`${messageId}-error`} className="mt-1.5 text-sm" style={{ color: '#B91C1C' }}>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Honeypot — visually hidden, never announced, never focusable */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                  />

                  {state === 'error' && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 px-4 py-3 rounded-lg"
                      style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}
                    >
                      <svg
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: '#B91C1C' }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-sm" style={{ color: '#B91C1C' }}>
                        {errorMessage}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={disabled}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-white font-semibold text-base transition-all duration-200 hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: '#102A43' }}
                  >
                    {disabled ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
