const router = require("express").Router()
const TaskController = require("../controllers/TaskController")

router.post("/addTask", TaskController.newTask)
router.get("/getTasks", TaskController.getTasks)
module.exports = router