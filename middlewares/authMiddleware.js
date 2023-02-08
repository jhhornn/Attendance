const jwt = require("jsonwebtoken")

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.redirect("/login")
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    res.redirect("/login")
  }
}

const requireOauth = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.redirect("/login")
  }
}

const overAuth = (req, res, next) => {
  try {
    if (req.cookies && req.cookies.jwt) {
      requireAuth(req, res, next)
    } else {
      requireOauth(req, res, next)
    }
  } catch (err) {
    res.redirect("/login")
  }
}

module.exports = overAuth
