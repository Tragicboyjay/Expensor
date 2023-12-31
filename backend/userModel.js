const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static sign up method

userSchema.statics.signup = async function (email, password) {

    // validation 

    if(!email || !password){
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('Please enter a valid email')
    }
    
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }
    
    const exists = await this.findOne({ email })

    if(exists){
        throw Error('Email already in use')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await this.create(
        {
            email: email,
            password: hashedPassword
        }
    )
        return user 
}

//  static log in method 

userSchema.statics.login = async function (email,password) {

    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if(!user){
        throw Error('Email or password is incorrect')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match){
        throw Error('Email or password is incorrect')
    }

    return user
}

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel