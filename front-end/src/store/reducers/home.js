import * as actionTypes from '../actions/actionTypes'

const initialState = {
    hospitals: null,
    loading: true,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCH_HOSPITALS:
            return { ...state, loading: true }
        case actionTypes.FETCH_HOSPITALS_SUCCESS:
            return { ...state, hospitals: action.hospitals, loading: false }
        case actionTypes.FETCH_HOSPITALS_FAIL:
            return { ...state, error: action.error, loading: false }
        default:
            return state
    }
}

export default reducer