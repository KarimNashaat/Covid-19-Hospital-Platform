import React, { useState } from 'react'
import { Container, Row, Col, Card, CardBody, CardHeader, CardText, Button } from 'reactstrap'
import defaultAvatar from '../../../../assets/images/male-doctor.jpg'
import { connect } from 'react-redux'
import ConfirmationModal from '../../../../Components/UI/ConfirmationModal/ConfirmationModal'

const Doctor = props => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal)

    return (
        <>
            <ConfirmationModal
                title="Doctor Removal"
                body="Are you sure that you want to remove this Doctor?"
                click={props.deleteDoctor}
                toggle={toggle}
                modal={modal}
                loading={props.loading} />
            {props.admin ?
                <button type="button" onClick={toggle} className="close text-right" style={{ position: "absolute", right: "40px" }} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button> : null}
            <div onClick={props.click}>
                <figure className="thumbnail" className="nav-link" >
                    <img className="img_btn img-fluid"
                        src={props.avatar ? `data:image/jpeg;base64,${props.avatar}` : defaultAvatar} style={{ width: "60%", borderRadius: "50%" }}
                        onClick={props.userProfileClicked} />
                </figure>
                <p className="btn btn-link" >
                    {props.name}
                </p>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        admin: state.auth.admin
    }
}

export default connect(mapStateToProps)(Doctor)