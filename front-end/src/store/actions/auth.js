import * as actionTypes from './actionTypes'
import axios from '../../axios_auth'
import { setUser } from './user'

export const authModalToggle = () => {
    return {
        type: actionTypes.AUTH_MODAL_TOGGLE
    }
}

export const authFormToggle = () => {
    return {
        type: actionTypes.AUTH_FORM_TOGGLE
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (res) => {
    let admin = false
    if (res.user.email === "admin@admin.com") {
        admin = true
    }

    return {
        type: actionTypes.AUTH_SUCCESS,
        token: res.token,
        user: res.user,
        admin
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logOut = () => {
    return dispatch => {
        dispatch(setUser(null))
        localStorage.removeItem('token')
        dispatch({type:actionTypes.AUTH_LOGOUT})
    }
}

export const authRedirection = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT,
        path
    }
}

export const signUp = (email, password, name, job, phone, birthday, profilePicture, gender, isSignUp) => {
    return (dispatch) => {
        dispatch(authStart())

        const req = {
            email,
            password,
            name,
            job,
            phone,
            birthday,
            gender
        }
        const formData = new FormData();
        formData.append('userData', JSON.stringify(req))
        formData.append('avatar', profilePicture)

        let url = "/user/signup"

        axios.post(url, formData)
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.token)

                dispatch(authSuccess(res.data))
                dispatch(setUser(res.data.user))
            }).catch(e => {
                console.log("Error: ", e)
                dispatch(authFailed(e))
            })
    }
}

export const login = (email, password) => {
    return (dispatch) => {
        dispatch(authStart())

        const req = {
            email,
            password,
        }
        console.log(process.env.REACT_APP_API_URL)
        const url = "/user/login"
        axios.post(url, req)
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.token)

                dispatch(authSuccess(res.data))
                dispatch(setUser(res.data.user))
            }).catch(e => {
                console.log("Error: ", e)
                dispatch(authFailed(e))
            })
    }
}


export const onTrySignIn = () => {
    return dispatch => {
        const token = localStorage.getItem('token')

        if (!token) {
            return dispatch(logOut())
        }
        else {
            axios.get("/user/auto-login")
                .then(res => {
                    dispatch(authSuccess(res.data))
                    dispatch(setUser(res.data.user))
                })
                .catch(e => {
                    console.log(e.message)
                    dispatch(authFailed(e))
                })
        }
    }
}

