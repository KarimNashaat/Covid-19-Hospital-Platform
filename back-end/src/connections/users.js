const btoa = require('btoa');
const User = require('../models/users')
const Chat = require('../models/chats')

let users = []

const addUser = (data, socket) => {
    users.push({
        user_id: data.user_id,
        other_id: data.other_id,
        token: data.token,
        socket
    })
    // console.log(users)
}

const changeChat = (other_id, socket) => {
    console.log('changed')
    for (let i in users) {
        if (users[i].socket.id === socket.id) {
            users[i].other_id = other_id
        }
    }
}

const sendMessage = async (message, socket) => {
    console.log(users)
    const sender = users.find(user => user.socket.id === socket.id)
    const reciever = users.find(user => user.user_id === message.other_id)
    if (reciever) { // If the reciever has an opened channel.
        // console.log("Reciever other id", reciever.other_id)
        // console.log("sender it", sender.user_id)
        if (reciever.other_id === sender.user_id) {  // If the receiver has open channel with the sender.
            const chats = await getChats(reciever.user_id)
            const userChat = await getMessages(reciever.user_id, message.chat_id)
            reciever.socket.emit("message", { chats, userChat })
        }
        else {
            const chats = await getChats(reciever.user_id)
            reciever.socket.emit("message", { chats })
        }
    }
    
    const myChats = await getChats(sender.user_id)
    sender.socket.emit("message", {chats: myChats})

}



function bufferToBase64(buf) {
    var binstr = Array.prototype.map.call(buf, function (ch) {
        return String.fromCharCode(ch);
    }).join('');
    return btoa(binstr);
}

const getChats = async (receiver_id) => {
    const user = await User.findById(receiver_id)
    const population = await user.populate('chats').execPopulate()
    let chats = population.chats
    let other = null
    for (let i = 0; i < chats.length; i++) {
        if (chats[i].userOne_id.equals(user._id)) {
            other = await User.findById(chats[i].userTwo_id)
        }
        else {
            other = await User.findById(chats[i].userOne_id)
        }

        chats[i] = chats[i].toJSON()
        chats[i].userName = other.name

        let bytes = new Uint8Array(other.avatar);
        chats[i].otherAvatar = bufferToBase64(bytes)
        delete chats[i].messages
    }
    return chats
}

const getMessages = async (receiver_id, chat_id) => {
    let chat = await Chat.findById(chat_id)
    let other = null
    chat = chat.toJSON()

    if (chat.userOne_id.equals(receiver_id)) {
        other = await User.findById(chat.userTwo_id)
    }
    else {
        other = await User.findById(chat.userOne_id)
    }
    chat.userName = other.name
    let bytes = new Uint8Array(other.avatar);
    chat.otherAvatar = bufferToBase64(bytes)
    chat.other_id = other._id

    return chat
}

const removeUser = (socket) => {
    users = users.filter(user => user.socket.id !== socket.id)
    console.log("user disconnected")
}

module.exports = {
    addUser,
    sendMessage,
    changeChat,
    removeUser
}
