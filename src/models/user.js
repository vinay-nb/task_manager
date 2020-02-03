const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//creating explicit schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error ('email is invalid')
            }
        }
    },
    password:{
        type:String,
        require:true,
        minlength: 7,
        trim:true,
        validate(value) {
            if (value.toLowerCase().includes('password')){
                throw new Error ('password cannot contain "password"')
            }
        }

    },
    age: {
        type: Number,
        required: true,
        default: 0,
        validate(value){
            if (value < 0){
                throw new Error('Age must be positive')
            }
        }
    }
})

tokens: [{
    token: String,
    required: true
}]

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id:user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne ({ email })

    if(!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login!')
    }

    return user
}  

// to set middleware
userSchema.pre('save', async function (next){
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }   

    next()
})


//creation of mongoose model and validation
const User = mongoose.model('User',userSchema)


module.exports = User
