const express = require("express")
const router = express.Router()
const tasksController = require("../controller/tasksController")

router.get("/tasksGetList", tasksController.getAllTasks)
router.get("/taskAdd/:id", tasksController.addTask)
router.get("/taskRemoveByName/:id", tasksController.deleteTaskByName)
router.get("/taskRemoveAll", tasksController.deleteAllTasks)
router.get("/taskSwitchFinalized/:id", tasksController.switchTaskByName)

module.exports = router