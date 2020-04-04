import React from 'react'
import {
    Card, CardText, CardBody, Button, CardHeader
} from 'reactstrap';
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions'

const Waiting = props => {
    let symptoms = null
    if (props.symptoms) {
        symptoms = props.symptoms.map(symptom => {
            return (
                <li key={symptom}>{symptom}</li>
            )
        })
    }

    let serveButton = null
    if (props.user) {
        let doctors = props.hospital.doctors.map(({_id}) => _id)
        if (doctors.includes(props.user._id)) {
            serveButton = <Button onClick={() => props.serve(props.id)} disabled={props.disabled}>Serve</Button>
        }
    }

    return (
        <Card>
            <CardHeader className="text-left">
                Reservation No.<strong>{props.number}</strong>
            </CardHeader>
            <CardBody >
                <CardText className="text-left">
                    <strong>Name:</strong> {props.name}
                    <br />
                    <strong>Age:</strong> {props.age}
                    <br />
                    {props.symptoms.length !== 0 ? <strong>Symptoms:</strong> : null}
                </CardText>
                <ul className="text-left">
                    {symptoms}
                </ul>
                {serveButton}
            </CardBody>

        </Card>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        hospital: state.hospital.hospital,
        hospitalDoctors: state.hospital.doctors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        serve: (appointment_id) => dispatch(actions.serve(appointment_id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Waiting)