import * as actionTypes from './actionTypes'
import axios from '../../axios_auth'
import { fetchHospitalsSuccess } from './home'
import { fetchHospitalInfoSuccess, fetchDoctorsSuccess } from './hospital'

export const toggleAddHospitalModal = () => {
    return {
        type: actionTypes.TOGGLE_ADD_HOSPITAL_MODAL
    }
}

export const startAddHospital =() => {
    return {
        type: actionTypes.START_ADD_HOSPITAL
    }
}

export const addHospitalSuccess = () => {
    return {
        type: actionTypes.ADD_HOSPITAL_SUCCESS,
    }
}

export const addHospitalFail = (error) => {
    return {
        type: actionTypes.ADD_HOSPITAL_FAIL,
        error
    }
}

export const addHospital = (hospital) => {
    return dispatch => {
        dispatch(startAddHospital())
        axios.post('/admin/hospitals', hospital)
        .then(res => {
            dispatch(addHospitalSuccess())
            dispatch(fetchHospitalsSuccess(res.data))
        })
        .catch(error => {
            dispatch(addHospitalFail(error))
        })
    }
}

export const startDeleteHospital = () => {
    return {
        type: actionTypes.START_DELETE_HOSPITAL
    }
}

export const deleteHospitalSuccess = () => {
    return {
        type: actionTypes.DELETE_HOSPITAL_SUCCESS,
        
    }
}

export const deleteHospitalFail = (error) => {
    return {
        type: actionTypes.DELETE_HOSPITAL_FAIL,
        error
    }
}

export const deleteHospital = (hospital_id) => {
    return dispatch => {
        dispatch(startDeleteHospital())
        axios.delete('/admin/hospitals/' + hospital_id)
        .then(res => {
            dispatch(deleteHospitalSuccess())
            dispatch(fetchHospitalsSuccess(res.data))
        })
        .catch(error => {
            dispatch(deleteHospitalFail(error))
        })
    }
}

export const startFetchRequests = () => {
    return {
        type: actionTypes.START_FETCH_REQUESTS
    }
}

export const fetchRequestsSuccess = (requests) => {
    return {
        type: actionTypes.FETCH_REQUESTS_SUCCESS,
        requests
    }
}

export const fetchRequestsFail = (error) => {
    return {
        type: actionTypes.FETCH_REQUESTS_FAIL,
        error
    }
}

export const fetchRequests = () => {
    return dispatch => {
        dispatch(startFetchRequests())
        axios.get('/admin/requests')
        .then(res => {
            dispatch(fetchRequestsSuccess(res.data))
        })
        .catch(error => {
            dispatch(fetchRequestsFail(error))
        })
    }
}

export const startRespondRequest = (request_id) => {
    return {
        type: actionTypes.START_RESPOND_REQUEST,
        request_id
    }
}

export const respondRequestSuccess = (requests) => {
    return {
        type: actionTypes.RESPOND_REQUEST_SUCCESS,
        requests
    }
}

export const respondRequestFail = (error) => {
    return {
        type: actionTypes.RESPOND_REQUEST_FAIL,
        error
    }
}

export const respondRequest = (request_id, accept) => {
    return dispatch => {
        dispatch(startRespondRequest(request_id))

        if(accept) {
            axios.post("/admin/hospital/doctors/" + request_id)
            .then(res => {
                dispatch(respondRequestSuccess(res.data))
            })
            .catch(error => {
                dispatch(respondRequestFail(error))
            })
        }
        else {

            axios.delete("/admin/requests/" + request_id)
            .then(res => {
                dispatch(respondRequestSuccess(res.data))
            })
            .catch(error => {
                dispatch(respondRequestFail(error))
            })
        }
    }
}

export const startDeleteDoctor = () => {
    return {
        type: actionTypes.START_DELETE_DOCTOR
    }
}

export const deleteDoctorSuccess = () => {
    return {
        type: actionTypes.DELETE_DOCTOR_SUCCESS,
        
    }
}

export const deleteDoctorFail = (error) => {
    return {
        type: actionTypes.DELETE_DOCTOR_FAIL,
        error
    }
}

export const deleteDoctor = (doctor_id, hospital_id) => {
    return dispatch => {
        dispatch(startDeleteDoctor())
        axios.delete('/admin/hospital/doctors/' + hospital_id + "/" + doctor_id)
        .then(res => {
            console.log(res)
            dispatch(deleteDoctorSuccess())
            dispatch(fetchDoctorsSuccess(res.data))
        })
        .catch(error => {
            dispatch(deleteHospitalFail(error))
        })
    }
}

