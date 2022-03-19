export default function validate(values, isSubmit) {
  let errors = {}

  if (values.name || isSubmit) {
    if (!values.name) errors.name = 'Your name is required'
    else if (values.name?.toString().trim() == '')
      errors.name = 'Your name is required'
  }

  if (values.email || isSubmit) {
    if (!values.email) errors.email = 'Your email is required'
    else if (values.email?.toString().trim() == '')
      errors.email = 'Your email is required'
    else if (!/\S+@\S+\.\S+/.test(values.email))
      errors.email = 'Email address is invalid'
  }

  if (values.password || isSubmit) {
    if (!values.password) errors.password = 'Your password is required'
    else if (values.password.toString().trim() == '')
      errors.password = 'Your password is required'
    else if (values.password?.length < 8)
      errors.password = 'Password must be 8 or more characters'
  }
  if (values.confirmPassword || isSubmit) {
    if (!values.confirmPassword)
      errors.confirmPassword = 'Password does not match'
    else if (values.confirmPassword.toString().trim() == '')
      errors.confirmPassword = 'Password does not match'
    else if (values.confirmPassword?.length < 8)
      errors.confirmPassword = 'Password does not match'
  }

  return errors
}
