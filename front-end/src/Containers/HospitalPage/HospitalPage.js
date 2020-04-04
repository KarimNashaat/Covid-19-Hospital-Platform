import React from 'react'
import Hospital from './Hospital'
import NavBar from './NavBar'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import Spinner from '../../Components/UI/Spinner/Spinner'

const HospitalPage = props => {
    return (
        <>
            {!props.hospital ? <Spinner /> :
                <>
                    <Hospital />
                    <Container>
                        <NavBar />
                    </Container>
                </>
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        hospital: state.hospital.hospital
    }
}

export default connect(mapStateToProps)(HospitalPage)