import React, {useState} from 'react'
import { Alert, Fade, Form, FormGroup, Label, Input, FormText, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import * as actions from '../../store/actions'
import { connect } from 'react-redux'

const SuccessAlert = props => {
    let successAlert = null
    const [modal, setModal] = useState(true);

    const toggle = () => setModal(!modal);

    if (props.appointment) {
        successAlert =
            <Modal isOpen={modal} toggle={toggle} onClosed={props.reset}>
                <ModalBody style={{width:"100%"}}>
                    <Alert color="success" tabIndex="-1" className="text-justify">
                        Your appointment has been successfully submitted ! Your number is <strong>{props.appointment.number}</strong>
                    </Alert>
                </ModalBody>
            </Modal>
        setTimeout(() => {
            toggle()
        }, 3000);
    }
    return (
        <>
        {successAlert}
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        reset: () => dispatch(actions.reset())
    }
}

export default connect(null, mapDispatchToProps)(SuccessAlert)