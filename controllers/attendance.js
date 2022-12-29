const User = require("../models/users")

const postDetails = async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename
    })
     user.save((err) => {
        if(err){
            res.json({message: err.message, type: "danger"})
        } else {
            req.session.message = {
                type: "success",
                message: "User added successfully"
            }
            res.redirect("/")
        }
    })
}

const getHomepage = (req, res) => {
    User.find().exec((err, users) => {
        if(err) {
            res.json({message: err.message})
        } else {
            res.render("pages/index", { 
                title: "Home Page",
                users: users
            })
        }
    })

}

module.exports =  { postDetails, getHomepage }
