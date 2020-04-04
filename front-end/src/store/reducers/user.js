import * as actionTypes from '../actions/actionTypes'
import { act } from 'react-dom/test-utils'

const initialState = {
    user: null,
    reservations: null,
    loadingReservations: false,
    deletingReservation: false,
    applyingForHospitalAsDoctor: false,
    otherUserProfile: null,
    loadingOtherUserProfile: false,
    showOtherUserModal: false,
    editingProfile: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return { ...state, user: action.user }
        case actionTypes.START_FETCH_RESERVATIONS:
            return { ...state, loadingReservations: true }
        case actionTypes.FETCH_RESERVATIONS_SUCCESS:
            return { ...state, reservations: action.reservations, loadingReservations: false }
        case actionTypes.FETCH_RESERVATIONS_FAIL:
            return { ...state, loadingReservations: false }
        case actionTypes.START_DELETE_RESERVATION:
            return { ...state, deletingReservation: true }
        case actionTypes.DELETE_RESERVATION_SUCCESS:
            return { ...state, deletingReservation: false, reservations: action.reservations }
        case actionTypes.DELETE_RESERVATION_FAIL:
            return { ...state, deletingReservation: false }
        case actionTypes.START_APPLY_FOR_HOSPITAL:
            return { ...state, applyingForHospitalAsDoctor: true }
        case actionTypes.APPLY_FOR_HOSPITAL_SUCCESS:
            return { ...state, applyingForHospitalAsDoctor: false, user: action.user }
        case actionTypes.APPLY_FOR_HOSPITAL_FAIL:
            return { ...state, applyingForHospitalAsDoctor: false }
        case actionTypes.START_FETCH_USER_DATA:
            return { ...state, loadingOtherUserProfile: true }
        case actionTypes.FETCH_USER_DATA_SUCCESS:
            return { ...state, otherUserProfile: action.otherUserProfile, loadingOtherUserProfile: false }
        case actionTypes.FETCH_USER_DATA_FAIL:
            return { ...state, loadingOtherUserProfile: false }
        case actionTypes.TOGGLE_USER_MODAL:
            return { ...state, otherUserProfile: null, loadingOtherUserProfile: false }
        case actionTypes.START_EDIT_PROFILE:
            return { ...state, editingProfile: true }
        case actionTypes.EDIT_PROFILE_SUCCESS:
            return { ...state, user: action.user, editingProfile: false }
        case actionTypes.EDIT_PROFILE_FAIL:
            return { ...state, editingProfile: false }
        default:
            return state
    }
}

export default reducer