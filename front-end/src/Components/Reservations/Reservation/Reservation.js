import React, { useState } from 'react'
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, CardHeader, Button,
} from 'reactstrap';
import { connect } from 'react-redux'
import ConfirmationModal from '../../UI/ConfirmationModal/ConfirmationModal';

const Reservation = props => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal)

    return (
        <>
            <ConfirmationModal 
            title="Appointment Cancelation"
            body="Are you sure that you want to cancel this Appointment ?"
            click={props.click}
            toggle={toggle}
            modal={modal}
            loading={props.loading}/>
            <Card>
                <CardHeader>
                    Reservation
            </CardHeader>
                <CardBody>
                    <CardText className='text-left'>
                        <strong>At: </strong> {props.hospitalName} <br />
                        <strong>No. </strong> {props.number} <br />
                        <strong>Number of people before you now: </strong> {props.remaining}
                    </CardText>
                    <div className="text-right">
                        <Button color="danger" onClick={toggle}> Cancel </Button>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.user.deletingReservation
    }
}

export default connect(mapStateToProps)(Reservation)