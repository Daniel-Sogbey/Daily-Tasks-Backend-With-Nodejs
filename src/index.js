const express = require("express")
require("./db/mongoose")
const userRouter = require("../src/routers/user")
const taskRouter = require("../src/routers/task")

const app = express()

//MAINTENANCE MODE MIDDLEWARE

// app.use((req, res, next) => {
// if (req.method === "GET" || "POST" || "PATCH" || "DELETE") {
// res
// .status(503)
// .send("Service is temporarily unavailable. Come back in a few minutes")
// }
// })
// const name = "Daniel sogbey"
//
// const whiteSpaceRemover = require("@dan-sogbey/whitespaceremover")
//
// const value = whiteSpaceRemover(name)
//
// console.log(value)

// const pet = {
// name: "Hal",
// }
//
// pet.toJSON = function () {
// console.log(this)
// return {}
// }
//
// console.log(JSON.stringify(pet))

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// const Task = require("./models/task")
// const User = require("./models/user")
//
// const main = async () => {
// const task = await Task.findById("5ef6b12bb1b7dc24105458da")
// await task.populate("owner").execPopulate()
// console.log(task.owner)
// const user = await User.findById("5ef5101cdf70d2264832e14d")
// await user.populate("tasks").execPopulate()
// console.log(user.tasks)
// const user = await User.findById(task.owner)
// console.log(user)
// }

// main()

const multer = require("multer")

const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(xlsx|pptx)$/)) {
      return cb(new Error("Please uplaod an excel or powerpoint file"))
    }

    cb(undefined, true)
    // cd(new Error("File must be a pdf"))
    // cb(undefined, true)
    // cb(undefined, false)
  },
})

app.post(
  "/upload",
  upload.single("upload"),
  (req, res) => {
    res.send()
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message })
  }
)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("Server running on port " + port)
})
