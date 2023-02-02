const { Router } = require("express")
const authRouter = require("./auth")

const oauthRouter = Router()

// auth login
authRouter.get("/login", (req, res) => {
    res.render("pages/login")
})

// auth logout
authRouter.get("/logout", (req, res) => {
    res.send("logging out")
})

// auth with google
authRouter.get("login", (req, res) => {
    res.send("logging in with google")
})