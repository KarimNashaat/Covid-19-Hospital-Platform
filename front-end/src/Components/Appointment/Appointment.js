import React, { useState } from 'react'
import { Alert, Fade, Form, FormGroup, Label, Input, FormText, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import Spinner from '../UI/Spinner/Spinner'
import SuccessAlert  from './SuccessAlert'

const Appointment = props => {
    const [symptoms, setSymbtoms] = useState([])
    const [name, setName] = useState(null)
    const [age, setAge] = useState(null)
    const [other, setOther] = useState(null)

    const addSymptoms = (symptom) => {
        if (!symptoms.includes(symptom)) {
            setSymbtoms([...symptoms, symptom])
        }
        else {
            setSymbtoms(symptoms.filter(sym => sym != symptom))
        }
    }

    const submitAppointment = (event) => {
        console.log(event)
        event.preventDefault()
        let newSymptoms = symptoms
        if (other && other !== "") {
            newSymptoms = [...symptoms, other]
        }
        const appointment = {
            name,
            age,
            symptoms: newSymptoms,
            hospitalName: props.hospitalName,
            hospital_id: props.hospital_id,
            user_id: props.user._id
        }
        props.submitAppointment(appointment)
    }

    return (
        <>
            {<SuccessAlert appointment={props.appointment}/>}
            <Modal isOpen={props.modal} style={{ backgroundColor: "white" }}>
                <ModalHeader toggle={props.toggleModal}>Making an appointment</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(event) => submitAppointment(event)}>
                        <FormGroup>
                            <Label for="exampleName">Name</Label>
                            <Input type="text" name="name" id="exampleName" placeholder="Name" required onChange={(event) => setName(event.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleAge">Age</Label>
                            <Input type="number" name="age" id="exampleAge" placeholder="Age" required onChange={(event) => setAge(event.target.value)} />
                        </FormGroup>
                        <FormGroup tag="fieldset">
                            <legend>Symptoms</legend>
                            <FormGroup check>
                                <Input type="checkbox" onChange={() => addSymptoms("Fever")} />{'Fever'}
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" onChange={() => addSymptoms("Cough")} />{'Cough'}
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" onChange={() => addSymptoms("Difficulty breathing")} />{'Difficulty breathing'}
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">Others</Label>
                                <Input type="textarea" name="text" id="exampleText" onChange={(event) => setOther(event.target.value)} />
                            </FormGroup>
                            {props.loading ? <Spinner className="text-center" /> :
                                <Button type="submit">Submit</Button>}
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}

const mapStateToProps = state => {
    return {
        hospital_id: state.hospital.hospital._id,
        hospitalName: state.hospital.hospital.name,
        user: state.auth.user,
        loading: state.appointment.loading,
        modal: state.appointment.appointmentModal,
        appointment: state.appointment.appointment
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitAppointment: (appointment) => dispatch(actions.submitAppointment(appointment)),
        toggleModal: () => dispatch(actions.toggleAppointmentModal()),
        reset: () => dispatch(actions.reset())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Appointment)