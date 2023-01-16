const Auth = require("../models/auth")
const handleError = require("../utils/errHandler")

const maxAge = 3 * 24 * 60 * 60
const createToken = (id, firstName, lastName) => {
  return jwt.sign({ id, firstName, lastName }, "secret token", {
    expiresIn: maxAge
  })
}

module.exports.signupGet = (req, res) => {
  res.render("pages/signup", {
    title: "SignUp Page",
    error: "",
    content: ""
  })
}

module.exports.loginGet = (req, res) => {
  res.render("pages/login", {
    title: "Login Page"
  })
}

module.exports.signupPost = async (req, res) => {
  const { email, firstName, lastName, password } = req.body
  try {
    const user = await Auth.create({ email, firstName, lastName, password })
    const token = createToken(user._id, user.firstName, user.lastName)
    res.cookies("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(201).json({ user: user._id })
  } catch (err) {
    const errors = handleError(err)
    // res.json({ error: errors })
    req.session.content = {
      email: email,
      firstName: firstName,
      lastName: lastName
    }
    res.render("pages/signup", {
      title: "Login Page",
      error: errors,
      content: req.session.content
    })
  }
}

module.exports.loginPost = async (req, res) => {
  res.send("pages/login")
}
