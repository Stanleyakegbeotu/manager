import { useRef } from 'react'
import { contact, mailtoUrl, telUrl } from '../config/contact'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useScrollLock } from '../hooks/useScrollLock'

interface ConnectSheetProps {
  isOpen: boolean
  onClose: () => void
  onEnquiry: () => void
}

const WhatsAppIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

interface SheetOption {
  key: string
  title: string
  desc: string
  href: string | null
  icon: React.ReactNode
  external?: boolean
}

const options: SheetOption[] = [
  { key: 'email', title: 'Send Email', desc: contact.email, href: mailtoUrl, icon: <MailIcon /> },
  {
    key: 'whatsapp',
    title: 'Message on WhatsApp',
    desc: 'Chat with me directly.',
    href: contact.whatsappUrl,
    icon: <WhatsAppIcon />,
    external: true,
  },
  { key: 'call', title: 'Call', desc: 'Speak with me.', href: telUrl, icon: <PhoneIcon /> },
  { key: 'enquiry', title: 'Send an Enquiry', desc: 'Go to contact form.', href: null, icon: <DocumentIcon /> },
]

export default function ConnectSheet({ isOpen, onClose, onEnquiry }: ConnectSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)

  useScrollLock(isOpen)
  useFocusTrap(isOpen, sheetRef, onClose)

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="connect-sheet-title"
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          backgroundColor: '#FAF9F6',
          borderRadius: '20px 20px 0 0',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          // Keeps the closed sheet out of the tab order without losing the slide.
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'transform 400ms ease-out, visibility 400ms ease-out',
          paddingBottom: 'max(env(safe-area-inset-bottom), 24px)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        }}
      >
        {/* Drag indicator */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: '#DEDDD8' }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h2 id="connect-sheet-title" className="font-serif font-semibold text-xl" style={{ color: '#102A43' }}>
              Let's Connect
            </h2>
            <p className="text-sm mt-0.5" style={{ color: '#666666' }}>
              Choose how you would like to get in touch.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0"
            style={{ backgroundColor: '#F4F2ED', color: '#4A4A4A' }}
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Options */}
        <div className="px-4 pb-2">
          {options.map((opt, i) => {
            const inner = (
              <div className="flex items-center gap-4 px-4 py-4 rounded-2xl transition-colors hover:bg-ivory-alt">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#F4F2ED', color: '#102A43' }}
                >
                  {opt.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: '#252525' }}>
                    {opt.title}
                  </p>
                  <p className="text-sm mt-0.5 truncate" style={{ color: '#666666' }}>
                    {opt.desc}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: '#DEDDD8' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )

            const divider = i < options.length - 1 && (
              <div className="mx-4" style={{ height: '1px', backgroundColor: '#DEDDD8' }} />
            )

            if (opt.href === null) {
              return (
                <div key={opt.key}>
                  <button className="w-full text-left" onClick={onEnquiry}>
                    {inner}
                  </button>
                  {divider}
                </div>
              )
            }

            return (
              <div key={opt.key}>
                <a
                  href={opt.href}
                  target={opt.external ? '_blank' : undefined}
                  rel={opt.external ? 'noopener noreferrer' : undefined}
                  onClick={onClose}
                  className="block"
                >
                  {inner}
                </a>
                {divider}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
