require("dotenv").config()
const express = require("express")
const session = require("express-session")
const route = require("./routes/routes")

const app = express()


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(session({
    secret: "my secret keys",
    saveUninitialized: true,
    resave: false
}))


app.use((req, res, next) => {
    res.locals.message = req.session.message
    delete req.session.message
    next()
})


// set teplate engine
app.set("view engine", "ejs")

// use external css file
app.use(express.static("public"))
app.use(express.static("uploads"))


//route
app.use("/", route)

// app.get("/", (req, res) => {
//     res.send("Hello World")
// })
module.exports = app