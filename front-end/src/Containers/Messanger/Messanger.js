import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col, Input } from 'reactstrap'
import './Messanger.css'
import classNames from 'classnames'
import defaultAvatar from '../../assets/images/user-avatar-placeholder.png'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import Spinner from '../../Components/UI/Spinner/Spinner'
import RealtimeSocket from '../../Components/RealtimeSocket'
import MessengerInput from '../../Components/MessengerInput/MessengerInput'
import Profile from '../../Components/Profile/Profile'

function bufferToBase64(buf) {
    var binstr = Array.prototype.map.call(buf, function (ch) {
        return String.fromCharCode(ch);
    }).join('');
    return btoa(binstr);
}

const Messanger = props => {
    // const [newMessage, setNewMessage] = useState("")
    const messagesEndRef = useRef(null)
    const msgInputRef = useRef(null)

    useEffect(() => {
        if (props.redirectPath !== null) {
            props.resetRedirectPath()
        }
    }, [])

    useEffect(() => {
        if (props.socket && props.currentUser_id) {
            props.socket.emit("changeChat", props.currentUser_id)
        }
    }, [props.currentUser_id])

    useEffect(() => {
        if (props.socket !== null && props.message !== null) {
            console.log("sending")
            props.socket.emit('message', props.message);
        }
    }, [props.message])

    const style = {
        height: window.innerHeight - 56,
    };

    const renderAvatar = (avatar) => {
        if (avatar) {
            if (avatar.data) {
                let bytes = new Uint8Array(avatar.data);
                return <div className="channel-avatars channel-avatars-1 img">  <img src={`data:image/png;base64,${bufferToBase64(bytes)}`} /> </div>
            }
            else {
                console.log('here')
                return <div className="channel-avatars channel-avatars-1 img">  <img src={`data:image/jpeg;base64,${avatar}`} /> </div>

            }
        }
        else {
            return <div className="channel-avatars channel-avatars-1 img"> <img src={defaultAvatar} /> </div>
        }
    }

    const renderSmallAvatar = (avatar) => {
        if (avatar) {
            if (avatar.data) {
                let bytes = new Uint8Array(avatar.data);
                return <img onClick={() => props.fetchUserData(props.currentUser_id)} src={`data:image/png;base64,${bufferToBase64(bytes)}`} />
            }
            else {
                return <img onClick={() => props.fetchUserData(props.currentUser_id)} src={`data:image/png;base64,${avatar}`} />
            }
        }
        else {
            return <img onClick={() => props.fetchUserData(props.currentUser_id)} src={defaultAvatar} />
        }
    }

    const sendMessage = (newMessage) => {
        props.sendMessage(newMessage, props.currentUser_id, props.chat_id)
        // setNewMessage("")
    }

    let chats = props.loadingChats ? <Spinner /> : null

    if (props.chats) {
        chats = <div className="chanels">

            {props.chats.map((chat, key) => {

                return (
                    <div onClick={(key) => {
                        props.fetchMessages(chat._id)
                        // store.setActiveChannelId(channel._id);

                    }} key={chat._id} className="chanel">
                        <div className="user-image">
                            {renderAvatar(chat.otherAvatar)}
                        </div>
                        <div className="chanel-info">
                            <h2><strong>{chat.userName} </strong></h2>
                            <p style={{ marginLeft: "25px" }}>{chat.lastMessage}</p>
                        </div>

                    </div>
                )
            })}

        </div>
    }

    let messages = props.loadingMessages ? <Spinner /> : null
    let input = null
    if (props.messages) {
        messages =
            <>
                {props.messages.map((messageObj, index) => {
                    let message = messageObj.message
                    return (
                        <div key={index} className={classNames('message', { 'me': message.from === props.me._id })}>
                            <div className="message-user-image">
                                {message.from !== props.me._id ? renderSmallAvatar(props.currentUserAvatar) : props.me.avatar ? <img src={`data:image/png;base64,${props.me.avatar}`} /> : <img src={defaultAvatar} alt="" />}
                            </div>
                            <div className="message-body">
                                <div
                                    className="message-author text-left" >{message.from === props.me._id ? <strong>You</strong> : <strong>{props.currentUserName}</strong>}
                                </div>
                                <div className="message-text">
                                    {<p className="mb-1"> {message.body} </p>}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>

        input = <MessengerInput sendMessage={sendMessage} />
    }

    const scrollToBottom = () => {
        const scrollHeight = messagesEndRef.current.scrollHeight;
        const height = messagesEndRef.current.clientHeight;
        const maxScrollTop = scrollHeight - height;
        messagesEndRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
    useEffect(scrollToBottom, [props.messages]);

    return (
        <>
            {props.otherUserProfile ? <Profile /> : null}
            <div style={style} className="app-messenger pb-3">
                <div className="header">
                    <div className="left">
                        <button className="left-action"><i className="icon-settings-streamline-1" /></button>
                        <button className="right-action"><i
                            className="icon-edit-modify-streamline" /></button>
                        <h2>Messenger</h2>
                    </div>
                </div>
                <div className="main">
                    <div className="sidebar-left">
                        {chats}

                    </div>
                    <div className="content">
                        <div ref={messagesEndRef} className="messages">
                            {messages}
                        </div>
                        {input}
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        me: state.auth.user,
        chats: state.messenger.chats,
        messages: state.messenger.messages,
        loadingMessages: state.messenger.loadingMessages,
        loadingChats: state.messenger.loadingChats,
        currentUserName: state.messenger.currentUserName,
        currentUserAvatar: state.messenger.currentUserAvatar,
        currentUser_id: state.messenger.currentUser_id,
        chat_id: state.messenger.chat_id,
        redirectPath: state.messenger.redirectPath,
        message: state.messenger.message,
        socket: state.messenger.socket,
        otherUserProfile: state.user.otherUserProfile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMessages: (chat_id) => dispatch(actions.fetchMessages(chat_id)),
        sendMessage: (message, otherUser_id, chat_id) => dispatch(actions.sendMessage(message, otherUser_id, chat_id)),
        resetRedirectPath: () => dispatch(actions.resetRedirectPath()),
        fetchUserData: (user_id) => dispatch(actions.fetchUserData(user_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messanger)