export default function validate(values, isSubmit) {
  let errors = {}

  if (values.word || isSubmit) {
    if (!values.word) errors.word = 'Word is required'
    else if (values.word?.toString().trim() === '')
      errors.word = 'Word is required'
  }

  if (values.def || isSubmit) {
    if (!values.def) errors.def = 'Definition is required'
    else if (values.def?.toString().trim() === '')
      errors.def = 'Definition is required'
  }

  if (values.type || isSubmit) {
    if (!values.type) errors.type = 'Word type is required'
    else if (values.type?.toString().trim() === '')
      errors.type = 'Word type is required'
    else if (values.type?.toString() === 'none')
      errors.type = 'Word type is required'
  }
  return errors
}
