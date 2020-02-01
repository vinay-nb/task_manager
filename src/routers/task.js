const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

module.exports = router

//resource creation end points
router.post('/tasks', async (req, res) =>{
    const tasks = new Task(req.body)
    try{
        await tasks.save()
        res.status (201).send (tasks)
    } catch (e) {
        res.status (400).send()
    }

    // tasks.save().then( ()=>{
    //         res.status(201).send(tasks)
    // }).catch( (e) =>{
    //         res.status(400).send(e)
    // })
})

// to fetch tasks
router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({})
        res.send(tasks)

    } catch(e) {
        res.status(500).send
    }

    // Task.find({}).then( (tasks) =>{
    //     res.send(tasks)
    // }).catch( (e) =>{
    //     res.status(500).send(e)
    // })
})

// fetching task by id
router.get('/tasks/:id', async (req, res) =>{
    const _id = req.params.id 
    
    try {
        const task = await Task.findById(_id)
        if(!task) {
            return res.status(400).send()
        }
        res.send (task)
    } catch (e) {
            res.status(500).send()
    }

    // Task.findById(_id).then( (tasks) => {
    //     if(!tasks) {
    //         return res.status(404).send()
    //     }

    //     res.send(tasks)

    // }).catch( (e) => {
    //     res.status(500).send()
    // })
})

//allowing user to update 
router.patch('/tasks/:id', async (req, res) =>{
    const Updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed'] 
    const isValidOperation = Updates.every ((update) => allowedUpdates.includes (update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid operation' })
    }
    try{
        const task = await task.findById(req.params.id)

        Updates.forEach ((updates) => task[update] = req.body[update])
        await task.save() 
        
        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    }
    catch (e) {
        res.status(400).send(e)

    }
})

// deleting task by id
router.delete('/tasks/:id', async (req,res) =>{
    try{
        const task_1 = await Task.findByIdAndDelete(req.params.id)

        if(!task_1){
            return res.status(404).send()
        }

        res.send(task_1)
    } catch (e) {
        res.status(500).send()
    }
})

