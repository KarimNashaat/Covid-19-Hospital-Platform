import * as actionTypes from '../actions/actionTypes'

const initialState = {
    hospital: null,
    doctors: [],
    loading: true,
    waitings: null,
    requests: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCH_DOCTORS:
            return { ...state, loading: true }
        case actionTypes.FETCH_HOSPITAL_INFO_SUCCESS:
            return { ...state, doctors: action.doctors, waitings: action.waitings, requests: action.requests, loading: false, hospital: action.hospital }
        case actionTypes.FETCH_DOCTORS_SUCCESS:
            return { ...state, doctors: action.doctors, loading: false }
        case actionTypes.FETCH_DOCTORS_FAIL:
            return { ...state, error: action.error, loading: false }
        case actionTypes.SELECT_HOSPITAL:
            return { ...state, hospital: action.hospital }
        case actionTypes.FETCH_WAITINGS_SUCCESS:
            return { ...state, waitings: action.waitings, loading: false }
        default:
            return state
    }
}

export default reducer