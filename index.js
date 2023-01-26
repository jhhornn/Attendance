const dotenv = require("dotenv")
dotenv.config()
const app = require("./app")
const connectDB = require("./config/database")
const http = require("http")

const PORT = process.env.PORT || 2020
const server = http.createServer(app)

connectDB().then(() => {
  server.listen(PORT, async () => {
    console.log(`Server started at http://localhost:${PORT}`)
  })
})
