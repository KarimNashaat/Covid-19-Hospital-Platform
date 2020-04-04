import React, { useState } from 'react'
import { Media, Jumbotron, Button } from 'reactstrap';
import HospitalImg from '../../assets/images/hospital.png'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import Appointment from '../../Components/Appointment/Appointment';
import ConfirmationModal from '../../Components/UI/ConfirmationModal/ConfirmationModal'

const Hospital = props => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal)

    const [leaveModal, setLeaveModal] = useState(false);
    const toggleLeaveModal = () => setLeaveModal(!leaveModal)

    let leaveConfirmationModal = null
    let doctorPart = null
    let requestModal = null
    if (props.user) {
        if (props.user.job === "Doctor") {

            let doctors_ids = props.doctors.map(({ _id }) => _id)
            if (doctors_ids.includes(props.user._id)) {
                leaveConfirmationModal = <ConfirmationModal
                    title="Leave the hospital"
                    body="Are you sure you want to leave this hospital ?"
                    toggle={toggleLeaveModal}
                    modal={leaveModal}
                    loading={props.loading}
                    click={() => props.leaveHospital(props.hospital._id)} />
            }

            doctorPart = <div style={{ display: "inline-block" }} className="h5"> Apply as a doctor for this hospital from <div style={{ display: "inline-block", fontSize: "1.25rem", verticalAlign: 'inherit' }} className="Nav-link btn h4 btn-link px-0 py-0 inline" onClick={toggle}>Here</div></div>

            let requests = props.user.requests
            let requests_ids = requests.map(({ hospital_id }) => hospital_id)

            if (requests_ids.includes(props.hospital._id)) {
                let status = requests.find(request => request.hospital_id === props.hospital._id).status
                if (status === "Accepted") {
                    doctorPart = <>
                        <p className="text-info"> <i className="fa fa-user-md"></i>You are a Doctor in this Hospital. </p>
                        <Button outline color="danger" onClick={toggleLeaveModal}> Leave </Button>
                    </>
                }
                else {
                    requestModal = <ConfirmationModal
                        title="Apply Request"
                        body={`Your request is ${status}.`}
                        toggle={toggle}
                        modal={modal}
                        backButton={true} />
                }
            }
            else {
                let request = {
                    hospital_id: props.hospital._id,
                    hospitalName: props.hospital.name
                }
                requestModal = <ConfirmationModal
                    title="Apply Request"
                    body="Are you sure you want to apply for this hospital ?"
                    toggle={toggle}
                    modal={modal}
                    loading={props.loading}
                    click={() => props.apply(request)} />
            }


        }
    }
    return (
        <>
            {requestModal}
            {leaveConfirmationModal}
            {props.user ? <Appointment /> : null}
            <Jumbotron style={{ padding: "2rem 0rem" }}>
                <Media>
                    <Media left style={{ width: '30%' }}>
                        <Media object src={HospitalImg} style={{ width: '50%' }} alt="Generic placeholder image" />
                    </Media>
                    <Media body className="text-left">
                        <p className="h4">
                            {props.hospital.name}
                        </p>
                        Location: {props.hospital.location} <br />
                        Specialization: {props.hospital.specialization} <br />
                        <p className="lead mt-4">
                            <Button color="primary" onClick={props.user ? props.toggleAppointmentModal : props.authModalToggle}>Make Appointment</Button>
                        </p>
                        <hr />
                        {doctorPart}
                    </Media>
                </Media>
            </Jumbotron>
        </>
    )
}

const mapStateToProps = state => {
    return {
        hospital: state.hospital.hospital,
        doctors: state.hospital.doctors,
        requests: state.hospital.requests,
        user: state.user.user,
        loading: state.user.applyingForHospitalAsDoctor
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleAppointmentModal: () => dispatch(actions.toggleAppointmentModal()),
        authModalToggle: () => dispatch(actions.authModalToggle()),
        apply: (request) => dispatch(actions.applyAsDoctorForHospital(request)),
        leaveHospital: (hospital_id) => dispatch(actions.leaveHospital(hospital_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hospital)