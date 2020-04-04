import React, { useState } from 'react'
import './Profile.css'
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap'
import { connect } from 'react-redux'
import Spinner from '../UI/Spinner/Spinner'
import * as actions from '../../store/actions'
import defaultAvatar from '../../assets/images/user-avatar-placeholder.png'
import classes from './Profile.css'
import { Redirect, NavLink } from 'react-router-dom'

const Profile = props => {
    let profileCard = <Spinner />

    if (!props.loading) {
        profileCard = (
            <div className="card-container">
                <div className="upper-container">
                    <div className="image-container">
                        <img className="img-fluid"
                            src={props.user.avatar ? `data:image/png;base64,${props.user.avatar}` : defaultAvatar} style={{ borderRadius: "50%" }} />
                    </div>
                </div>

                <div className="lower-container">
                    <div>
                        <h3 style={{ marginTop: "25px" }}>{props.user.name}</h3>
                        <h4> {props.user.job ? props.user.job : null} </h4>
                        <hr />
                    </div>
                    <div>
                        <p>Email: {props.user.email} <br />
                            {props.user.age ? "Age: " + props.user.age : null} <br />
                            {props.user.phone ? "Phone: " + props.user.phone : null} <br />
                        </p>
                    </div>
                    <div>
                        <NavLink to="/messages" className="rounded-50 btn btn-outline-primary" onClick={() => {
                            props.startConverstation(props.user._id)
                            props.toggleUserModal()
                            }}>Message</NavLink>
                    </div>
                </div>
            </div>)
    }
    return (
        <Modal isOpen={props.showUserModal} toggle={props.toggleUserModal}
        >
            {profileCard}

        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.otherUserProfile,
        showUserModal: state.user.otherUserProfile ? true : false,
        loading: state.user.loadingOtherUserProfile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleUserModal: () => dispatch(actions.toggleUserModal()),
        startConverstation: (doctor_id) => dispatch(actions.startConverstation(doctor_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)