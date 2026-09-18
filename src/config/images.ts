/**
 * Image assets served from /public/images.
 *
 * No remote/stock image is referenced, so production never depends on a
 * third-party image host.
 */

export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
}

/** Supplied professional portrait. Native 1122x1402 — a true 4:5 crop. */
export const portrait: ImageAsset = {
  src: '/images/eucharia-portrait.jpeg',
  alt: 'Eucharia Emerie MBA, professional portrait',
  width: 1122,
  height: 1402,
}

/**
 * Backdrop image for the Training section. Rendered heavily faded behind the
 * text, so it reads as a soft editorial background rather than a photograph.
 * Alt is intentionally empty: it is decorative and carries no information the
 * surrounding copy does not already provide, so screen readers should skip it.
 */
export const trainingImage: ImageAsset = {
  src: '/images/training-backdrop.jpeg',
  alt: '',
  width: 1122,
  height: 1402,
}
