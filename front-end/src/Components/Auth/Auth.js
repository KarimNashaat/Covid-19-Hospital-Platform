import React from 'react'
import Login from './Login/Login'
import Register from './Sign-up/Register'
import { Modal } from 'reactstrap'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

const Auth = props => {
    return (
        <Modal isOpen={props.showModal} toggle={props.toggleModal}>
            {props.signInForm ? <Login clicked={props.toggleAuthForm} /> : <Register clicked={props.toggleAuthForm} />}
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        signInForm: state.auth.signInForm,
        showModal: state.auth.showModal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleModal: () => dispatch(actions.authModalToggle()),
        toggleAuthForm: () => dispatch(actions.authFormToggle())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth)