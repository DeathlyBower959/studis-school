export default function validate(values, isSubmit) {
    let errors = {}

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

    return errors
}
