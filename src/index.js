const express = require('express')
//loadings user and task file
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

// creating express app
const app = express()
const port = process.env.PORT || 3000
require('./db/mongoose')

// initiating middle ware
// app.use((req, res, next)  => {
//     if(req.method === 'GET'){
//       res.send('get request are disabled')
//     } else {
//       next()
//     }
// })

// service disabled function
// app.use((req, res, next) =>{
    // if(req.method === 'GET' || req.method === 'POST' || req.method === 'DEL' || req.method === 'PATC'){
      // res.status(503).send('Under maintainance!')
    // } else {
    //   next()
    // }      
// })

// with  middleware: new request->do something -> run route handler

//to use the data

const multer = require('multer')
const upload = multer({
  dest: 'images'
})

app.post('/upload',upload.single('upload'), ( req, res) => {
  res.send()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//setting up the port
app.listen(port, () =>{
    console.log('listening port'+port)
})

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//   const token = jwt.sign({ _id:'abcd12'}, 'this is my task app', {expiresIn: '2 days'})
//   console.log(token)

//   const data = jwt.verify(token, 'this is my task app')
//   console.log(data)
// }

// myFunction()

// const pet = {
//   name:'ruby'
// }

// pet.toJSON = function () {
//   console.log(this)
//   return this
// }

// const Task = require('./modles/tasks')
// const User = require('./models/user')

const main =  async() => {
  // const task = await Task.findById('')
  // await task.populate('owner').execPopulate()
  // console.log(task.owner)
  const user = await User.findById()
  await user.populate('tasks').execPopulate()
  console.log(user.tasks)

}

console.log(JSON.stringify(pet))