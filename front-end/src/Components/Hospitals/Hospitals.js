import React from 'react'
import Hospital from './Hospital/Hospital'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import Spinner from '../UI/Spinner/Spinner'
import * as actions from '../../store/actions'

const Hospitals = props => {

    const viewHospitalBtnHandler = (hospital) => {
        props.selectHospital(hospital)
        props.fetchHospitalInfo(hospital._id)
    }
    
    let hospitals = null
    if (props.hospitals) {
        hospitals = props.hospitals.map(hospital => {
            return (
                <Col className="custom-class" xs={6} md={4} key={hospital._id}>
                    <Hospital
                        name={hospital.name}
                        location={hospital.location}
                        specialization={hospital.specialization}
                        hospital_id={hospital._id}
                        click={() => viewHospitalBtnHandler(hospital)}
                        deleteHospital= {() => props.deleteHospital(hospital._id)} />
                </Col>
            )
        })
    }

    return (
        <Container>
            <Row>
                {props.loading ? <Spinner/> : hospitals}
            </Row>

        </Container>
    )
}

const mapStateToProps = state => {
    return {
        hospitals: state.home.hospitals,
        loading: state.home.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectHospital: (hospital) => dispatch(actions.hospitalSelect(hospital)),
        fetchHospitalInfo: (hospital_id) => dispatch(actions.fetchHospitalInfo(hospital_id)),
        deleteHospital: (hospital_id) => dispatch(actions.deleteHospital(hospital_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hospitals)