import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Doctor from './Doctor/Doctor'
import { connect } from 'react-redux'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import * as actions from '../../../store/actions'
import Profile from '../../../Components/Profile/Profile'

const Doctors = props => {
    let doctors = null
    if (props.doctors) {
        doctors = props.doctors.map(doctor => {
            return (
            <Col   key={doctor._id} xs={4} className="mb-4">
                <Doctor 
                    click ={() => props.fetchUserData(doctor._id)}
                    name={doctor.name}
                    avatar={doctor.avatar}
                    loading={props.loading}
                    deleteDoctor={() => props.deleteDoctor(doctor._id, props.hospital._id)} />
            </Col>
            )
        })
    }
    return (
        <>
        {props.doctorData ? <Profile/> : null }
        <Row className="m-4">
            {props.doctors ? doctors : <Spinner/>}
        </Row>
        </>
    )
}

const mapStateToProps = state => {
    return {
        hospital: state.hospital.hospital,
        doctors: state.hospital.doctors,
        doctorData: state.user.otherUserProfile,
        loading: state.admin.deletingDoctor
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUserData: (doctor_id) => dispatch(actions.fetchUserData(doctor_id)),
        deleteDoctor: (doctor_id, hospital_id) => dispatch(actions.deleteDoctor(doctor_id, hospital_id))
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(Doctors)