const router = require("express").Router()
const TaskController = require("../controllers/TaskController")

router.post("/addTask", TaskController.newTask)
router.get("/getTasks", TaskController.getTasks)
router.get("/getDoneTasks", TaskController.getDoneTasks)
router.get("/getPedingTasks", TaskController.getPendingTasks)
module.exports = router