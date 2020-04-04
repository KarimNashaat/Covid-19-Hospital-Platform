import * as actionTypes from './actionTypes'
import axios from '../../axios_auth'

export const startFetchHospitalInfo = () => {
    return {
        type: actionTypes.START_FETCH_DOCTORS
    }
}

export const fetchHospitalInfoSuccess = (hospital) => {
    return {
        type: actionTypes.FETCH_HOSPITAL_INFO_SUCCESS,
        hospital,
        doctors: hospital.doctors,
        waitings: hospital.appointments,
        requests: hospital.requests
    }
}

export const fetchHospitalInfoFail = (error) => {
    return {
        type: actionTypes.FETCH_DOCTORS_FAIL,
        error
    }
}

export const fetchHospitalInfo = (hospital_id) => {
    return (dispatch) => {
        dispatch(startFetchHospitalInfo())
        axios.get("/hospital/"+hospital_id)
        .then(res => {
            console.log(res)
            dispatch(fetchHospitalInfoSuccess(res.data))
        })
        .catch(error => {
            console.log(error)
            dispatch(fetchHospitalInfoFail(error))
        })
    }
}

export const hospitalSelect = (hospital) => {
    return {
        type: actionTypes.SELECT_HOSPITAL,
        hospital
    }
}

export const fetchWaitingsSuccess = (waitings) => {
    return {
        type:actionTypes.FETCH_WAITINGS_SUCCESS,
        waitings
    }
}

export const fetchDoctorsSuccess = (doctors) => {
    return {
        type: actionTypes.FETCH_DOCTORS_SUCCESS,
        doctors
    }
}
