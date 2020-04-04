const mongoose = require('mongoose')

const requestSchema = mongoose.Schema({
    hospital_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Hospital'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    hospitalName: {
        type:String,
        required: true
    },
    userName: {
        type:String,
        required: true
    },
    status: {
        type:String,
        default:"Pending"
    }
})

const Request = mongoose.model('Request', requestSchema)

module.exports = Request