import * as actionTypes from '../actions/actionTypes'

const initialState = {
    appointment: null,
    loading: false,
    appointmentModal: false,
    succeeded: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_SUBMIT_APPOINTMENT:
            return { ...state, loading: true }
        case actionTypes.SUBMIT_APPOINTMENT_FAIL:
            return { ...state, loading: false }
        case actionTypes.SUBMIT_APPOINTMENT_SUCCESS:
            return { ...state, loading: false, appointmentModal:false, appointment: action.appointment }
        case actionTypes.TOGGLE_APPOINTMENT_MODAL:
            return { ...state, appointmentModal: !state.appointmentModal }
        case actionTypes.RESET_APPOINTMENT:
            return { ...state, appointment:null}
        default:
            return state
    }
}

export default reducer