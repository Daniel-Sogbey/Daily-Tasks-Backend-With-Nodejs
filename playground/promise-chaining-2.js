require("../src/db/mongoose")
const Task = require("../src/models/task")
// 5ef1842e50f2fd03ec0cd980
// Task.findByIdAndRemove("5ef189283b73ea15f0b50408")
// .then((task) => {
// console.log(task)
// return Task.countDocuments({ completed: false })
// })
// .then((result) => {
// console.log(result)
// })
// .catch((e) => {
// console.log(e)
// })
//

const removeTaskAndCount = async (id) => {
  const task = await Task.findByIdAndRemove(id)
  const count = await Task.countDocuments({ completed: false })
  return count
}

removeTaskAndCount("5ef229344c0b8008e00ac899")
  .then((count) => {
    console.log(count)
  })
  .catch((e) => {
    console.log(e)
  })
