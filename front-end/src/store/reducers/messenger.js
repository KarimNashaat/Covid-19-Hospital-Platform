import * as actionTypes from '../actions/actionTypes'

const initialState = {
    chats: null,
    messages: null,
    loadingMessages: false,
    loadingChats: false,
    currentUserName: null,
    currentUserAvatar: null,
    currentUser_id: null,
    chat_id: null,
    redirectPath: null,
    message: null,
    socket: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCH_CHATS:
            return { ...state, loadingChats: true }
        case actionTypes.FETCH_CHATS_SUCCESS:
            return { ...state, chats: action.chats, loadingChats: false }
        case actionTypes.FETCH_CHATS_FAIL:
            return { ...state, loadingChats: false }
        case actionTypes.START_FETCH_MESSAGES:
            return { ...state, loadingMessages: true }
        case actionTypes.FETCH_MESSAGES_SUCCESS:
            return { ...state, messages: action.messages, loadingMessages: false, chat_id: action.chat_id, currentUserName: action.currentUserName, currentUserAvatar: action.currentUserAvatar, currentUser_id: action.currentUser_id }
        case actionTypes.FETCH_MESSAGES_FAIL:
            return { ...state, loadingMessages: false }
        case actionTypes.SEND_MESSAGE_SUCCESS:
            return { ...state, messages: action.messages, message: null }
        case actionTypes.REDIRECT_TO_MESSAGES:
            return { ...state, redirectPath: "/messages" }
        case actionTypes.RESET_REDIRECT_PATH:
            return { ...state, redirectPath: null }
        case actionTypes.SET_MESSAGE_FOR_SOCKET:
            return { ...state, message: action.message }
        case actionTypes.SET_SOCKET:
            return { ...state, socket: action.socket}
        case actionTypes.AUTH_LOGOUT:
            return initialState
        default:
            return state
    }
}

export default reducer