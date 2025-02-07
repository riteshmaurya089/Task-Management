const express = require("express");

const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  toggleTaskCompletion,
} = require("../controller/TaskController");
const authentication = require('../middleware/authentication')

const taskRouter = express.Router();

//Api Endpoints
taskRouter.get("/mytasks",authentication, getTasks);
taskRouter.post("/create",authentication, createTask);
taskRouter.delete("/delete/:taskId",authentication, deleteTask);
taskRouter.put("/update/:id",authentication, updateTask);
taskRouter.put("/complete/:id", toggleTaskCompletion);

module.exports = { taskRouter };
