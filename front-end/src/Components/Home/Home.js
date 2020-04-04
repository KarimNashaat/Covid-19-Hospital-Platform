import React from 'react'
import Banner from '../UI/Banner/Banner'
import Hospitals from '../Hospitals/Hospitals'
import { connect } from 'react-redux'
import NewHospital from '../NewHospital/NewHospital'

const Home = props => {
    return (
        <>
            <Banner />
            <Hospitals />
            {props.admin ? <NewHospital/> : null }
        </>
    )
}

const mapStateToProps = state => {
    return {
        admin: state.auth.admin
    }
}

export default connect(mapStateToProps)(Home)