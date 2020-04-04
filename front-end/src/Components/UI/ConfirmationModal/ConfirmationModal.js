import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Spinner from '../../UI/Spinner/Spinner'

const ConfirmationModal = props => {
    
    return (
        <Modal isOpen={props.modal} toggle={props.toggle} style={{ backgroundColor: "white" }}>
            <ModalHeader> {props.title} </ModalHeader>
            <ModalBody>
                {props.body}
            </ModalBody>
            <ModalFooter>
                {props.loading ? <Spinner /> : props.backButton ? <Button color="info" onClick={props.toggle}> Back </Button> :
                    <>
                        <Button color="primary" onClick={props.click}> Yes </Button>{' '}
                        <Button color="secondary" onClick={props.toggle}> No </Button>
                    </>
                }
            </ModalFooter>
        </Modal>
    )
}

export default ConfirmationModal