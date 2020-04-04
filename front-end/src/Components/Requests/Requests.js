import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Request from './Request/Request'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

const Requests = props => {
    let requests = null

    if (props.requests) {
        requests = props.requests.map(request => {
            return <Col key={request._id} className="shadow px-0  m-3 border-secondary " xs={8}>
                <Request
                userName={request.userName}
                user_id={request.user_id}
                hospital_id={request.hospital_id}
                hospitalName={request.hospitalName}
                loading={props.loading && props.id === request._id}
                accept={() => props.respondRequest(request._id, true)}
                reject={() => props.respondRequest(request._id, false)}/>
            </Col>
        })
    }

    return (
        <Container className="m-3">
            <Row className="m-3">
                <h3> Requests </h3>
                <hr />
            </Row>
            <Row className="border-top">
                {requests}
            </Row>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        requests: state.admin.requests,
        loading: state.admin.respondingForRequest,
        id: state.admin.respondingRequest_id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        respondRequest : (request_id, accept) => dispatch(actions.respondRequest(request_id, accept))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Requests)