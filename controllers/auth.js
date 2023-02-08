const Auth = require("../models/auth")
const handleError = require("../utils/errHandler")
const jwt = require("jsonwebtoken")

const maxAge = 3 * 24 * 60 * 60
const createToken = (id, firstName, lastName) => {
  return jwt.sign({ id, firstName, lastName }, process.env.JWT_SECRET_KEY, {
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
    title: "Login Page",
    error: "",
    content: ""
  })
}

module.exports.signupPost = async (req, res) => {
  const { email, firstName, lastName, password } = req.body
  try {
    const user = await Auth.create({ email, firstName, lastName, password })
    const token = createToken(user._id, user.firstName, user.lastName)
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.redirect("/")
  } catch (err) {
    const errors = handleError(err)
    req.session.content = {
      email: email,
      firstName: firstName,
      lastName: lastName
    }
    res.render("pages/signup", {
      title: "Signup Page",
      error: errors,
      content: req.session.content
    })
  }
}

module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await Auth.login(email, password)
    const token = createToken(user._id, user.firstName, user.lastName)
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.redirect("/")
  } catch (err) {
    console.log(err)
    const errors = handleError(err)

    req.session.content = {
      email: email
    }

    res.render("pages/login", {
      title: "Login Page",
      error: errors,
      content: req.session.content
    })
  }
}

module.exports.logout = async (req, res) => {
  const logout = req.user
    ? req.logout(function (err) {
        if (err) {
          next(err)
        }
      })
    : res.cookie("jwt", "", { maxAge: 1 })
  if (logout) {
    return res.redirect("/login")
  }
  res.redirect("/login")
}
