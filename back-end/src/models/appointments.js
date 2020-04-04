const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        trim: true,
    },
    symptoms: [{
        type: String,
        trim: true
    }],
    hospitalName: {
        type:String,
        required:true
    },
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
    number: {
        type:Number,
        required: true
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment