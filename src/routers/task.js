const express = require("express")
const Task = require("../models/task")
const router = express.Router()
const auth = require("../middleware/auth")
const User = require("../models/user")

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  })
  try {
    await task.save()
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

//GET  /tasks?completed=true

//limit skip

//GET /tasks?limit=10&skip=0

//GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  const match = {}
  const sort = {}

  if (req.query.completed) {
    match.completed = req.query.completed === "true"
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":")
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1
  }

  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate()

    res.status(200).send(req.user.tasks)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findOne({ _id, owner: req.user._id })
    if (!task) {
      return res.status(404).send("Task Not Found")
    }

    const task_id = task.owner

    console.log(task_id, "task_id")

    const user = await User.findById(task_id)
    res
      .status(200)
      .send({ task, name: user.name, email: user.email, age: user.age })
  } catch (error) {
    res.status(500).send()
  }
})

router.patch("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ["description", "completed"]

  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update)
  })

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Update" })
  }

  try {
    const task = await Task.findOne({ _id, owner: req.user._id })

    if (!task) {
      return res.status(404).send("Task Not Found")
    }

    updates.forEach((update) => {
      task[update] = req.body[update]
    })

    await task.save()
    res.status(200).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id
  try {
    const task = await Task.findByIdAndDelete({ _id, owner: req.user._id })
    if (!task) {
      return res.status(404).send("Task Not Found")
    }

    res.status(200).send(task)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
