const express = require('express')
const auth = require('../middleware/auth')
const Task = require('../models/task')
const router = new express.Router()


//resource creation end points
router.post('/tasks', auth, async (req, res) =>{
    const task = new Task ({
        ...req.body, //es6 spread operator...
        owner: req.user._id
    })
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

// pagination
// GET /task?limit

// to fetch tasks
router.get('/tasks', auth, async (req, res) => {
    try{
        const match = {}
        const sort = {}
        if (req.query.compelted) {
            match.completed = req.query.completed === 'true'
        }

        if(req.query.sortby) {
            const part = req.query.sortBy.split(':')
            sort[part[0]] = part[1] === 'desc'? -1 : 1  
        }

        await req.user.populate({
            path: 'tasks',
            match: {
                completed:true,
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort
                }
            }
        }).execPopulate()
        res.send(req.user.tasks)

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
router.get('/tasks/:id', auth, async (req, res) =>{
    const _id = req.params.id 
    
    try {
   
        const task = await Task.findOne({ _id, owner: req.user._id })
        if(!task) {
            return res.status(404).send()
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
router.patch('/tasks/:id', auth, async (req, res) =>{
    const Updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed'] 
    const isValidOperation = Updates.every ((update) => allowedUpdates.includes (update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid operation' })
    }
    try{
        const task = await Task.findOne({_id:req.params.id, owner:req.user._id})
    
        if(!task){
            return res.status(404).send()
        }
        Updates.forEach ((updates) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    }
    catch (e) {
        res.status(400).send(e)

    }
})

// deleting task by id
router.delete('/tasks/:id', auth, async (req,res) =>{
    try{
        // const task_1 = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id})

        if(!task_1){
            return res.status(404).send()
        }

        res.send(task_1)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
