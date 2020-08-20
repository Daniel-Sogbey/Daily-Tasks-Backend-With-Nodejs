//CRUD Create/Read/Update/Delete

const { MongoClient, ObjectID } = require("mongodb")

const connectionUrl = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

// const id = new ObjectID()
//
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())

MongoClient.connect(
  connectionUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database")
    }

    const db = client.db(databaseName)

    // db.collection("users").insertOne(
    //   {
    // name: "Jude",
    // age: 20,
    //   },
    //   (error, result) => {
    // if (error) {
    //   return console.log("Unable to insert user")
    // }
    // console.log(result.ops)
    //   }
    // )

    // db.collection("users").insertMany(
    //   [
    // {
    //   name: "Daniel",
    //   age: 19,
    // },
    // {
    //   name: "Andrew",
    //   age: 27,
    // },
    //   ],
    //   (error, result) => {
    // if (error) {
    //   return console.log("Unable to insert many users")
    // }
    // console.log(result.ops)
    //   }
    // )

    // db.collection("tasks").insertMany(
    //   [
    // {
    //   description: "Code till tomorrow morning",
    //   completed: false,
    // },
    // {
    //   description: "Drink coffee",
    //   completed: true,
    // },
    // {
    //   description: "Read my Bible",
    //   completed: false,
    // },
    //   ],
    //   (error, result) => {
    // if (error) {
    //   return console.log("Unable to add tasks to tasks collection")
    // }
    // console.log(result.ops)
    //   }
    // )

    // db.collection("users").findOne(
    //   { _id: new ObjectID("5ef02335bfb1cd08c0d622b4") },
    //   (error, user) => {
    // if (error) {
    //   return console.log("Unable to fetch user")
    // }
    // console.log(user)
    //   }
    // )

    // db.collection("users")
    //   .find({ name: "Daniel" })
    //   .toArray((error, users) => {
    // if (error) {
    //   return console.log("Unable to fetch users")
    // }
    // console.log(users)
    //   })
    //
    // db.collection("users")
    //   .find({ name: "Daniel" })
    //   .count((error, users) => {
    // if (error) {
    //   return console.log("Unable to fetch users")
    // }
    // console.log(users)
    //   })

    // db.collection("tasks").findOne(
    // {
    // _id: new ObjectID("5ef02cc9e403891ed04eff0b"),
    // },
    // (error, task) => {
    // if (error) {
    // return console.log("Unabe to fetch task")
    // }
    // console.log(task)
    // }
    // )
    //
    // db.collection("tasks")
    // .find({ completed: false })
    // .toArray((error, tasks) => {
    // if (error) {
    // return console.log("Unable to fetch uncompleted tasks")
    // }
    // console.log(tasks)
    // })
    // db.collection("users")
    // .updateOne(
    // {
    // _id: new ObjectID("5ef0274e1732e223f837d455"),
    // },
    // {
    // $inc: {
    // age: 1,
    // },
    // }
    // )
    // .then((result) => {
    // console.log(result)
    // })
    // .catch((error) => {
    // console.log(error)
    // })

    // db.collection("tasks")
    // .updateMany(
    // {
    // completed: false,
    // },
    // {
    // $set: {
    // completed: true,
    // },
    // }
    // )
    // .then((result) => {
    // console.log(result)
    // })
    // .catch((error) => {
    // console.log(error)
    // })

    // db.collection("users")
    // .deleteMany({
    // name: "Jude",
    // })
    // .then((result) => {
    // console.log(result)
    // })
    // .catch((error) => {
    // console.log(error)
    // })

    // db.collection("tasks")
    // .deleteOne({
    // _id: new ObjectID("5ef02cc9e403891ed04eff09"),
    // })
    // .then((result) => {
    // console.log(result)
    // })
    // .catch((error) => {
    // console.log(error)
    // })

    // db.collection("tasks")
    // .deleteOne({
    // description: "Drink coffee",
    // })
    // .then((result) => {
    // console.log(result)
    // })
    // .catch((error) => {
    // console.log(error)
    // })
  }
)
