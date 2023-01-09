const mongoose = require("mongoose")
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
        capitalize: true,
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"],
        capitalize: true,
    },
    password: {
        type: String,
        required:  [true, "Please enter password"],
        minlength: [6, "Minimum password length is 6 characters"]
    }
})

AuthSchema.pre("save", async function (next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model("user",  AuthSchema)
module.exports = User