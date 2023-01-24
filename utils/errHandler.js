const handleErrors = (err) => {
  let errors = { email: "", firstName: "", lastName: "", password: "" }

  // incorrect login email
  if(err.message === "incorrect email") {
    errors.email = "email not registered"
  }

  // incorrect login password
  if(err.message === "incorrect password") {
    errors.password = "incorrect password"
  }

  // duplicate error
  if (err.code === 11000) {
    errors.email = "the email is already in use"
    return errors
  }

  //validation errors
  if (err.message.includes("auth validation failed")) {
    // destructuring inside the forEach, similar to (err) => {err.properties}
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors
}

module.exports = handleErrors
