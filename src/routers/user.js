const express = require('express')
const user = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const router = new express.Router()

const bodyParser = require('body-parser')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//loading from postman
router.post('/users', async (req, res) =>{
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }

  

// hash plain text password before saving 
router.post ('/users/login',async(req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user: user, token })
    } catch (e) {
        res.status(400).send()
    }
})
})

// logout router
router.post('/users/logout', auth, async (req, res) =>{
    try {
        req.user.tokens = req.user.tokens.filter ((token) => {
            return token.token != req.token
        })  
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

// logout from all device
router.post('users/logoutAll', auth, async(req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

// to fetch user
router.get('/users/me', auth, async (req, res) => {
   res.send(req.user)
})

// update url to user/me


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
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowUpdates = ['name', 'age', 'email', 'password']
    const isValidOperation = Updates.every ( ( update ) => allowUpdates.includes ( Updates ) )
    if (!isValidOperation) {
        return res.status (400).send ({ error: 'Invalid Updates!'})
    }
    try {
        updates.foreach((update) => user[update] = req.body[update])

        await req.user.save()
        
        // const user = await User.findByIdAndUpdate ( req.params.id, req.body, { new: true, runValidators: true })

        res.send (req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// resource deleting end points
router.delete('/users/me', auth, async (req,res) =>{
    try{
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

// to upload user profile file

const upload = multer ({
    dest: 'avatar'
}) 

router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send()
})

module.exports = router
