const express = require('express')
const User = require('../models/user')
const router = new express.Router()

module.exports = router
//loading from postman
router.post('/users', async (req, res) =>{
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

  

// hash plain text password before saving 
router.post ('/users/login',async(req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})
   

    // user.save().then( ()=>{
    //         res.send(user)
    // }).catch( (e) =>{
    //         res.status(400).send(e)
    // })
})

// to fetch user
router.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status (500).send()
    }
    // User.find({}).then( (users) =>{
    //     res.send(users)
    // }).catch( (e) =>{
    //     res.status(500).send(e)
    // })
})

//fetching user by id
router.get('/users/:id', async (req, res) =>{
    const _id = req.params.id 
    // using async and await
    try {
        const user = await User.findById(_id)

        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.status (500).send()
    }

    
    // User.findById(_id).then( (user) => {
    //     if(!user) {
    //         return res.status(404).send()
    //     }

    //     res.send(user)

    // }).catch( (e) => {
    //     res.status(500).send()
    // })
})

// updating user by accesing id using async and await
router.patch('/user/:id', async (req, res) => {
    const Updates = Object.keys(req.body)
    const allowUpdates = ['name', 'age', 'email', 'password']
    const isValidOperation = Updates.every ( ( update ) => allowUpdates.includes ( Updates ) )
    if (!isValidOperation) {
        return res.status (400).send ({ error: 'Invalid Updates!'})
    }
    try {
        const user = await User.findById(req.params.id)
        
        Updates.foreach((update) => user[update] = req.body[update])

        await User.save()
        
        // const user = await User.findByIdAndUpdate ( req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status (404).send ()
        }

        res.send ( user )
    } catch (e) {
        res.status(400).send(e)
    }
})

// resource deleting end points
router.delete('/user/:id', async (req,res) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})
