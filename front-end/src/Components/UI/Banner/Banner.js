import React from 'react'
import { Jumbotron, Button } from 'reactstrap';
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'

const Banner = props => {
    return (
        <Jumbotron>
            <h1 className="display-3">Covid-19 Hospitals Platform</h1>
            <p className="lead">This is a simple platform that holds all the hospitals in Cairo that can accept Covid-19 patients.</p>
            <hr className="my-2" />
            <p>Find the suitable Hospital for you and make an ONLINE appointment.</p>
            {props.admin ? <Button color="danger" onClick={props.toggle}> Add New Hospital </Button> : null }
            {/* <p className="lead">
                <Button color="primary">Learn More</Button>
            </p> */}
        </Jumbotron>
    )
}

const mapStateToProps = state => {
    return {
        admin: state.auth.admin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggle: () => dispatch(actions.toggleAddHospitalModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner)