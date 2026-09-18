import { useEffect } from 'react'

/**
 * Locks background scrolling while an overlay is open.
 *
 * Reference-counted on purpose: the mobile menu and the connect sheet can hand
 * over to one another, and two components each writing `document.body.style`
 * independently would let the last unmount clear a lock the other still needs.
 */
let lockCount = 0
let previousOverflow = ''

export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return

    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    lockCount += 1

    return () => {
      lockCount -= 1
      if (lockCount === 0) document.body.style.overflow = previousOverflow
    }
  }, [locked])
}
