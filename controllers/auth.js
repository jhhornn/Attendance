const User = require("../models/auth")
const handleError = require("../utils/errHandler")

module.exports.signupGet = (req, res) => {
    res.render("pages/signup", { 
        title: "SignUp Page"
    })
}

module.exports.loginGet = (req, res) => {
    res.render("pages/login", { 
        title: "Login Page"
    })
}

module.exports.signupPost = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.create({ email, password })
        res.status(201).json(user)
    } catch (err) {
        const errors = handleError(err)
        res.status(400).json({ errors })

    }
}

module.exports.loginPost = async (req, res) => {
    res.send("pages/login")
}
