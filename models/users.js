const mongoose = require("mongoose")
const { Schema } = mongoose

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please input name"]
    },
    email: {
      type: String,
      required: [true, "Please input email"]
    },
    phone: {
      type: String,
      required: [true, "Please input phone number"]
    },
    image: {
      type: String,
      required: [true, "Please insert image"]
    },
    owner: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)
