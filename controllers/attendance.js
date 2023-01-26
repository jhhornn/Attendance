const User = require("../models/users")
const fs = require("fs")

const postDetails = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename,
      owner: req.decodedToken.id
    })

    await user.save()

    req.session.message = {
      type: "success",
      message: "User added successfully"
    }
    res.redirect("/")
  } catch (err) {
    res.json({ message: err.message, type: "danger" })
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
    let new_image = ""
    if (req.file) {
      new_image = req.file.filename
      try {
        fs.unlinkSync("./uploads/" + req.body.old_image)
      } catch (err) {
        console.log(err)
      }
    } else {
      new_image = req.body.old_image
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
    res.json({ message: err.message, type: "danger" })
  }
}

const deleteDetails = async (req, res) => {
  try {
    const id = req.params.id
    const result = await User.findByIdAndRemove(id)

    if (result.image != "") {
      try {
        fs.unlinkSync("./uploads/" + result.image)
      } catch (err) {
        console.log(err)
      }
    }

    req.session.message = {
      type: "info",
      message: "User deleted successfully"
    }
    res.redirect("/")
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
