const { Router } = require("express")
const passport = require("passport")

const oauthRouter = Router()


// auth with google
oauthRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
)

oauthRouter.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/")
  }
)

module.exports = oauthRouter
