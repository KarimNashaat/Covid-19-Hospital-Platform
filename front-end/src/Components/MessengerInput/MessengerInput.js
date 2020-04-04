import React, { useState } from 'react'

const MessengerInput = props => {
    const [newMessage, setNewMessage] = useState("")

    return (
        <div className="messenger-input">
            <div className="text-input">
                <input type="text" autoFocus className="form-control" value={newMessage} onChange={(event) => { setNewMessage(event.target.value) }} placeholder="Write your messsage..." 
                onKeyUp={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey && newMessage !== "") {
                        props.sendMessage(newMessage)
                        setNewMessage("")
                    }}}/>
                {/* <textarea onKeyUp={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey && newMessage !== "") {
                        sendMessage()
                    }
                }} value={newMessage} onChange={(event) => { setNewMessage(event.target.value) }} placeholder="Write your messsage..." /> */}
            </div>
            <div className="actions">
                <button onClick={() => {
                    props.sendMessage(newMessage)
                    setNewMessage("")
                }} className="send">Send</button>
            </div>
        </div>
    )
}

export default MessengerInput