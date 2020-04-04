import React, { useEffect } from 'react'
import Reservation from './Reservation/Reservation'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import Spinner from '../../Components/UI/Spinner/Spinner'

const Reservations = props => {
    let reservations = null
    if (props.reservations) {
        reservations = props.reservations.map(reservation => {
            return (
                <Col key={reservation._id} xs={8} className="m-3">
                    <Reservation
                    hospitalName={reservation.hospitalName}
                    number={reservation.number}
                    remaining={reservation.remainingNumber}
                    click={() => props.deleteReservation(reservation._id)}/>
                </Col>
            )
        })
    }
    return (
        <Container className="m-3">
            <Row>
                <Col xs={3}>
                    <p className="display-4"> Reservations </p>
                </Col>
            </Row>
            <Row className="border-top">
                {props.loading ? <Spinner/> : reservations}
            </Row>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        reservations: state.user.reservations,
        loading: state.user.loadingReservations
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteReservation: (reservation_id) => dispatch(actions.deleteReservation(reservation_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservations)