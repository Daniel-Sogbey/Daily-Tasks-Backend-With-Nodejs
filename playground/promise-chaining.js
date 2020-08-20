require("../src/db/mongoose")
const User = require("../src/models/user")

// 5ef1842250f2fd03ec0cd97f
// 5ef1852e890fe6269414ba18

// User.findByIdAndUpdate("5ef1852e890fe6269414ba18", { age: 1 })
// .then((user) => {
// console.log(user)
// return User.countDocuments({ age: 1 })
// })
// .then((result) => {
// console.log(result)
// })
// .catch((e) => {
// console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })

  return count
}

updateAgeAndCount("5ef14ebcba8eec39b898e4cc", 2)
  .then((count) => {
    console.log(count)
  })
  .catch((e) => {
    console.log(e)
  })
