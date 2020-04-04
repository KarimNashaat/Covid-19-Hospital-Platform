const mongoose = require('mongoose')

const hospitalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    specialization: {
        type: String,
        required: true,
        trim: true,
    },
    doctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    reservationCounter: {
        type: Number,
        default: 0
    }
})

hospitalSchema.virtual('appointments', {
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'hospital_id'
})

hospitalSchema.virtual('requests', {
    ref: 'Request',
    localField: '_id',
    foreignField: 'hospital_id'
})

const Hospital = mongoose.model('Hospital', hospitalSchema)

module.exports = Hospital