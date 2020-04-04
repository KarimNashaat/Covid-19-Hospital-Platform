import React, { useState } from 'react'
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, CardHeader, Button
} from 'reactstrap';
import { NavLink } from 'react-router-dom'
import HospitalImg from '../../../assets/images/hospital.png'
import "./Hospital.css"
import { connect } from "react-redux"
import * as actions from '../../../store/actions'
import ConfirmationModal from '../../UI/ConfirmationModal/ConfirmationModal';

const Hospital = props => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal)

    return (
        <>
            <ConfirmationModal
                title="Hospital Deletion"
                body="Are you sure that you want to delete this Hospital ?"
                click={props.deleteHospital}
                toggle={toggle}
                modal={modal}
                loading={props.loading} />

            <Card style={{ marginBottom: '10px' }}>
                <CardHeader>
                    <CardTitle className="text-left text-justify">{props.name}
                        {props.admin ?
                            <button type="button" onClick={toggle} className="close text-right" style={{ position: "absolute", top: "10px", right: "10px" }} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button> : null}
                    </CardTitle>
                    {/* <CardSubtitle className="text-left">For Respiratory systems</CardSubtitle> */}
                </CardHeader>
                <img src={HospitalImg} style={{ margin: 'auto', height: "70%", width: "50%" }} />
                <CardBody>
                    <CardText className="text-left"><strong>Location: </strong> {props.location}</CardText>
                    <CardText className="text-left text-justify"><strong>Specialization: </strong>{props.specialization}</CardText>
                    <NavLink className="btn btn-primary" to="hospitalpage" onClick={props.click}>View</NavLink>
                </CardBody>
            </Card>
        </>
    )
}

const mapStateToProps = state => {
    return {
        admin: state.auth.admin,
        loading: state.admin.deletingHospital
    }
}

export default connect(mapStateToProps)(Hospital)