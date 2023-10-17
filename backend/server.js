require('dotenv').config()

const cors = require('cors')

const express = require('express')
const app = express()

const mongoose = require('mongoose')
const ExpenseModel = require('./expenseModel')
const UserModel = require('./userModel')

const jwt = require('jsonwebtoken')

const requireAuth = require('./middleware/requireAuth')

app.use(cors())

app.use((req,res,next) => {
    console.log(req.method, req.path)
    next()
})

app.use(express.json())

// user routes

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_STRING, {expiresIn: '3d'})
}

app.post('/api/user/login', async (req,res) => {
    const { email, password } = req.body

    try{
        const user =  await UserModel.login(email,password)

        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error){
        res.status(400).json({error: error.message})
    }
    
})

app.post('/api/user/signup', async (req,res) => {
    const { email, password } = req.body
    try{
        const user =  await UserModel.signup(email,password)

        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error){
        res.status(400).json({error: error.message})
    }
})

// expense routes

app.use(requireAuth)

app.get('/api/ledger', async (req,res) => {
    const user_id = req.user

    const expenses = await ExpenseModel.find({user_id})
    const sorted = expenses.sort((a, b) => new Date(b.date) - new Date(a.date))
    res.status(200).json(sorted)
})

app.get('/api/ledger/:id', async (req,res) => {
    const { id }  = req.params
    const singleExpense = await ExpenseModel.findById(id)
    res.json(singleExpense)
})

app.post('/api/ledger', async (req,res) => {
    const data = req.body
    const user_id = req.user

    const newEntry = {
        title: data.title,
        value: data.value,
        type: data.type,
        date: data.date,
        comment: data.comment,
        user_id: user_id
    }

    await ExpenseModel.create(newEntry)

    const expenses = await ExpenseModel.find({user_id})
    const sorted = expenses.sort((a, b) => new Date(b.date) - new Date(a.date))
    res.json(sorted)
      
})

app.delete('/api/ledger/:id', async (req,res) =>{
    const user_id = req.user
    const {id} = req.params
    await ExpenseModel.findByIdAndRemove(id)

    const expenses = await ExpenseModel.find({user_id})
    const sorted = expenses.sort((a, b) => new Date(b.date) - new Date(a.date))
    res.json(sorted)
})

mongoose.connect(process.env.MONGOOSE_URI).then(
    () => app.listen(process.env.PORT, () => {
        console.log(`Connected to DB & listening at: http://localhost:${process.env.PORT}/`)
    })
)
.catch(err => console.log(err))

