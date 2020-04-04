import * as actionTypes from './actionTypes'
import axios from '../../axios_auth'
import { fetchHospitalInfoSuccess, fetchWaitingsSuccess, fetchDoctorsSuccess } from './hospital'

export const startFetchReservations = () => {
    return {
        type: actionTypes.START_FETCH_RESERVATIONS
    }
}

export const fetchReservationsSuccuss = (reservations) => {
    return {
        type:actionTypes.FETCH_RESERVATIONS_SUCCESS,
        reservations
    }
}

export const fetchReservationsFail = (error) => {
    return {
        type: actionTypes.FETCH_RESERVATIONS_FAIL,
        error
    }
}

export const fetchReservations = () => {
    return dispatch => {
        dispatch(startFetchReservations())
        axios.get("/user/reservations")
        .then(res => {
            dispatch(fetchReservationsSuccuss(res.data))
        })
        .catch(e => {
            console.log(e.message)
            dispatch(fetchReservationsFail())
        })
    }
}

export const startDeleteReservation = () => {
    return {
        type: actionTypes.START_DELETE_RESERVATION
    }
}

export const deleteReservationSuccess = (reservations) => {
    return {
        type: actionTypes.DELETE_RESERVATION_SUCCESS,
        reservations
    }
}

export const deleteReservationFail = (error) => {
    return {
        type: actionTypes.DELETE_RESERVATION_FAIL,
        error
    }
}

export const deleteReservation = (reservation_id) => {
    return dispatch => {
        dispatch(startDeleteReservation())
        axios.delete('/user/reservations/' + reservation_id)
        .then(res => {
            dispatch(deleteReservationSuccess(res.data))
        })
        .catch(error => {
            dispatch(deleteReservationFail(error))
        })
    }
}

export const startApplyAsDoctorForHospital = () => {
    return {
        type: actionTypes.START_APPLY_FOR_HOSPITAL
    }
}

export const applyAsDoctorForHospitalSuccess = (user) => {
    return {
        type: actionTypes.APPLY_FOR_HOSPITAL_SUCCESS,
        user
    }
}

export const applyAsDoctorForHospitalFail = (error) => {
    return {
        type: actionTypes.APPLY_FOR_HOSPITAL_FAIL,
        error
    }
}

export const applyAsDoctorForHospital = (request) => {
    return dispatch => {
        dispatch(startApplyAsDoctorForHospital())
        axios.post('/user/requests', request)
        .then(res => {
            dispatch(applyAsDoctorForHospitalSuccess(res.data))
        })
        .catch(error => {
            dispatch(applyAsDoctorForHospitalFail(error))
        })
    }
}

export const setUser = (user) => {
    return {
        type:actionTypes.SET_USER,
        user
    }
}

export const startFetchUserData = () => {
    return {
        type: actionTypes.START_FETCH_USER_DATA
    }
}

export const fetchUserDataSuccess = (user) => {
    return {
        type: actionTypes.FETCH_USER_DATA_SUCCESS,
        otherUserProfile: user
    }
}

export const fetchUserDataFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_DATA_FAIL,
        error
    }
}

export const fetchUserData = (user_id) => {
    return dispatch => {
        dispatch(startFetchUserData())
        axios.get("/users/" + user_id)
        .then(res => {
            console.log(res.data)
            dispatch(fetchUserDataSuccess(res.data))
        })
        .catch(error => {
            console.log(error)
            dispatch(fetchUserDataFail(error))
        })
    }
}

export const toggleUserModal = () => {
    return {
        type: actionTypes.TOGGLE_USER_MODAL
    }
}

export const startServing = () => {
    return {
        type: actionTypes.START_FETCH_DOCTORS
    }
}

export const servingSuccess = () => {
    return {
        type: actionTypes.SERVING_SUCCESS
    }
}

export const servingFail = (error) => {
    return {
        type: actionTypes.SERVING_FAIL,
        error
    }
}

export const serve = (appointment_id) => {
    return dispatch => {
        dispatch(startServing())
        axios.delete('/hospital/appointments/'+ appointment_id)
        .then(res => {
            dispatch(servingSuccess())
            dispatch(fetchWaitingsSuccess(res.data))
        })
    }
}

export const leaveHospital = (hospital_id) => {
    return dispatch => {
        dispatch(startApplyAsDoctorForHospital())
        axios.delete("/hospital/doctors/"+ hospital_id)
        .then(res => {
            dispatch(applyAsDoctorForHospitalSuccess(res.data.user))
            dispatch(fetchDoctorsSuccess(res.data.doctors))
        })
    }
}

export const startEditProfile = () => {
    return {
        type:actionTypes.START_EDIT_PROFILE
    }
}

export const editProfileSuccess = (user) => {
    return {
        type: actionTypes.EDIT_PROFILE_SUCCESS,
        user
    }
}

export const editProfileFail = error => {
    return {
        type: actionTypes.EDIT_PROFILE_FAIL,
        error
    }
}

export const editProfile = userEditedProfile => {
    return dispatch => {
        dispatch(startEditProfile())
        axios.patch('/user', userEditedProfile)
        .then(res => {
            if(userEditedProfile.avatar) {
                const formData = new FormData();
                formData.append('avatar', userEditedProfile.avatar)
                axios.patch('/user/avatar', formData)
                .then(res => {
                    dispatch(editProfileSuccess(res.data))
                })
                .catch(error => {
                    dispatch(editProfileFail(error))
                })
            }
            else {
                dispatch(editProfileSuccess(res.data))
            }
        })
        .catch(error => {
            dispatch(editProfileFail(error))
        })
    }
}
