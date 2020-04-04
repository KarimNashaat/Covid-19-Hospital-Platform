export const authSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        token: action.token,
        error: null,
        user: action.user,
        showModal:false,
        admin: action.admin
    }
}