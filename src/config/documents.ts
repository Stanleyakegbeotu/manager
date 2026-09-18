/**
 * Canonical paths for the downloadable CV documents.
 * Every download/view action in the UI must read from here so there is exactly
 * one path per document and no broken links can drift into components.
 */

export interface DocumentsConfig {
  /** Authoritative CV, served from /public/documents. */
  pdfPath: string
  /** Word version; null until a real .docx exists so the UI can hide the action. */
  docxPath: string | null
  /** External Google Docs link; null until a real URL is supplied. */
  googleDocsUrl: string | null
  /** Filename suggested to the browser when downloading. */
  downloadName: string
  /** Human-readable document title shown in the CV viewer toolbar. */
  title: string
}

export const documents: DocumentsConfig = {
  pdfPath: '/documents/Eucharia-Emerie-MBA-CV.pdf',
  docxPath: '/documents/Eucharia-Emerie-MBA-CV.docx',
  googleDocsUrl: null,
  downloadName: 'Eucharia-Emerie-MBA-CV.pdf',
  title: 'Eucharia Emerie MBA CV',
}
