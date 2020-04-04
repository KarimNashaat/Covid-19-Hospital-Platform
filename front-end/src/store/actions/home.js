import * as actionTypes from './actionTypes'
import axios from '../../axios_auth'

export const startFetchingHospitals = () => {
    return {
        type: actionTypes.START_FETCH_HOSPITALS
    }
}

export const fetchHospitalsSuccess = (hospitals) => {
    return {
        type: actionTypes.FETCH_HOSPITALS_SUCCESS,
        hospitals
    }
}

export const fetchHospitalsFail = (error) => {
    return {
        type: actionTypes.FETCH_HOSPITALS_FAIL,
        error
    }
}

export const fetchHospitals = () => {
    return (dispatch) => {
        dispatch(startFetchingHospitals())
        axios.get("/hospitals")
        .then(res => {
            dispatch(fetchHospitalsSuccess(res.data))
        })
        .catch(error => {
            console.log(error)
            dispatch(fetchHospitalsFail(error))
        })
    }
}