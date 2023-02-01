const User = require("../models/users")
const fs = require("fs")
const cloudinary = require("../utils/cloudinary")
const handleError = require("../utils/errHandler")


const postDetails = async (req, res) => {
  const { name, email, phone } = req.body
  const file = req.files.image
  
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "attendance"
  })
  try {
    const user = new User({
      name,
      email,
      phone,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
        filename: result.original_filename
      },
      owner: req.decodedToken.id
    })

    await user.save()

    req.session.message = {
      type: "success",
      message: "User added successfully"
    }
    res.redirect("/")
  } catch (err) {
    const errors = handleError(err)

    fs.unlinkSync("./tmp/" + result.original_filename)
    await cloudinary.uploader.destroy(result.public_id)

    req.session.content = {
      name: name,
      email: email,
      phone: phone
    }

    res.render("pages/add_users", {
      title: "Add Users",
      error: errors,
      content: req.session.content,
      person: req.decodedToken.firstName
    })

    // res.json({ message: err.message, type: "danger" })
  }
}

const getHomepage = async (req, res) => {
  try {
    const users = await User.find({})

    res.render("pages/index", {
      title: "Home Page",
      users: users,
      person: req.decodedToken.firstName
    })
  } catch (err) {
    res.json({ message: err.message })
  }
}

const getYourPage = async (req, res) => {
  try {
    const users = await User.find({ owner: req.decodedToken.id })

    res.render("pages/your_users", {
      title: "Home Page",
      users: users,
      person: req.decodedToken.firstName
    })
  } catch (err) {
    res.json({ message: err.message })
  }
}

const getEditPage = async (req, res) => {
  try {
    const id = req.params.id

    const user = await User.findById(id)

    if (user === null) {
      res.redirect("/")
    } else {
      res.render("pages/edit_users", {
        title: "Edit User",
        user: user,
        person: req.decodedToken.firstName
      })
    }
  } catch (err) {
    res.redirect("/")
  }
}

const updateDetails = async (req, res) => {
  try {
    const id = req.params.id
    const detail = await User.findById(id)
    const file = req.files.image

    let new_image = null
    if (req.files.image) {
      result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "attendance"
      })
      new_image = {
        public_id: result.public_id,
        url: result.secure_url,
        filename: result.original_filename
      }
      try {
        if (detail.image.filename !== undefined) {
          fs.unlinkSync("./tmp/" + detail.image.filename)
        }
        await cloudinary.uploader.destroy(detail.image.public_id)
      } catch (err) {
        console.log(err)
      }
    } else {
      new_image = detail.image
    }

    await User.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: new_image
    })

    req.session.message = {
      type: "success",
      message: "User updated successfully"
    }
    res.redirect("/")
  } catch (err) {
    req.session.message = {
      message: err.message,
      type: "danger"
    }

    res.redirect("/myusers")
  }
}

const deleteDetails = async (req, res) => {
  try {
    const id = req.params.id
    const result = await User.findByIdAndRemove(id)

    if (result.image != "") {
      try {
        if (result.image.filename !== undefined) {
          fs.unlinkSync("./tmp/" + result.image.filename)
        }
        await cloudinary.uploader.destroy(result.image.public_id)
      } catch (err) {
        console.log(err)
      }
    }

    req.session.message = {
      type: "info",
      message: "User deleted successfully"
    }
    res.redirect("/myusers")
  } catch (err) {
    res.json({ message: err.message })
  }
}

module.exports = {
  postDetails,
  getHomepage,
  getYourPage,
  getEditPage,
  updateDetails,
  deleteDetails
}
