const express = require("express")
const session = require("express-session")
const attRoute = require("./routes/routes")
const authRoute = require("./routes/auth")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false
  })
)

app.use((req, res, next) => {
  res.locals.message = req.session.message
  res.locals.content = req.session.content
  delete req.session.message
  delete req.session.content
  next()
})

// set teplate engine
app.set("view engine", "ejs")

// use external css file
app.use(express.static("public"))
app.use(express.static("uploads"))

//route
app.use("/", authRoute)
app.use("/", attRoute)

// app.get("/", (req, res) => {
//     res.send("Hello World")
// })
module.exports = app
