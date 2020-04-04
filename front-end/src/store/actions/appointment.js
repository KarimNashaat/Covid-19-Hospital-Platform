import * as actionTypes from './actionTypes'
import axios from '../../axios_auth'
import {fetchHospitalInfo} from './hospital'

export const startSubmitAppointment = () => {
    return {
        type: actionTypes.START_SUBMIT_APPOINTMENT
    }
}

export const submitAppointmentSuccess = (appointment) => {
    return {
        type: actionTypes.SUBMIT_APPOINTMENT_SUCCESS,
        appointment
    }
}

export const submitAppointmentFail = () => {
    return {
        type: actionTypes.SUBMIT_APPOINTMENT_FAIL
    }
}

export const submitAppointment = (appointment) => {
    return dispatch => {
        console.log(appointment)
        dispatch(startSubmitAppointment())
        axios.post("/hospital/appointments", appointment)
        .then(res => {
            console.log(res)
            dispatch(submitAppointmentSuccess(res.data))
            dispatch(fetchHospitalInfo(appointment.hospital_id))
        })
        .catch(error => {
            console.log(error)
            dispatch(submitAppointmentFail(error))
        })
    }
}

export const toggleAppointmentModal = () => {
    return {
        type: actionTypes.TOGGLE_APPOINTMENT_MODAL
    }
}

export const reset = () => {
    return {
        type: actionTypes.RESET_APPOINTMENT
    }
}