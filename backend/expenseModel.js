const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema(
    {
        title:{ 
            type: String,
            required: true
        },
        value:{ 
            type: Number,
            required: true
        },
        type:{ 
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        comment: {
            type: String
        },
        user_id: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const ExpenseModel = mongoose.model("expenses", ExpenseSchema)

module.exports = ExpenseModel