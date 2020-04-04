import React, { useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'

const NavBar = props => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    let loggedInButton = <button className="btn btn-sm btn-outline-secondary mr-sm-2" type="button"
        onClick={props.toggleModal}>Login</button>

    let navItems = null

    if (props.isAuthanticated) {
        loggedInButton = <button className="btn btn-sm btn-outline-secondary mr-sm-2" type="button"
            onClick={props.logout}>Logout</button>
        if (props.admin) {
            navItems = <>
            <NavItem>
                <NavLink className="nav-link" to="/requests" onClick={props.fetchRequests}>Requests</NavLink>
            </NavItem>

                <NavItem>
                    <NavLink className="nav-link" to="/messages" onClick={props.fetchChats}>Messages</NavLink>
                </NavItem>
                </>
        }
        else {
            navItems = <>
                <NavItem>
                    <NavLink className="nav-link" to="/reservations" onClick={props.fetchReservations}>Reservations</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="/messages" onClick={props.fetchChats}>Messages</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                </NavItem>
            </>
        }
    }



    return (
        <Navbar color="light" light expand="md" >
            <NavLink className="navbar-brand" to="/">Home</NavLink>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    {navItems}
                </Nav>
                {loggedInButton}
            </Collapse>
        </Navbar>
    )
}

const mapStateToProps = state => {
    return {
        isAuthanticated: state.auth.token,
        admin: state.auth.admin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleModal: () => dispatch(actions.authModalToggle()),
        logout: () => dispatch(actions.logOut()),
        fetchReservations: () => dispatch(actions.fetchReservations()),
        fetchRequests: () => dispatch(actions.fetchRequests()),
        fetchChats: () => dispatch(actions.fetchChats())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)