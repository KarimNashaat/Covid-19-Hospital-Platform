const { addUser, sendMessage, changeChat, removeUser } = require('./users')

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("New Connection")
        socket.on("open", (data, callback) => {
            addUser(data, socket)
        })

        socket.on("changeChat", (data, callback) => {
            changeChat(data, socket)
        })


        socket.on("message", (data, callback) => {
            sendMessage(data, socket)
        })

        socket.on("disconnect", () => {
            removeUser(socket)
        })
    })
    
}