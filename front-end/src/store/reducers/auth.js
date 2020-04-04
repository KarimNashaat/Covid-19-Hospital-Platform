import * as actionTypes from '../actions/actionTypes'
import { authSuccess } from '../utility'

const initialState = {
    showModal: false,
    loading: false,
    token: null,
    signInForm: true,
    error: null,
    user: null,
    admin: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_MODAL_TOGGLE:
            return { ...state, showModal: !state.showModal }
        case actionTypes.AUTH_FORM_TOGGLE:
            return { ...state, signInForm: !state.signInForm }
        case actionTypes.AUTH_START:
            return { ...state, loading: true }
        case actionTypes.AUTH_FAIL:
            return { ...state, loading: false, error: action.error }
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_LOGOUT:
            return initialState
        default:
            return state
    }
}

export default reducer