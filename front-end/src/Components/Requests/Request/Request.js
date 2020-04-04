import React from 'react'
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import * as actions from '../../../store/actions'
import { connect } from 'react-redux'
import Profile from '../../Profile/Profile'
import { NavLink } from 'react-router-dom'
import Spinner from '../../UI/Spinner/Spinner'

const Request = props => {
    let user = <div className="Nav-link btn h4 btn-link px-0 py-0 inline" style={{ display: "inline-block", verticalAlign: 'inherit' }} onClick={() => props.fetchUserData(props.user_id)}> {props.userName} </div>
    let hospital = <NavLink to="/hospitalpage" className="Nav-link btn h4 btn-link px-0 py-0 inline" style={{ display: "inline-block", verticalAlign: 'inherit' }} onClick={() => props.fetchHospitalInfo(props.hospital_id)}> {props.hospitalName} </NavLink>

    return (
        <>
            {props.userProfile ? <Profile /> : null}
            <Card className="bg-light">
                <CardBody >
                    {user} is applying for {hospital}
                </CardBody>
                <CardBody className="pt-0">
                    {props.loading ? <Spinner /> :
                        <>
                            <Button className="mx-4 my-2" outline color="success" onClick={props.accept}> Accept </Button>
                            <Button className="mx-4" outline color="danger" onClick={props.reject}> Reject </Button>
                        </>
                    }
                </CardBody>
            </Card>
        </>
    )
}

const mapStateToProps = state => {
    return {
        userProfile: state.user.otherUserProfile,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUserData: (doctor_id) => dispatch(actions.fetchUserData(doctor_id)),
        fetchHospitalInfo: (hospital_id) => dispatch(actions.fetchHospitalInfo(hospital_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Request)