const router = require("express").Router()
// const User = require("../models/User")
const UserController = require("../controllers/UserController")

router.post("/getUser", UserController.getUser)

module.exports = router