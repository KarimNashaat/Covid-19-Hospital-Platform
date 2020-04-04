const express = require("express")
const router = express.Router()
const Hospital = require("../models/hospitals")
const User = require("../models/users")
const Appointment = require("../models/appointments")
const Request = require("../models/requests")
const auth = require('../middleware/auth')

router.post('/admin/hospitals', auth, async (req, res) => {
    if (req.user.email !== "admin@admin.com") {
        return res.status(401).send()
    }

    const hospital = new Hospital(req.body)
    try {
        await hospital.save()
        const hospitals = await Hospital.find({})

        res.status(201).send(hospitals)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/admin/hospitals/:id', auth, async (req, res) => {
    if (req.user.email !== "admin@admin.com") {
        return res.status(401).send()
    }

    try {
        await Hospital.findByIdAndRemove(req.params.id)
        const hospitals = await Hospital.find({})

        res.status(200).send(hospitals)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/hospitals', async (req, res) => {
    try {
        const hospitals = await Hospital.find({})
        res.status(200).send(hospitals)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/admin/hospital/doctors/:id', auth, async (req, res) => {
    if (req.user.email !== "admin@admin.com") {
        return res.status(401).send()
    }

    try {
        const request = await Request.findById(req.params.id)

        const hospital = await Hospital.findById(request.hospital_id)
        hospital.doctors = hospital.doctors.concat(request.user_id)

        await hospital.save()

        request.status = "Accepted"
        await request.save()

        const requests = await Request.find({status:"Pending"})
        res.status(200).send(requests)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/hospital/appointments', async (req, res) => {
    try {

        const hospital = await Hospital.findById(req.body.hospital_id)
        let counter = hospital.reservationCounter
        hospital.reservationCounter = counter + 1
        const appointment = new Appointment({ ...req.body, number: counter + 1 })

        await hospital.save()
        await appointment.save()
        res.status(201).send(appointment)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/hospital/doctor/:id', async (req, res) => {
    try {
        const doctor = await User.findById(req.params.id)
        res.status(200).send(doctor)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/hospital/:id', async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id)
        const info = await hospital.populate("doctors").execPopulate()
        const appointmentsPopulation = await hospital.populate("appointments").execPopulate()
        const requestsPopulation = await hospital.populate("requests").execPopulate()

        const hospitalInfo = {
            ...info.toJSON()
            , appointments: appointmentsPopulation.appointments
            , requests: requestsPopulation.requests
        }
        res.status(200).send(hospitalInfo)

    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/admin/hospital/doctors/:hospital_id/:doctor_id', auth, async(req, res) => {
    if (req.user.email !== "admin@admin.com") {
        return res.status(401).send()
    }
    const hospital = await Hospital.findById(req.params.hospital_id)
    hospital.doctors = hospital.doctors.filter(doctor => !doctor.equals(req.params.doctor_id))

    await hospital.save()
    await Request.deleteMany({user_id: req.params.doctor_id, hospital_id:req.params.hospital_id})

    const population = await hospital.populate("doctors").execPopulate()

    res.status(200).send(population.doctors)
})

router.delete('/hospital/doctors/:hospital_id', auth, async(req, res) => {
    const hospital = await Hospital.findById(req.params.hospital_id)
    hospital.doctors = hospital.doctors.filter(doctor => !doctor.equals(req.user._id))

    await hospital.save()
    await Request.deleteMany({user_id: req.user.id, hospital_id:req.params.hospital_id})

    const population = await hospital.populate("doctors").execPopulate()

    const requestsPopulation = await req.user.populate("requests").execPopulate()
    const user = {
        ...req.user.toJSON(),
        requests: requestsPopulation.requests,
    }
    res.status(200).send({doctors: population.doctors, user})
})

router.delete('/hospital/appointments/:id', auth, async (req, res) => {
    if (req.user.job !== "Doctor") {
        return res.status(401).send()
    }

    const appointment = await Appointment.findByIdAndDelete(req.params.id)
    const hospital = await Hospital.findById(appointment.hospital_id)
    const appointmentsPopulation = await hospital.populate("appointments").execPopulate()

    res.status(200).send(appointmentsPopulation.appointments)
})

module.exports = router 