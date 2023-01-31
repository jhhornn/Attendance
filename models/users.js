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
      required: [true, "Please input email"],
      unique: false
    },
    phone: {
      type: String,
      required: [true, "Please input phone number"]
    },
    image: {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      filename: {
        type: String,
        required: true
      }
    },
    owner: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)
