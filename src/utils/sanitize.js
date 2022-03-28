import DOMPurify from 'dompurify'

const defaultOptions = {
  ALLOWED_TAGS: [],
  ALLOWED_ATTR: []
}

export const sanitize = (dirty, options) => ({
  __html: DOMPurify.sanitize(dirty, { ...defaultOptions, ...options })
})
