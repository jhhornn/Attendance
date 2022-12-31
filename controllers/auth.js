const User = require("../models/auth")

module.exports.signupGet = (req, res) => {
    res.render("pages/signup")
}

module.exports.loginGet = (req, res) => {
    res.render("pages/login")
}

module.exports.signupPost = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.create({ email, password })
        res.status(201).json(user)
    } catch (err) {
        console.log(err)
        res.status(400).send("error, user not created")

    }
}

module.exports.loginPost = async (req, res) => {
    res.send("pages/login")
}
