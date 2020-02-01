const express = require('express')

// creating express app
const app = express()
const port = process.env.PORT || 3000
require('./db/mongoose')

//loadings user and task file
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

//to use the data
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//setting up the port
app.listen(port, () =>{
    console.log('listening port'+port)
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
  const token = jwt.sign({ _id:'abcd12'}, 'this is my task app', {expiresIn: '2 days'})
  console.log(token)

  const data = jwt.verify(token, 'this is my task app')
  console.log(data)
}

myFunction()