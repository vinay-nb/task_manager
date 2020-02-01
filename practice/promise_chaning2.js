require('../src/db/mongoose')

const Task = require('../src/models/task')

// Task.findByIdAndRemove('5dda06ebb9423a3a189f5e42').then((task) =>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e) =>{
//     console.log(e)
// })

const deleteTaskAndCount = async(id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed:flase })
    return count
}
deleteTaskAndCount('5dda06fda701702ec01a772b').then((count) =>{
    console.log(count)
}).catch((e) =>{
    console.log(e)
})
