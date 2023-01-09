const handleErrors = (err) => {
    let errors = { email: "", password: "" }

    // duplicate error
    if (err.code === 11000){
        errors.email = "the email is already in use"
        return errors
    }

    //validation errors
    if (err.message.includes("user validation failed")){
        // destructuring inside the forEach, similar to (err) => {err.properties}
        Object.values(err.message).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

module.exports = handleErrors