const express = require("express")
const multer = require("multer")
const sharp = require("sharp")

const User = require("../models/user")
const auth = require("../middleware/auth")

const router = express.Router()

router.post("/users", async (req, res) => {
  const user = new User(req.body)

  try {
    const token = await user.generateAuthToken()
    await user.save()
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cd) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|PNG|JPG|JPEG)$/)) {
      return cd(new Error("Please upload an image"))
    }

    cd(undefined, true)
  },
})

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer()

    req.user.avatar = buffer
    await req.user.save()
    res.send()
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message })
  }
)

router.get("/users/me/:id/avatar", async (req, res) => {
  const _id = req.params.id
  try {
    const user = await User.findById(_id)

    if (!user || !user.avatar) {
      throw new Error()
    }
    res.set("Content-Type", "image/png")
    res.send(user.avatar)
  } catch (error) {
    res.status(404).send()
  }
})

router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body)
    const token = await user.generateAuthToken()
    res.status(200).send({ user, token })
  } catch (error) {
    res.status(400).send()
  }
})

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      //token.token ====> signifies an object, token with a token property
      //token that is equal to req.token is removed while the one that does not match is kept
      //:::: function of the  {filter} function
      (token) => token.token !== req.token
    )
    await req.user.save()

    res.send("Logged out successfully")
  } catch (error) {
    res.statust(500).send()
  }
})

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    //setting the tokens array [req.user.tokens] to an empty array or
    //calling the splice() array method on the req.user.tokens array
    req.user.tokens = req.user.tokens.splice() || []
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user)
})

router.patch("/users/me", auth, async (req, res) => {
  // req.body is an object with key value pairs
  const updates = Object.keys(req.body)

  //object.keys() is use to obtain only the keys of the object

  //req.body which is {name:"", email: "", password: "", age: }
  //becomes ["name", "email", "password", "age"] when placed in the object.keys()
  const allowedUpdates = ["name", "email", "password", "age"]

  // updates is now looped through since is an array of strings to check if it contains a string in the allowedUpdates
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update)
  })

  //if NO then the if statement below runs

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" })
  }

  try {
    const user = await req.user

    //the statement A[b] is used to access the VALUE of an object whose KEY is known
    updates.forEach((update) => {
      //For instance if{ update } is { email} then the code below reads:
      //user.email = req.body.email
      //so old email which is {user.email} is set to new email provided by user {req.body.email}

      user[update] = req.body[update]
    })

    await user.save()
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete("/users/me", auth, async (req, res) => {
  try {
    //the remove method called on the req.user is used to remove the use from the database
    await req.user.remove()
    res.status(200).send(req.user)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
