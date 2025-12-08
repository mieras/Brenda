/**
 * File validation and security checks
 */

const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
const ALLOWED_PDF_TYPE = 'application/pdf'
const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_PDF_SIZE = 5 * 1024 * 1024 // 5MB

const BLOCKED_EXTENSIONS = ['.exe', '.sh', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js', '.jar']

export interface ValidationResult {
  valid: boolean
  error?: string
}

export function validateFile(file: File): ValidationResult {
  // Check file size
  if (file.type.startsWith('image/')) {
    if (file.size > MAX_IMAGE_SIZE) {
      return {
        valid: false,
        error: `Image file is too large. Maximum size is ${MAX_IMAGE_SIZE / 1024 / 1024}MB.`
      }
    }
  } else if (file.type === ALLOWED_PDF_TYPE) {
    if (file.size > MAX_PDF_SIZE) {
      return {
        valid: false,
        error: `PDF file is too large. Maximum size is ${MAX_PDF_SIZE / 1024 / 1024}MB.`
      }
    }
  }

  // Check file extension
  const fileName = file.name.toLowerCase()
  const hasBlockedExtension = BLOCKED_EXTENSIONS.some(ext => fileName.endsWith(ext))
  if (hasBlockedExtension) {
    return {
      valid: false,
      error: 'This file type is not allowed for security reasons.'
    }
  }

  // Check MIME type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type) && file.type !== ALLOWED_PDF_TYPE) {
    return {
      valid: false,
      error: 'Only PNG, JPG, and PDF files are supported.'
    }
  }

  // SVG security check (if SVG support is added later)
  if (file.type === 'image/svg+xml') {
    return {
      valid: false,
      error: 'SVG files are not currently supported for security reasons.'
    }
  }

  return { valid: true }
}

export function isValidImageFile(file: File): boolean {
  return ALLOWED_IMAGE_TYPES.includes(file.type)
}

export function isValidPdfFile(file: File): boolean {
  return file.type === ALLOWED_PDF_TYPE
}

