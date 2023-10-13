require('dotenv').config()

const cors = require('cors')

const express = require('express')
const app = express()

const mongoose = require('mongoose')
const ExpenseModel = require('./db')

app.use(cors())

app.use((req,res,next) => {
    console.log(req.method, req.path)
    next()
})

app.use(express.json())

app.get('/api/ledger', async (req,res) => {
    const expenses = await ExpenseModel.find()
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

    const newEntry = {
        title: data.title,
        value: data.value,
        type: data.type,
        date: data.date,
        comment: data.comment
    }

    await ExpenseModel.create(newEntry)

    const expenses = await ExpenseModel.find()
    const sorted = expenses.sort((a, b) => new Date(b.date) - new Date(a.date))
    res.json(sorted)
      
})

app.delete('/api/ledger/:id', async (req,res) =>{
    const {id} = req.params
    await ExpenseModel.findByIdAndRemove(id)

    const expenses = await ExpenseModel.find()
    const sorted = expenses.sort((a, b) => new Date(b.date) - new Date(a.date))
    res.json(sorted)
})



mongoose.connect(process.env.MONGOOSE_URI).then(
    () => app.listen(process.env.PORT, () => {
        console.log(`Connected to DB & listening at: http://localhost:${process.env.PORT}/`)
    })
)
.catch(err => console.log(err))

