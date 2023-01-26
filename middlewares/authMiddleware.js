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

module.exports = requireAuth
