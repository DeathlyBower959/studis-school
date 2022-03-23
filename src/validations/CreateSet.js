export default function validate(values, isSubmit) {
    let errors = {}

    if (values.title || isSubmit) {
        if (!values.title) errors.title = 'Set name required'
        else if (values.title?.toString().trim() === '')
            errors.title = 'Set name required'
    }

    if (values.description || isSubmit) {
        if (!values.description) errors.description = 'Set description is required'
        else if (values.description?.toString().trim() === '')
            errors.description = 'Set description is required'
    }

    if (values.terms || isSubmit) {
        if (values.terms.length === 0) errors.terms = 'Missing terms!'
    }

    return errors
}
