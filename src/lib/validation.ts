import validator from 'validator'

export function sanitizeString(input: string, maxLength = 500): string {
  let sanitized = validator.escape(input.trim()).slice(0, maxLength)
  return sanitized
}

export function validateEmail(email: string): boolean {
  return validator.isEmail(email)
}

export function validateString(input: unknown, min = 1, max = 500): input is string {
  if (typeof input !== 'string') return false
  const trimmed = input.trim()
  return trimmed.length >= min && trimmed.length <= max
}

export function validatePhone(phone: string): boolean {
  return validator.isMobilePhone(phone, 'any')
}

/** Allowed file types by route */
export const ALLOWED_FILE_TYPES: Record<string, { mime: string[]; ext: string[] }> = {
  pdf: {
    mime: ['application/pdf'],
    ext: ['.pdf'],
  },
  cv: {
    mime: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    ext: ['.pdf', '.doc', '.docx'],
  },
  image: {
    mime: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    ext: ['.jpg', '.jpeg', '.png', '.webp'],
  },
}

/** Upload size limits in bytes */
export const FILE_SIZE_LIMITS = {
  pdf: 10 * 1024 * 1024,    // 10 MB
  cv: 5 * 1024 * 1024,      // 5 MB
  image: 15 * 1024 * 1024,  // 15 MB
}

export function isValidFile(file: File, type: 'pdf' | 'cv' | 'image'): { valid: true } | { valid: false; reason: string } {
  if (!file || file.size === 0) {
    return { valid: false, reason: 'No file provided' }
  }

  const sizeLimit = FILE_SIZE_LIMITS[type]
  if (file.size > sizeLimit) {
    return { valid: false, reason: `File too large. Max allowed: ${(sizeLimit / 1024 / 1024).toFixed(0)} MB` }
  }

  const allowed = ALLOWED_FILE_TYPES[type]
  const ext = '.' + (file.name.split('.').pop()?.toLowerCase() || '')
  if (!allowed.ext.includes(ext)) {
    return { valid: false, reason: `Invalid file type. Allowed: ${allowed.ext.join(', ')}` }
  }

  // Also sanity-check MIME (if browser sent one)
  if (file.type && !allowed.mime.includes(file.type)) {
    // Allow empty type for some clients, but block clearly wrong ones
    if (!['', 'application/octet-stream'].includes(file.type)) {
      return { valid: false, reason: `Invalid MIME type: ${file.type}` }
    }
  }

  return { valid: true }
}
