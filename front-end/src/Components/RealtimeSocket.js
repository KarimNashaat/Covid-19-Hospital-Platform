import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import Messenger from '../Containers/Messanger/Messanger'

const RealtimeSocket = props => {
    let socket = null

    useEffect(() => {
        socket = socketIOClient(process.env.REACT_APP_API_URL, { transports: ['websocket'] });
        socket.emit("open", {
            token: props.token,
            user_id: props.user._id
        })


        socket.on('message', res => {
            console.log(res)
            if(res.chats){
                props.fetchChatsSuccess(res.chats)
            }
            if(res.userChat){
                props.fetchMessagesSuccess(res.userChat)
            }
        })

        props.setSocket(socket)
    }, [])

    return (
        <div>
            <Messenger />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token: state.auth.token,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchChatsSuccess: (chats) => dispatch(actions.fetchChatsSuccess(chats)),
        fetchMessagesSuccess: (chat) => dispatch(actions.fetchMessagesSuccess(chat)),
        setSocket: (socket) => dispatch(actions.setSocket(socket))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RealtimeSocket)