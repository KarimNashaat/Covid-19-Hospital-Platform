import React from 'react'
import Waiting from './Waiting/Waiting'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'
import Spinner from '../../../Components/UI/Spinner/Spinner'

const Waitings = props => {
    let waitings = null
    if (props.waitings) {
        waitings = props.waitings.map((waiting, index) => {
            return (
                <Col key={waiting._id} xs={8} className="m-3">
                <Waiting 
                number= {waiting.number}
                name={waiting.name}
                age={waiting.age}
                symptoms={waiting.symptoms}
                id={waiting._id}
                disabled={index !== 0}/>
            </Col>
            )
        })
    }
    return (
        <>
            <Container>
                <Row >
                    {props.loading ? <Spinner/> : waitings}
                </Row>
            </Container>
        </>
    )
}

const mapStateToProps = state => {
    return {
        waitings: state.hospital.waitings,
        loading: state.hospital.loading
    }
}

export default connect(mapStateToProps)(Waitings)