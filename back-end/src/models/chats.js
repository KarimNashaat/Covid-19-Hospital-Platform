const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    body: {
        type:String,
        required: true
    }
})

const chatSchema = mongoose.Schema({
    messages: [{
        message: {
            type: messageSchema
        }
    }],
    userOne_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    userTwo_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    lastMessage: {
        type: String,
        required: true
    }
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat