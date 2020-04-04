const app = require('./app')
const port = process.env.PORT

app.server.listen(port, () => {
    console.log("Server is running on port: ", + port)
})

