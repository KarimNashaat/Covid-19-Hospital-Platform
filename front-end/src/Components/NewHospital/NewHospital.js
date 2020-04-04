import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import * as actions from '../../store/actions'
import { connect } from 'react-redux'
import Spinner from '../UI/Spinner/Spinner'

const NewHospital = props => {
    const [name, setName] = useState(null)
    const [location, setLocation] = useState(null)
    const [specialization, setSpecialization] = useState(null)

    const submit = (event) => {
        event.preventDefault()
        const hospitalForm = {
            name,
            location,
            specialization
        }

        props.submitForm(hospitalForm)
    }
    return (
        <Modal isOpen={props.showModal} style={{ backgroundColor: "white" }}>
            <ModalHeader toggle={props.toggle}>Add New Hospital</ModalHeader>
            <ModalBody>
                <Form onSubmit={(event) => submit(event)}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="email" id="name" placeholder="Name" onChange={(event) => setName(event.target.value)} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="location">Location</Label>
                        <Input type="text" name="email" id="location" placeholder="Location" onChange={(event) => setLocation(event.target.value)} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="specialization">Specialization</Label>
                        <Input type="text" name="email" id="specialization" placeholder="Specialization" onChange={(event) => setSpecialization(event.target.value)} required />
                    </FormGroup>
                    <FormGroup>
                        {props.loading ? <Spinner className="text-center" /> : <Button type="submit" color="danger"> Submit </Button>}
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        showModal: state.admin.newHospitalModal,
        loading: state.admin.addingHospital
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggle: () => dispatch(actions.toggleAddHospitalModal()),
        submitForm: (hospital) => dispatch(actions.addHospital(hospital))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewHospital)