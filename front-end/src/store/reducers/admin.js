import * as actionTypes from '../actions/actionTypes'

const initialState = {
    addingHospital: false,
    newHospitalModal: false,
    requests: null,
    loadingRequests: false,
    respondingForRequest: false,
    respondingRequest_id: null,
    deletingHospital: false,
    deletingDoctor: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_ADD_HOSPITAL:
            return { ...state, addingHospital: true }
        case actionTypes.ADD_HOSPITAL_SUCCESS:
            return { ...state, addingHospital: false, newHospitalModal: false }
        case actionTypes.ADD_HOSPITAL_FAIL:
            return { ...state, addingHospital: false, newHospitalModal: false }
        case actionTypes.TOGGLE_ADD_HOSPITAL_MODAL:
            return { ...state, newHospitalModal: !state.newHospitalModal }
        case actionTypes.START_FETCH_REQUESTS:
            return { ...state, loadingRequests: true }
        case actionTypes.FETCH_REQUESTS_SUCCESS:
            return { ...state, loadingRequests: false, requests: action.requests }
        case actionTypes.FETCH_REQUESTS_FAIL:
            return { ...state, loadingRequests: false }
        case actionTypes.START_RESPOND_REQUEST:
            return { ...state, respondingForRequest: true, respondingRequest_id: action.request_id }
        case actionTypes.RESPOND_REQUEST_SUCCESS:
            return { ...state, respondingForRequest: false, requests: action.requests, respondingRequest_id: null }
        case actionTypes.RESPOND_REQUEST_FAIL:
            return { ...state, respondingForRequest: false, respondingRequest_id: null }
        case actionTypes.START_DELETE_HOSPITAL:
            return { ...state, deletingHospital: true }
        case actionTypes.DELETE_HOSPITAL_SUCCESS:
            return { ...state, deletingHospital: false }
        case actionTypes.DELETE_HOSPITAL_FAIL:
            return { ...state, deletingHospital: false }
        case actionTypes.START_DELETE_DOCTOR:
            return { ...state, deletingDoctor: true }
        case actionTypes.DELETE_DOCTOR_SUCCESS:
            return { ...state, deletingDoctor: false }
        case actionTypes.DELETE_DOCTOR_FAIL:
            return { ...state, deletingDoctor: false }
        default:
            return state
    }
}

export default reducer