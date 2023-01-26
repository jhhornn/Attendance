const express = require("express")
const router = express.Router()
const imageUploader = require("../middlewares/imageUploader")
const requireAuth = require("../middlewares/authMiddleware")
const {
  postDetails,
  getHomepage,
  getYourPage,
  getEditPage,
  updateDetails,
  deleteDetails
} = require("../controllers/attendance")

router.use(requireAuth)

router.get("/add", (req, res) => {
  res.render("pages/add_users", { title: "Add Users", person: req.decodedToken.firstName })
})

router.post("/add", imageUploader, postDetails)

router.get("/", getHomepage)

router.get("/myusers", getYourPage)

// Edit an user route
router.get("/edit/:id", getEditPage)

router.post("/update/:id", imageUploader, updateDetails)

router.get("/delete/:id", deleteDetails)

module.exports = router
