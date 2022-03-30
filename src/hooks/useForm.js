import { useState, useEffect } from 'react'

const useForm = (
  callback,
  validate,
  defaultValues = {},
  customFunctions = {}
) => {
  const [values, setValues] = useState(defaultValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback()
    }
  }, [errors])

  const handleSubmit = (event) => {
    if (customFunctions.handleSubmit) return customFunctions.handleSubmit(event)

    event?.preventDefault()

    setErrors(() => {
      const validation = validate(values, true)

      setIsSubmitting(Object.keys(validation).length === 0)

      return validation
    })
  }

  const handleChange = (event) => {
    if (customFunctions.handleChange) return customFunctions.handleChange(event)
    event?.persist()

    setErrors((prev) => {
      return { ...prev, [event.target.name]: null }
    })

    setValues((prev) => {
      return {
        ...prev,
        [event.target.name]:
          event.target.value === 'on' || event.target.value === 'off'
            ? event.target.checked
            : event.target.value
      }
    })
  }

  const addError = (name, message) => {
    if (customFunctions.addError) return customFunctions.addError(name, message)

    setErrors((prev) => {
      return { ...prev, [name]: message }
    })
  }

  return {
    addError,
    handleChange,
    setErrors,
    setValues,
    setIsSubmitting,
    handleSubmit,
    values,
    errors
  }
}

export default useForm
