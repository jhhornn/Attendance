const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { Schema } = mongoose
const { isEmail } = require("validator")

const AuthSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "please enter a valid email"]
  },
  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
    capitalize: true
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name"],
    capitalize: true
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [6, "Minimum password length is 6 characters"]
  }
})

AuthSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Static method to login users

AuthSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error("Incorrect password")
  }

  throw Error("Incorrect email")
}

const Auth = mongoose.model("auth", AuthSchema)
module.exports = Auth
