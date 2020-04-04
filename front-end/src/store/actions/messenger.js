import * as actionTypes from './actionTypes'
import axios from '../../axios_auth'

export const redirectToMessages = () => {
    return {
        type: actionTypes.REDIRECT_TO_MESSAGES
    }
}

export const resetRedirectPath = () => {
    return {
        type: actionTypes.RESET_REDIRECT_PATH
    }
}

export const startFetchChats = () => {
    return {
        type: actionTypes.START_FETCH_CHATS
    }
}

export const fetchChatsSuccess = (chats) => {
    return {
        type: actionTypes.FETCH_CHATS_SUCCESS,
        chats
    }
}

export const fetchChatsFail = (error) => {
    return {
        type: actionTypes.FETCH_CHATS_FAIL,
        error
    }
}

export const fetchChats = () => {
    return dispatch => {
        dispatch(startFetchChats())
        axios.get('/user/chats')
        .then(res => {
            dispatch(fetchChatsSuccess(res.data))
        })
        .catch(error => {
            dispatch(fetchChatsFail(error))
        })
    }
}

export const startFetchMessages = () => {
    return {
        type: actionTypes.START_FETCH_MESSAGES
    }
}

export const fetchMessagesSuccess = (chat) => {
    return {
        type: actionTypes.FETCH_MESSAGES_SUCCESS,
        messages: chat.messages,
        currentUserName: chat.userName,
        currentUserAvatar: chat.otherAvatar,
        currentUser_id: chat.other_id,
        chat_id: chat._id
    }
}

export const fetchMessagesFail = (error) => {
    return {
        type: actionTypes.FETCH_MESSAGES_FAIL,
        error
    }
}

export const fetchMessages = (chat_id) => {
    return dispatch => {
        dispatch(startFetchMessages())
        axios.get('/user/chatmessages/' + chat_id)
        .then(res => {
            dispatch(fetchMessagesSuccess(res.data))
        })
        .catch(error => {
            dispatch(fetchMessagesFail(error))
        })
    }
}

export const sendMessageSuccess= chat => {
    return {
        type:actionTypes.SEND_MESSAGE_SUCCESS,
        messages: chat.messages
    }
}

export const sendMessage= (message, other_id, chat_id) => {
    return dispatch => {
        const req = {
            message,
            other_id,
            chat_id
        }

        axios.post('/user/chatmessages', req)
        .then(res => {
            dispatch({type: actionTypes.SET_MESSAGE_FOR_SOCKET, message: req})
            dispatch(sendMessageSuccess(res.data))
        })
        .catch(error => {
            dispatch(fetchMessagesFail(error))
        })
    }
} 

export const startConverstation = (doctor_id) => {
    return dispatch => {
        dispatch(startFetchChats())
        
        axios.get('/user/chatmessages/doctor/' + doctor_id)
        .then(res => {
            console.log(res)
            dispatch(fetchChatsSuccess(res.data.chats))
            dispatch(fetchMessagesSuccess(res.data.userChat))
        })
        .catch(error => {
            dispatch(fetchChatsFail(error))
        })
    }
}

export const setSocket = (socket) =>{
    return {
        type: actionTypes.SET_SOCKET,
        socket
    }
}
