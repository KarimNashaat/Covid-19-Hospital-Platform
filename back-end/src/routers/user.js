const express = require("express")
const router = express.Router()
const User = require("../models/users")
const Hospital = require("../models/hospitals")
const Appointment = require("../models/appointments")
const Request = require("../models/requests")
const Chat = require("../models/chats")
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const moment = require('moment')
const mongoose = require('mongoose');


const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a jpg or jpeg or png file'))
        }

        cb(undefined, true)
    }
})

router.post('/user/login', async (req, res) => {
    try {
        let user = await User.FindByCredentials(req.body.email, req.body.password)
        const token = await user.GenerateAuthToken()
        const requestsPopulation = await user.populate("requests").execPopulate()
        user = {
            ...user.toJSON(),
            requests: requestsPopulation.requests,
        }
        res.status(200).send({ user, token })
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/user/auto-login', auth, async (req, res) => {
    try {
        const requestsPopulation = await req.user.populate("requests").execPopulate()
        const user = {
            ...req.user.toJSON(),
            requests: requestsPopulation.requests
        }

        res.status(200).send({ user, token: req.token })
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/user/signup', upload.single('avatar'), async (req, res) => {
    try {
        const userData = JSON.parse(req.body.userData)

        if (req.file) {
            const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
            userData.avatar = buffer
        }

        userData.age = moment().diff(moment(userData.birthday, "M/D/YYYY"), 'years')
        const birthday = userData.birthday.split('/')
        userData.birthday = {
            month: parseInt(birthday[0]),
            day: parseInt(birthday[1]),
            year: parseInt(birthday[2]),
        }

        let user = new User(userData)

        //Send A message from the Admin
        const admin = await User.find({ email: "admin@admin.com" })
        if (admin) {
            const newChat = new Chat({
                messages: [
                    {
                        message: {
                            body: "Welcome to out App !! For any help just send here.",
                            from: admin[0]._id,
                            to: user._id
                        }
                    }
                ],
                userOne_id: admin[0]._id,
                userTwo_id: user._id,
                lastMessage: "Welcome to out App !! For any help just send here."
            })

            user.chats.push(newChat._id)
            await newChat.save()
        }
        await user.save()
        const token = await user.GenerateAuthToken()
        user = {
            ...user.toJSON(),
            requests: []
        }
        res.status(201).send({ user, token })

    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }

})

router.patch('/user', auth, async (req, res) => {
    try {
        if (req.body.avatar) {
            delete req.body.avatar
        }
        const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true })
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.patch('/user/avatar', auth, upload.single('avatar'), async (req, res) => {
    try {
        let userData = {}
        if (req.file) {
            const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
            userData.avatar = buffer
        }
        const user = await User.findByIdAndUpdate(req.user._id, userData, { new: true })
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/user/reservations', auth, async (req, res) => {
    try {
        const user = await req.user.populate("reservations").execPopulate()
        let appointments = user.reservations
        let newAppointments = []

        for (let appointment of appointments) {
            let hospital = await Hospital.findById(appointment.hospital_id)
            let result = await hospital.populate("appointments").execPopulate()

            let remainingNumber = result.appointments.findIndex(x => x._id.equals(appointment._id))

            newAppointments.push({ ...appointment.toJSON(), remainingNumber })
        }
        res.status(200).send(newAppointments)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/user/reservations/:id', auth, async (req, res) => {
    try {
        await Appointment.findByIdAndRemove(req.params.id)
        const data = await req.user.populate("reservations").execPopulate()
        res.status(200).send(data.reservations)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).send(user)

    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }
})

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send("Logged Out")
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/user/requests', auth, async (req, res) => {
    if (req.user.job !== "Doctor") {
        return res.status(401).send()
    }

    let newRequest = {
        user_id: req.user._id,
        userName: req.user.name,
        hospitalName: req.body.hospitalName,
        hospital_id: req.body.hospital_id
    }

    newRequest = new Request(newRequest)

    try {
        await newRequest.save()
        const requestsPopulation = await req.user.populate("requests").execPopulate()
        const user = {
            ...req.user.toJSON(),
            requests: requestsPopulation.requests
        }
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/admin/requests', auth, async (req, res) => {
    if (req.user.email !== "admin@admin.com") {
        return res.status(401).send()
    }
    try {
        const requests = await Request.find({ status: "Pending" })
        res.status(200).send(requests)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/admin/requests/:id', auth, async (req, res) => {
    if (req.user.email !== "admin@admin.com") {
        return res.status(401).send()
    }

    try {
        const request = await Request.findById(req.params.id)
        request.status = "Rejected"
        await request.save()

        const requests = await Request.find({ status: "Pending" })
        res.status(200).send(requests)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/user/chats', auth, async (req, res) => {
    try {
        const population = await req.user.populate('chats').execPopulate()
        let chats = population.chats
        let other = null
        for (let i = 0; i < chats.length; i++) {
            if (chats[i].userOne_id.equals(req.user._id)) {
                other = await User.findById(chats[i].userTwo_id)
            }
            else {
                other = await User.findById(chats[i].userOne_id)
            }

            chats[i] = chats[i].toJSON()
            chats[i].userName = other.name
            chats[i].otherAvatar = other.avatar
            delete chats[i].messages
        }
        res.status(200).send(chats)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/user/chatmessages/doctor/:id', auth, async (req, res) => {
    try {
        const population = await req.user.populate('chats').execPopulate()
        let chats = population.chats
        let other = null
        let userChat = {}

        for (let i = 0; i < chats.length; i++) {
            if (chats[i].userOne_id.equals(req.user._id)) {
                other = await User.findById(chats[i].userTwo_id)
            }
            else {
                other = await User.findById(chats[i].userOne_id)
            }
            if (other._id.equals(req.params.id)) {
                userChat = chats[i].toJSON()
                userChat.userName = other.name
                userChat.otherAvatar = other.avatar
                userChat.other_id = other._id
            }

            chats[i] = chats[i].toJSON()
            chats[i].userName = other.name
            chats[i].otherAvatar = other.avatar
            delete chats[i].messages
        }

        if (Object.keys(userChat).length === 0) {
            const doctor = await User.findById(req.params.id)
            let newChat = new Chat({
                messages: [
                    {
                        message: {
                            body: "Hello ! How can I help You ? ",
                            from: doctor._id,
                            to: req.user._id
                        }
                    }
                ],
                userOne_id: doctor._id,
                userTwo_id: req.user._id,
                lastMessage: "Hello ! How can I help You ? "
            })

            userChat = newChat
            newChat = newChat.toJSON()
            newChat.userName = doctor.name
            newChat.otherAvatar = doctor.avatar
            newChat.other_id = doctor._id

            console.log(newChat)
            userChat = newChat
            chats = chats.concat(newChat)
        }

        res.status(200).send({ chats, userChat })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/user/chatmessages/:id', auth, async (req, res) => {
    try {
        const user_id = req.user._id
        let chat = await Chat.findById(req.params.id)
        let other = null
        chat = chat.toJSON()

        if (chat.userOne_id.equals(req.user._id)) {
            other = await User.findById(chat.userTwo_id)
        }
        else {
            other = await User.findById(chat.userOne_id)
        }
        chat.userName = other.name
        chat.otherAvatar = other.avatar
        chat.other_id = other._id
        res.status(200).send(chat)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/user/chatmessages', auth, async (req, res) => {
    try {
        let chat = await Chat.findById(req.body.chat_id)

        if (chat) {
            chat.messages.push({
                message: {
                    body: req.body.message,
                    from: req.user._id,
                    to: req.body.other_id
                }
            })
            chat.lastMessage = req.body.message
        }
        else {
            chat = new Chat({
                _id: mongoose.Types.ObjectId(req.body.chat_id),
                messages: [
                    {
                        message: {
                            body: "Hello ! How can I help You ? ",
                            from: req.body.other_id,
                            to: req.user._id
                        }
                    },
                    {
                        message: {
                            from: req.user._id,
                            to: req.body.other_id,
                            body: req.body.message
                        }
                    }
                ],
                userOne_id: req.user._id,
                userTwo_id: req.body.other_id,
                lastMessage: req.body.message
            })
            const other = await User.findById(req.body.other_id)
            other.chats.push(chat._id)
            req.user.chats.push(chat._id)

            await other.save()
            await req.user.save()
        }
        await chat.save()
        res.status(201).send(chat)
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router 